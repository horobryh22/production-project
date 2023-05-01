import { User } from 'entities/User';

export interface Comment {
    id: string;
    text: string;
    articleId: string;
    user: User;
}

export interface CommentFormSchema {
    text?: string;
    error?: string;
    isLoading: boolean;
}
