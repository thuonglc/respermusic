export interface IDataUpdate {
  email: string
  firstName: string
  lastName: string
}

export interface IUser {
  id: string
  email: string
  firstName: string
  lastName: string
  password: string
  playlists: any
  createdAt?: string
  updatedAt?: string
}

export interface IArtist {
  id: string
  name: string
  songs: any
  createdAt?: string
  updateAt?: string
}

export interface IPlayList {
  playlist: {
    id: string
    userId: string
    user: IUser
    name: string
    songs: any
    createdAt?: string
    updateAt?: string
  }
}

export interface ISong {
  id: string
  artistId: string
  artist: IArtist
  name: string
  playlists: IPlayList[]
  duration: number | string
  url: string
  createdAt?: string
  updateAt?: string
}
