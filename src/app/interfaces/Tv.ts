export interface Tv {
    id: number
    url: string
    title: string
    adult?: boolean
    backdrop_path?: string
    genre_ids?: number[]
    original_language?: string
    original_title?: string
    overview?: string
    popularity?: string
    poster_path?: string
    release_date?: string
    video?: boolean
    vote_average?: number
    vote_count?: number
  }