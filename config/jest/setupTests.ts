import '@testing-library/jest-dom';
import 'regenerator-runtime/runtime';

// добавляем возможность обращения к window.matchMedia во время теста
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
        matches: true, // isDesktop всегда будет восприниматься как true
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});
