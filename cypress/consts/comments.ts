import type { Comment } from '../../src/entities/Comment';
import type { UserRole } from '../../src/entities/User';

export const ARTICLE_COMMENT: Comment = {
    id: '1',
    text: 'Test Text',
    articleId: '1',
    user: {
        id: '1',
        username: 'admin',
        roles: ['ADMIN'] as UserRole[],
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdim6mwjPEYlsFTPtK5hmZXBGJG1KyUz4SxpZBKVU&s',
    },
};
