import NextImage from 'next/image'
import NextLink from 'next/link'
import {
  Box,
  List,
  ListItem,
  ListIcon,
  Divider,
  LinkBox,
  LinkOverlay,
  Stack,
} from '@chakra-ui/layout'
import {
  MdHome,
  MdSearch,
  MdLibraryMusic,
  MdPlaylistAdd,
  MdFavorite,
} from 'react-icons/md'
import { useRouter } from 'next/router'
import { Skeleton } from '@chakra-ui/react'
import { usePlaylist } from '../lib/hooks'

const navMenu = [
  {
    name: 'Home',
    icon: MdHome,
    route: '/',
  },
  {
    name: 'Search',
    icon: MdSearch,
    route: '/search',
  },
  {
    name: 'Your Library',
    icon: MdLibraryMusic,
    route: '/library',
  },
]

const musicMenu = [
  {
    name: 'Create Playlist',
    icon: MdPlaylistAdd,
    route: '/music',
  },
  {
    name: 'Favorites',
    icon: MdFavorite,
    route: '/favorites',
  },
]

const Sidebar = () => {
  const router = useRouter()
  const { playlists, isLoading } = usePlaylist()

  return (
    <Box w="100%" h="calc(100vh - 100px)" bg="black" color="gray">
      <Box py="20px" h="100%">
        <Box mb="20px">
          <LinkBox p="8px 20px">
            <NextLink href="/" passHref>
              <LinkOverlay>
                <NextImage src="/logo.png" height={60} width={365} />
              </LinkOverlay>
            </NextLink>
          </LinkBox>
        </Box>
        <Box mb="20px">
          <List>
            {navMenu.map((menu) => (
              <ListItem key={menu.name} fontSize="16px" fontWeight="bold">
                <LinkBox
                  p="8px 20px"
                  sx={{
                    transition: 'all .3s ',
                    '&:hover': {
                      bg: 'rgba(255,255,255, 0.1)',
                    },
                  }}
                  bg={
                    router.pathname === menu.route
                      ? 'rgba(255,255,255, 0.1)'
                      : 'inherit'
                  }
                >
                  <NextLink href={menu.route} passHref>
                    <LinkOverlay>
                      <ListIcon
                        as={menu.icon}
                        color="gray"
                        mr="20px"
                        fontSize="20px"
                      />
                      {menu.name}
                    </LinkOverlay>
                  </NextLink>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box mt="20px">
          <List spacing={2}>
            {musicMenu.map((menu) => (
              <ListItem fontSize="16px" fontWeight="bold" key={menu.name}>
                <LinkBox
                  p="8px 20px"
                  sx={{
                    transition: 'all .3s ',
                    '&:hover': {
                      bg: 'rgba(255,255,255, 0.1)',
                    },
                  }}
                  bg={
                    router.pathname === menu.route
                      ? 'rgba(255,255,255, 0.1)'
                      : 'inherit'
                  }
                >
                  <NextLink href={menu.route} passHref>
                    <LinkOverlay>
                      <ListIcon
                        as={menu.icon}
                        color="gray"
                        mr="20px"
                        fontSize="20px"
                      />
                      {menu.name}
                    </LinkOverlay>
                  </NextLink>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
        <Divider color="gray.800" my={4} />
        <Box
          h="66%"
          overflowY="auto"
          pb="20px"
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
          <List>
            {isLoading && (
              <Stack px="20px">
                {[...Array(6)].map((_, idx) => (
                  <Skeleton h="20px" key={idx} />
                ))}
              </Stack>
            )}

            {playlists.map((playlist) => (
              <ListItem key={playlist.id}>
                <LinkBox
                  p="4px 20px"
                  sx={{
                    transition: 'all .3s ',
                    '&:hover': {
                      bg: 'rgba(255,255,255, 0.1)',
                    },
                  }}
                  bg={
                    router.asPath === `/playlist/${playlist.id}`
                      ? 'rgba(255,255,255, 0.1)'
                      : 'inherit'
                  }
                >
                  <NextLink
                    href={{
                      pathname: '/playlist/[id]',
                      query: { id: playlist.id },
                    }}
                    passHref
                  >
                    <LinkOverlay>{playlist.name}</LinkOverlay>
                  </NextLink>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  )
}

export default Sidebar
