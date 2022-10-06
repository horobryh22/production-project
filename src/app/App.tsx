import React, {Suspense} from 'react';
import './styles/index.scss';
import {AppRouter} from 'app/providers/router';
import {Navbar} from 'widgets/Navbar';
import {classNames, useTheme} from 'shared/lib';
import {Sidebar} from 'widgets/Sidebar';


const App = () => {
    const {theme} = useTheme();

    return (
        <div className={classNames('app', {}, [theme])}>
            <Suspense fallback="">
                <Navbar/>
                <div className="app-content">
                    <Sidebar/>
                    <AppRouter/>
                </div>
            </Suspense>
        </div>
    );
};

export default App;