import React, {Suspense} from 'react';
import './index.scss';
import {NavLink, Route, Routes} from 'react-router-dom';
import {AboutPageAsync} from './pages/AboutPage/AboutPage.async';
import {MainPageAsync} from './pages/MainPage/MainPage.async';

const App = () => {
    return (
        <div className="app">
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