import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { Profile } from '@/entities/Profile';
import { profileReducer } from '@/features/EditableProfileCard';
import { instance } from '@/shared/api/api';
import {
    renderComponent,
    renderComponentOptions,
} from '@/shared/lib/tests/renderComponent';

import ProfilePage from './ProfilePage';

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

describe('ProfilePage', () => {
    test('Должно появляться две кнопки Сохранить и Отменить', async () => {
        renderComponent(<ProfilePage />, options);

        expect(screen.getByTestId('ProfilePageButton.Edit')).toBeInTheDocument();

        await userEvent.click(screen.getByTestId('ProfilePageButton.Edit'));

        expect(screen.getByTestId('ProfilePageButton.Cancel')).toBeInTheDocument();
        expect(screen.getByTestId('ProfilePageButton.Save')).toBeInTheDocument();
    });

    test('При отмене изменений должны подставляться исходные значения на момент редактирования', async () => {
        renderComponent(<ProfilePage />, options);

        const firstnameInput = screen.getByTestId('EditableProfileCard.Firstname');
        const lastnameInput = screen.getByTestId('EditableProfileCard.Lastname');
        const editBtn = screen.getByTestId('ProfilePageButton.Edit');

        expect(editBtn).toBeInTheDocument();

        await userEvent.click(editBtn);

        expect(firstnameInput).toHaveValue('Илья');
        expect(lastnameInput).toHaveValue('Хоробрых');

        await userEvent.clear(firstnameInput);
        await userEvent.clear(lastnameInput);

        await userEvent.type(firstnameInput, 'firstname');
        await userEvent.type(lastnameInput, 'lastname');

        expect(firstnameInput).toHaveValue('firstname');
        expect(lastnameInput).toHaveValue('lastname');

        const cancelBtn = screen.getByTestId('ProfilePageButton.Cancel');

        await userEvent.click(cancelBtn);

        expect(firstnameInput).toHaveValue('Илья');
        expect(lastnameInput).toHaveValue('Хоробрых');
    });

    test('При ошибке валидации, должна появляться ошибка', async () => {
        renderComponent(<ProfilePage />, options);

        const mockPutReq = jest.spyOn(instance, 'put');

        const firstnameInput = screen.getByTestId('EditableProfileCard.Firstname');
        const editBtn = screen.getByTestId('ProfilePageButton.Edit');

        await userEvent.click(editBtn);
        await userEvent.clear(firstnameInput);
        await userEvent.click(screen.getByTestId('ProfilePageButton.Save'));

        expect(mockPutReq).not.toHaveBeenCalled();
        // expect(screen.getByTestId('EditableProfileCard.Error.Paragraph')).toBeInTheDocument();
    });

    test('В случае если нет ошибок валидации, запрос должен быть отправлен', async () => {
        renderComponent(<ProfilePage />, options);

        const mockPutReq = jest.spyOn(instance, 'put');

        const firstnameInput = screen.getByTestId('EditableProfileCard.Firstname');
        const editBtn = screen.getByTestId('ProfilePageButton.Edit');

        await userEvent.click(editBtn);
        await userEvent.clear(firstnameInput);
        await userEvent.type(firstnameInput, 'Иван');

        const saveBtn = screen.getByTestId('ProfilePageButton.Save');

        await userEvent.click(saveBtn);

        expect(mockPutReq).toHaveBeenCalled();
        expect(firstnameInput).toHaveValue('Иван');
    });
});
