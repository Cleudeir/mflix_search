export interface Movie {
    id: number
    url: string
    title: string
    quality: string
    year: string
    dub: boolean
    adult?: boolean
    backdrop_path?: string
    genre_ids?: number[]
    original_language?: string
    original_title?: string
    original_name?:string
    overview?: string
    popularity?: string
    poster_path?: string
    release_date?: string
    video?: boolean
    vote_average?: number
    vote_count?: number
  }