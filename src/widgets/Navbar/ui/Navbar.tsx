import React from 'react';
import {NavLink} from 'react-router-dom';
import {classNames} from 'shared';
import classes from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = ({className}: NavbarProps) => {
    return (
        <div className={classNames(classes.Navbar, {}, [className])}>
            <NavLink to={'/'}>Main</NavLink>
            <NavLink to={'/about'}>About</NavLink>
        </div>
    );
};