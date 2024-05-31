import { EditableProfileCard } from '@/features/EditableProfileCard';

// variables
const USER_ID = '1';

describe('Изолированное тестирование карточки профиля', () => {
    it('Карточка с данными профиля успешно рендерится', () => {
        // Мокируем запроc за получением данных карточки профиля и возвращаем содержимое файла profile.json
        cy.intercept('GET', '**/profile/*', { fixture: 'profile.json' });

        cy.mount(<EditableProfileCard profileId={USER_ID} />, {
            initialState: { user: { authData: { id: USER_ID } } },
        });
    });
});
