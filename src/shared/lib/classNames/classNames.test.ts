import { classNames } from './classNames';

describe('classNames', () => {
    test('with only first param', () => {
        expect(classNames('someClass')).toBe('someClass');
    });

    test('with additional classes', () => {
        const result = 'someClass class1 class2';

        expect(classNames('someClass', {}, ['class1', 'class2'])).toBe(result);
    });

    test('with additional classes and mods', () => {
        const result = 'someClass class1 class2 selected';

        expect(classNames('someClass', { selected: true }, ['class1', 'class2'])).toBe(
            result,
        );
    });

    test('with mods (false and true)', () => {
        const result = 'someClass selected';

        expect(classNames('someClass', { selected: true, hovered: false })).toBe(result);
    });

    test('if we pass undefined', () => {
        const result = 'someClass class2 hovered';

        expect(
            classNames(
                'someClass',
                {
                    selected: undefined,
                    hovered: true,
                },
                [undefined, 'class2'],
            ),
        ).toBe(result);
    });
});
