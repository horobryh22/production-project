import * as articleCommands from './commands/article';
import * as authCommands from './commands/auth';
import * as commentCommands from './commands/comment';
import * as profileCommands from './commands/profile';
import * as ratingCommands from './commands/rating';
import * as utils from './commands/utils';

Cypress.Commands.addAll(authCommands);
Cypress.Commands.addAll(profileCommands);
Cypress.Commands.addAll(articleCommands);
Cypress.Commands.addAll(commentCommands);
Cypress.Commands.addAll(ratingCommands);
Cypress.Commands.addAll(utils);
