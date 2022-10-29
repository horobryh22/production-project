import { Country } from 'entities/Country/model/types';
import { Currency } from 'entities/Currency/model/types';

export interface Profile {
    first?: string;
    lastname?: string;
    age?: number;
    currency?: Currency;
    country?: Country;
    city?: string;
    username?: string;
    avatar?: string;
}
