import { Box } from '@chakra-ui/layout'
import GradientLayout from '../../components/gradientLayout'
import MenuHeader from '../../components/menuHeader'
import SongTable from '../../components/songsTable'
import { validateToken } from '../../lib/auth'
import { useMe } from '../../lib/hooks'
import prisma from '../../lib/prisma'
import { IPlayList } from '../../lib/type'

const getBGColor = (id) => {
  const colors = [
    'red',
    'green',
    'blue',
    'orange',
    'purple',
    'gray',
    'teal',
    'yellow',
  ]

  return colors[id - 1] || colors[Math.floor(Math.random() * colors.length)]
}

const Playlist = ({ playlist }: IPlayList) => {
  const { user, isLoading } = useMe()
  const color = getBGColor(playlist.id)

  return (
    <Box h="100%">
      <MenuHeader user={user} loading={isLoading} />
      <GradientLayout
        color={color}
        roundImage={false}
        data={playlist}
        subtitle="playlist"
        loading={Boolean(false)}
        description={`${playlist.songs.length} songs`}
        image={`https://picsum.photos/400?random=${playlist.id}`}
      >
        <SongTable songs={playlist.songs} />
      </GradientLayout>
    </Box>
  )
}

export const getServerSideProps = async ({ query, req }) => {
  let user

  try {
    user = validateToken(req.cookies.ACCESS_TOKEN)
  } catch (e) {
    return {
      redirect: {
        permanent: false,
        destination: '/signin',
      },
    }
  }

  const [playlist] = await prisma.playlist.findMany({
    where: {
      id: +query.id,
      userId: user.id,
    },
    include: {
      songs: {
        include: {
          artist: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
  })

  return {
    props: { playlist },
  }
}
export default Playlist
