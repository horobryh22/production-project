import { StateSchema } from '@/app/providers/StoreProvider';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';

import { selectProfileFormData } from './selectProfileFormData';

describe('selectProfileFormData', () => {
    test('should return form data', () => {
        const data = {
            age: 28,
            country: Country.RUSSIA,
            lastname: 'Хоробрых',
            username: 'admin',
            currency: Currency.RUB,
            avatar: 'https://cdn.icon-icons.com/icons2/1371/PNG/512/batman_90804.png',
            city: 'Omsk',
            first: 'Илья',
        };

        const state: DeepPartial<StateSchema> = {
            profile: {
                form: data,
            },
        };

        expect(selectProfileFormData(state as StateSchema)).toEqual(data);
    });

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};

        expect(selectProfileFormData(state as StateSchema)).toBeUndefined();
    });
});
