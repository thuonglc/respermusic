import { Box, Flex, Text } from '@chakra-ui/layout'
import { Image, Skeleton, useDisclosure } from '@chakra-ui/react'
import { useRef } from 'react'
import UserForm from './userForm'

const GradientLayout = ({
  color,
  children,
  image,
  subtitle,
  loading,
  data,
  description,
  roundImage,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = useRef(null)
  const finalRef = useRef(null)
  return (
    <Box
      h="100%"
      overflowY="auto"
      bgGradient={`linear(${color}.500 0%, ${color}.600 15%, ${color}.700 40%, rgba(0,0,0,0.95) 75%)`}
      css={{
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-track': {
          width: '8px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#ffffff4d',
          borderRadius: '24px',
          '&:hover': {
            background: '#ffffff80',
          },
        },
      }}
    >
      <Flex bg={`${color}.600`} p="40px" align="end">
        <Box p="20px">
          <Image
            boxSize="160px"
            boxShadow="2xl"
            src={image}
            borderRadius={roundImage ? '100%' : 'full'}
          />
        </Box>
        <Box p="20px" lineHeight="40px" color="white">
          <Skeleton isLoaded={!loading} w="150px">
            <Text fontWeight="bold" casing="uppercase">
              {subtitle}
            </Text>
          </Skeleton>
          <Skeleton my={2} h="50px" isLoaded={!loading}>
            <Text
              fontSize="6xl"
              fontWeight="bold"
              onClick={onOpen}
              sx={{ cursor: 'pointer' }}
            >
              {data?.name ? data?.name : `${data?.firstName} ${data?.lastName}`}
            </Text>
          </Skeleton>
          <Skeleton w="200px" h="20px" isLoaded={!loading}>
            <Text>{description}</Text>
          </Skeleton>
        </Box>
      </Flex>
      {data?.firstName && (
        <UserForm
          user={data}
          isOpen={isOpen}
          onClose={onClose}
          initialRef={initialRef}
          finalRef={finalRef}
        />
      )}

      <Box py="50px">{children}</Box>
    </Box>
  )
}

export default GradientLayout
