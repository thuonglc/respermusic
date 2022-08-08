import {
  Flex,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  Box,
  Avatar,
  FormControl,
  chakra,
  Link,
  InputRightElement,
  FormLabel,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import { FaUserAlt, FaLock } from 'react-icons/fa'
import NextLink from 'next/link'
import { auth } from '../lib/mutations'

const CFaUserAlt = chakra(FaUserAlt)
const CFaLock = chakra(FaLock)

const AuthForm: FC<{ mode: 'signin' | 'signup' }> = ({ mode }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const handleShowClick = () => setShowPassword(!showPassword)

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    await auth(mode, { email, password })
    setIsLoading(false)
    router.push('/')
  }

  return (
    <Flex
      direction="column"
      w="100wh"
      h="100vh"
      backgroundColor="gray.200"
      justify="center"
      align="center"
    >
      <Stack direction="column" mb="2" justify="center" align="center">
        <Box minW={{ base: '90%', md: '468px' }}>
          <form onSubmit={handleSubmit}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <Avatar bg="teal.500" m="auto" />
              <FormControl>
                <FormLabel textAlign="center" mb={8}>
                  Hint: user@test.com / password
                </FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    // eslint-disable-next-line react/no-children-prop
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    type="email"
                    placeholder="Email address"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    // eslint-disable-next-line react/no-children-prop
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement w="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                type="submit"
                variant="solid"
                colorScheme="teal"
                w="full"
                isLoading={isLoading}
              >
                {mode === 'signin' ? 'Sign In' : 'Sign Up'}
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        {mode === 'signin' ? 'Have an account?' : 'New to us?'}&nbsp;
        <NextLink href={mode === 'signin' ? '/signup' : '/signin'} passHref>
          <Link
            href={mode === 'signin' ? '/signup' : '/signin'}
            color="teal.500"
          >
            {mode === 'signin' ? 'Sign Up' : 'Sign In'}
          </Link>
        </NextLink>
      </Box>
    </Flex>
  )
}

export default AuthForm
