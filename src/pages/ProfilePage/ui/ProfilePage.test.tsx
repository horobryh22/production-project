import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';

import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { Profile } from '@/entities/Profile';
import { profileReducer } from '@/features/EditableProfileCard/testing';
import { instance } from '@/shared/api/api';
import {
    renderComponent,
    renderComponentOptions,
} from '@/shared/lib/tests/renderComponent';

import ProfilePage from './ProfilePage';

// TODO по хорошему разобраться с warnings в тестах RTL

const profileData: Profile = {
    id: '1',
    age: 28,
    country: Country.RUSSIA,
    lastname: 'Хоробрых',
    username: 'admin',
    currency: Currency.RUB,
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdim6mwjPEYlsFTPtK5hmZXBGJG1KyUz4SxpZBKVU&s',
    city: 'Omsk',
    first: 'Илья',
};

const options: renderComponentOptions = {
    initialState: {
        profile: {
            data: profileData,
            form: profileData,
            readonly: true,
        },
        user: {
            authData: {
                id: '1',
                username: 'admin',
            },
        },
    },
    asyncReducers: {
        profile: profileReducer,
    },
};

beforeEach(async () => {
    mockAllIsIntersecting(true); // мокаем intersectionObserver

    renderComponent(<ProfilePage />, options);

    // https://stackoverflow.com/questions/60115885/how-to-solve-the-update-was-not-wrapped-in-act-warning-in-testing-library-re
    await waitFor(() => screen.getByTestId('rating'));
});

describe('ProfilePage', () => {
    test('Должно появляться две кнопки Сохранить и Отменить', async () => {
        const editBtn = screen.getByTestId('ProfilePageButton.Edit');

        expect(editBtn).toBeInTheDocument();

        userEvent.click(editBtn);

        const cancelBtn = screen.getByTestId('ProfilePageButton.Cancel');
        const saveBtn = screen.getByTestId('ProfilePageButton.Save');

        expect(cancelBtn).toBeInTheDocument();
        expect(saveBtn).toBeInTheDocument();
    });

    test('При отмене изменений должны подставляться исходные значения на момент редактирования', async () => {
        const firstnameInput = screen.getByTestId('EditableProfileCard.Firstname');
        const lastnameInput = screen.getByTestId('EditableProfileCard.Lastname');
        const editBtn = screen.getByTestId('ProfilePageButton.Edit');

        expect(editBtn).toBeInTheDocument();

        userEvent.click(editBtn);

        expect(firstnameInput).toHaveValue('Илья');
        expect(lastnameInput).toHaveValue('Хоробрых');

        userEvent.clear(firstnameInput);
        userEvent.clear(lastnameInput);

        userEvent.type(firstnameInput, 'firstname');
        userEvent.type(lastnameInput, 'lastname');

        expect(firstnameInput).toHaveValue('firstname');
        expect(lastnameInput).toHaveValue('lastname');

        const cancelBtn = screen.getByTestId('ProfilePageButton.Cancel');

        expect(cancelBtn).toBeInTheDocument();

        userEvent.click(cancelBtn);

        expect(firstnameInput).toHaveValue('Илья');
        expect(lastnameInput).toHaveValue('Хоробрых');
    });

    test('При ошибке валидации, должна появляться ошибка', async () => {
        await act(async () => {
            const editBtn = await screen.findByTestId('ProfilePageButton.Edit');

            userEvent.click(editBtn);
        });

        await act(async () => {
            const firstnameInput = await screen.findByTestId(
                'EditableProfileCard.Firstname',
            );

            userEvent.clear(firstnameInput);
        });

        await act(async () => {
            const mockPutReq = jest.spyOn(instance, 'put');

            userEvent.click(screen.getByTestId('ProfilePageButton.Save'));
            expect(mockPutReq).not.toHaveBeenCalled();
        });
    });

    test('В случае если нет ошибок валидации, запрос должен быть отправлен', async () => {
        const mockPutReq = jest.spyOn(instance, 'put');

        const firstnameInput = screen.getByTestId('EditableProfileCard.Firstname');
        const editBtn = screen.getByTestId('ProfilePageButton.Edit');

        userEvent.click(editBtn);
        userEvent.clear(firstnameInput);
        userEvent.type(firstnameInput, 'Иван');

        const saveBtn = screen.getByTestId('ProfilePageButton.Save');

        userEvent.click(saveBtn);

        expect(mockPutReq).toHaveBeenCalled();
        expect(firstnameInput).toHaveValue('Иван');
    });
});
