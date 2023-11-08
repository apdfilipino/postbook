export interface CreatePostDto {
    userId: number;
    parentId: number | null;
    text: string;
    posterId: number;
}
