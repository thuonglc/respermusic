import { Box, Text, Flex } from '@chakra-ui/layout'
import { BsFillPlayFill } from 'react-icons/bs'
import { IconButton, Image, Icon } from '@chakra-ui/react'
import GradientLayout from '../components/gradientLayout'
import { useMe } from '../lib/hooks'
import prisma from '../lib/prisma'
import MenuHeader from '../components/menuHeader'
import { IArtist } from '../lib/type'
import Seo from '../components/seo'

const avatarUrl =
  'https://res.cloudinary.com/dfxk0fqfp/image/upload/v1659951855/respermusic/img3_cryptopunks_vtbul8.jpg'

const Home = ({ artists }) => {
  const { user, isLoading } = useMe()

  return (
    <Box h="100%">
      <Seo
        data={{
          title: 'Respermusic | Thuong Luong',
          description: 'A demo music web app building by Nextjs',
          url: 'https://respermusic.vercel.app/',
          thumbnailUrl:
            'https://res.cloudinary.com/dfxk0fqfp/image/upload/v1659951855/respermusic/img3_cryptopunks_vtbul8.jpg',
        }}
      />
      <MenuHeader user={user} loading={isLoading} />
      <GradientLayout
        roundImage
        color="gray"
        subtitle="profile"
        loading={isLoading}
        data={user}
        description={`${user?.playlistsCount} public playlists`}
        image={avatarUrl}
      >
        <Box color="white" px="40px">
          <Box marginBottom="40px">
            <Text fontSize="2xl" fontWeight="bold">
              Top artist this month
            </Text>
            <Text fontSize="md">only visible to you</Text>
          </Box>
          <Flex>
            {artists.map((artist: IArtist) => (
              <Box key={artist.name} pr="30px" w="220px">
                <Box
                  bg="#181818"
                  sx={{
                    transition: 'all .3s ',
                    '&:hover': {
                      bg: '#282828',
                      '& button': {
                        display: 'inline-flex',
                        transition: 'all .5s ',
                      },
                    },
                  }}
                  cursor="pointer"
                  borderRadius="4px"
                  padding="15px"
                  width="100%"
                  position="relative"
                >
                  <IconButton
                    icon={<Icon as={BsFillPlayFill} boxSize={30} />}
                    display="none"
                    aria-label="play"
                    colorScheme="green"
                    color="black"
                    size="lg"
                    position="absolute"
                    top="120px"
                    right="16px"
                    isRound
                    // onClick={() => handlePlay()}
                  />

                  <Image
                    src="https://placekitten.com/300/300"
                    borderRadius="100%"
                  />
                  <Box marginTop="20px">
                    <Text fontSize="large" fontWeight="bold">
                      {artist.name}
                    </Text>
                    <Text fontSize="x-small">Artist</Text>
                  </Box>
                </Box>
              </Box>
            ))}
          </Flex>
        </Box>
      </GradientLayout>
    </Box>
  )
}

export const getServerSideProps = async () => {
  const artists = await prisma.artist.findMany({})
  return {
    props: { artists },
  }
}

export default Home
