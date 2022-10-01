import React, {Suspense} from 'react';
import './styles/index.scss';
import {NavLink, Route, Routes} from 'react-router-dom';
import {useTheme} from './providers/ThemeProvider';
import {AboutPageAsync} from 'pages/AboutPage';
import {classNames} from 'shared';
import {MainPageAsync} from 'pages/MainPage';


const App = () => {
    const {theme, toggleTheme} = useTheme();

    return (
        <div className={classNames('app', {}, [theme])}>
            <button onClick={toggleTheme}>Toggle</button>
            <div>
                <NavLink to={'/'}>Main</NavLink>
                <NavLink to={'/about'}>About</NavLink>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path={'/about'} element={<AboutPageAsync/>}/>
                    <Route path={'/'} element={<MainPageAsync/>}/>
                </Routes>
            </Suspense>
        </div>
    );
};

export default App;