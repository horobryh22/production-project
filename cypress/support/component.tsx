import './commands';
import { ReactNode } from 'react';

import { mount } from 'cypress/react18';

import { TestProvider } from '@/shared/lib/providers';
import { RenderComponentOptions } from '@/shared/lib/tests/renderComponent';

declare global {
    namespace Cypress {
        interface Chainable {
            mount: (children: ReactNode, options: RenderComponentOptions) => void;
        }
    }
}

// переопределяем метод mount добавив в него тест провайдер
Cypress.Commands.add('mount', (children: ReactNode, options: RenderComponentOptions) => {
    mount(<TestProvider options={options}>{children}</TestProvider>);
});
