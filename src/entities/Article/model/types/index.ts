import { ArticleBlockType, ArticleType } from '../consts/consts';

import { User } from '@/entities/User';

interface ArticleBlockBase {
    id: string;
    type: ArticleBlockType;
}

export interface ArticleTextBlock extends ArticleBlockBase {
    type: ArticleBlockType.TEXT;
    title?: string;
    paragraphs: string[];
}

export interface ArticleImageBlock extends ArticleBlockBase {
    type: ArticleBlockType.IMAGE;
    src: string;
    title: string;
}

export interface ArticleCodeBlock extends ArticleBlockBase {
    type: ArticleBlockType.CODE;
    code: string;
}

export type ArticleBlock = ArticleCodeBlock | ArticleImageBlock | ArticleTextBlock;

export interface Article {
    id: string;
    user: User;
    title: string;
    subtitle: string;
    img: string;
    views: number;
    createdAt: string;
    type: ArticleType[];
    blocks: ArticleBlock[];
}

export interface ArticleDetailsSchema {
    isLoading: boolean;
    error?: string;
    data?: Article;
}
