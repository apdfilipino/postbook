export class CreatePostDto {
    userId: number;
    parentId: number | null = null;
    text: string;
}
