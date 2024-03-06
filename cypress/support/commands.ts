import { login } from './commands/login';
import { logout } from './commands/logout';

Cypress.Commands.add('login', login);
Cypress.Commands.add('logout', logout);

declare global {
    namespace Cypress {
        interface Chainable {
            login(username: string, password: string): Chainable<void>;
            logout(): Chainable<void>;
        }
    }
}
