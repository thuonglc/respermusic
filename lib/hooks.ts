import useSWR from 'swr'
import fetcher from './fetcher'

export const useMe = () => {
  const { data, error, mutate } = useSWR('/me', fetcher, {
    revalidateOnFocus: false,
  })

  return {
    user: data,
    isLoading: !data && !error,
    isError: error,
    mutate,
  }
}

export const usePlaylist = () => {
  const { data, error } = useSWR('/playlist', fetcher, {
    revalidateOnFocus: false,
  })
  return {
    playlists: (data as any) || [],
    isLoading: !data && !error,
    isError: error,
  }
}
