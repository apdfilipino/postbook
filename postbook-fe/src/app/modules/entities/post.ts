import { User } from "./user.entity"

export interface Post {
    postId: number,
    parentId: number | null,
    text: string,
    poster: User,
    children?: Post[]
}