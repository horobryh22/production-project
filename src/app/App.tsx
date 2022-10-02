import React from 'react';
import './styles/index.scss';
import {useTheme} from './providers/ThemeProvider';
import {classNames} from 'shared';
import {AppRouter} from 'app/providers/router';
import {Navbar} from 'widgets/Navbar';


const App = () => {
    const {theme, toggleTheme} = useTheme();

    return (
        <div className={classNames('app', {}, [theme])}>
            <Navbar/>
            <AppRouter/>
            <button onClick={toggleTheme}>Toggle</button>
        </div>
    );
};

export default App;