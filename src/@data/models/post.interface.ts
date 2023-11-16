export interface Post {
    userId: number
    id: number
    title: string
    body: string
}
  
export interface PostRequest {
    title: string
    body: string
    userId: number
}