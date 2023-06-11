import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '@/app/styles/index.scss';

import App from '@/app/App';
import { StoreProvider } from '@/app/providers/StoreProvider';
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import '@/shared/config/i18n/i18n';

const container = document.getElementById('root');

if (!container) {
    throw new Error('Не удалось отрендерить приложение');
}

const root = createRoot(container);

root.render(
    <BrowserRouter>
        <StoreProvider>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </StoreProvider>
    </BrowserRouter>,
);
