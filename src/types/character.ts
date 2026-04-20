export type Character = {
  id: number
  name: string
  status: string
  species: string
  image: string
  gender: string
  origin: {
    name: string
    url: string
  }
  location: {
    name: string
    url: string
  }
  episode: string[]
}

export type CharacterApiResponse = {
  info: {
    count: number
    pages: number
    next: string | null
    prev: string | null
  }
  results: Character[]
}