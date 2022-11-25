import { getQueryParams } from './addQueryParams';

describe('getQueryParams.test', () => {
    test('test with one param', () => {
        const params = getQueryParams({
            search: 'javascript',
        });

        expect(params).toEqual(`?search=javascript`);
    });

    test('test with many params', () => {
        const params = getQueryParams({
            search: 'javascript',
            sort: 'views',
        });

        expect(params).toEqual(`?search=javascript&sort=views`);
    });

    test('test with undefined', () => {
        const params = getQueryParams({
            search: 'javascript',
            sort: undefined,
        });

        expect(params).toEqual(`?search=javascript`);
    });
});
