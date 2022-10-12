import { fireEvent, screen } from '@testing-library/react';

import { Sidebar } from './Sidebar';

import { renderWithTranslation } from 'shared/lib/renderWithTranslation/renderWithTranslation';

describe('Sidebar', () => {
    test('exists in the document', () => {
        renderWithTranslation(<Sidebar />);
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    });

    test('Toggle test', () => {
        renderWithTranslation(<Sidebar />);

        const toggleButton = screen.getByTestId('sidebar-toggle');
        const sidebar = screen.getByTestId('sidebar');

        expect(sidebar).toBeInTheDocument();

        fireEvent.click(toggleButton);

        expect(sidebar).toHaveClass('collapsed');
    });
});
