import { fireEvent, screen } from '@testing-library/react';

import { Counter } from './Counter';

import { renderComponent } from 'shared/lib/tests/renderComponent';

describe('Counter', () => {
    test('counter should be render', () => {
        renderComponent(<Counter />, { initialState: { counter: { value: 10 } } });

        expect(screen.getByTestId('value-title')).toHaveTextContent('10');
    });

    test('increment', () => {
        renderComponent(<Counter />, { initialState: { counter: { value: 10 } } });

        const button = screen.getByTestId('increment-btn');

        fireEvent.click(button);

        expect(screen.getByTestId('value-title')).toHaveTextContent('11');
    });

    test('decrement', () => {
        renderComponent(<Counter />, { initialState: { counter: { value: 10 } } });

        const button = screen.getByTestId('decrement-btn');

        fireEvent.click(button);

        expect(screen.getByTestId('value-title')).toHaveTextContent('9');
    });
});
