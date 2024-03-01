import { fireEvent, screen } from '@testing-library/react';

import { renderComponent } from '@/shared/lib/tests/renderComponent';

import { Sidebar } from './Sidebar';

describe('Sidebar', () => {
    test('exists in the document', () => {
        renderComponent(<Sidebar />);
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    });

    test('Toggle test', () => {
        renderComponent(<Sidebar />);

        const toggleButton = screen.getByTestId('sidebar-toggle');
        const sidebar = screen.getByTestId('sidebar');

        expect(sidebar).toBeInTheDocument();

        fireEvent.click(toggleButton);

        expect(sidebar).toHaveClass('collapsed');
    });
});
