import React from "react";
import cn from "../../createClassNames";
import { Link, useLocation } from 'react-router-dom';
import styles from './Tab.module.scss';
import { AppRoutes } from '../../config';

export const Tab = ({ route, name }) => {
  const location = useLocation();
  const pathName = location.pathname === '/' ? AppRoutes.MY_WALLET : location.pathname;
  const activeClasses = `active ${styles.active}`;

  const liClasses = cn(styles.navItem, 'nav-item');
  const linkClasses = cn({ [activeClasses]: pathName === route }, styles.navLink, 'nav-link');
  console.log(linkClasses)

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