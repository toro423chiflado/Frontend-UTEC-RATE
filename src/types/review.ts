export interface Review {
  id: number
  rating: number
  comment: string
  author: string
}

export interface NewReview {
  rating: number
  comment: string
}
