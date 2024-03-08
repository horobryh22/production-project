import type { Profile } from '@/entities/Profile';

export const DEFAULT_PROFILE: Profile = {
    id: '4',
    first: 'Тестовый',
    lastname: 'Пользователь',
    username: 'usertest',
    age: 23,
    city: 'Moscow',
    avatar: 'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png',
    currency: 'RUB' as any, // TODO не компилирует энамы
    country: 'USA' as any, // TODO не компилирует энамы
};
