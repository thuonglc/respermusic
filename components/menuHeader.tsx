import {
  Button,
  Image,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/router'
import { logout } from '../lib/mutations'

const avatarUrl =
  'https://res.cloudinary.com/dfxk0fqfp/image/upload/v1659951855/respermusic/img3_cryptopunks_vtbul8.jpg'

const MenuHeader = ({ user, loading }) => {
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.push('/signin')
  }

  if (!loading)
    return (
      <Menu autoSelect={false}>
        {({ isOpen }) => (
          <>
            <MenuButton
              as={Button}
              bg="#000000b3"
              colorScheme="white"
              size="40px"
              p="4px 8px 4px 4px"
              borderRadius="full"
              position="absolute"
              right="24px"
              top="12px"
              _hover={{ bg: '#282828' }}
              _focus={{ boxShadow: 'none' }}
              _expanded={{ bg: '#282828' }}
              leftIcon={
                <Image boxSize="32px" src={avatarUrl} borderRadius="full" />
              }
              rightIcon={
                isOpen ? (
                  <TriangleDownIcon w={3} h={3} />
                ) : (
                  <TriangleUpIcon w={3} h={3} />
                )
              }
            >
              {`${user?.firstName} ${user?.lastName}`}
            </MenuButton>
            <MenuList bg="#282828" color="white">
              <MenuGroup>
                <MenuItem
                  bg="#282828"
                  _hover={{ bg: '#ffffff1a' }}
                  onClick={handleLogout}
                >
                  Log out
                </MenuItem>
              </MenuGroup>
            </MenuList>
          </>
        )}
      </Menu>
    )
  return null
}

export default MenuHeader
