import React from "react";
import createClassNames from "../../createClassNames";
import { Link, useLocation } from 'react-router-dom';
import styles from './Tab.module.scss';
import { AppRoutes } from '../../config';

export const Tab = ({ route, name }) => {
  const location = useLocation();
  const pathName = location.pathname === '/' ? AppRoutes.MY_WALLET : location.pathname;
  const activeClasses = `active ${styles.active}`;

  const liClasses = createClassNames(styles['nav-item'], 'nav-item');
  const linkClasses = createClassNames({ [activeClasses]: pathName === route }, styles['nav-link'], 'nav-link');

    return (
        <li className={liClasses}>
            <Link
                className={linkClasses}
                to={route}
            >
                {name}
            </Link>
        </li>
    );
};