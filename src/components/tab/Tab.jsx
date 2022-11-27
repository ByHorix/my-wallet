import React from "react";
import cn from "../../utils/createClassNames";
import { Link, useLocation } from 'react-router-dom';
import styles from './Tab.module.scss';

export const Tab = ({ route, name }) => {
  const location = useLocation();
  const isTabActive = location.pathname === route;
  const activeClasses = `active ${styles.active}`;

  const liClasses = cn(styles.navItem, 'nav-item');

    return (
        <li className={liClasses}>
            <Link
                className={cn({ [activeClasses]: isTabActive }, styles.navLink, 'nav-link')}
                to={route}
            >
                {name}
            </Link>
        </li>
    );
};