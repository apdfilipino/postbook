export class Post {
    userId: number;
    postId: number;
    parentId: number | null = null;
    text: string;
    children: Post[]
}
