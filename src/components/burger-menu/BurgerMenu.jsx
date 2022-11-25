import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../GlobalContext';
import { AppRoutes, HeaderItems } from '../../config';
import styles from './BurgerMenu.module.scss';
import burgerMenuIcon from '../../menu-icon/menu-icon.svg';
import closeMenuIcon from '../../menu-icon/close-menu-icon.svg';
import cn from '../../createClassNames';

export const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { amounts: { accumulations }, balanceState } = useContext(GlobalContext);

  const navigate = useNavigate();
  const location = useLocation();
  const pathName = location.pathname === '/' ? AppRoutes.MY_WALLET : location.pathname;

  const menuItemHandler = (route) => {
    navigate(route);
    setIsOpen(false);
  };

  const menuOpenHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
      <div>
        <div className={styles.menuHead} onTouchEnd={menuOpenHandler}>
          <div className={styles.iconContainer}>
            <img className={styles.icon} src={isOpen ? closeMenuIcon : burgerMenuIcon} alt=""/>
          </div>
          <div className={styles.balance}>
            <p className={styles.balanceItem}>
              {`Общий баланс: ${balanceState}`}
            </p>
            <p className={styles.balanceItem}>
              {`Накопления: ${accumulations}`}
            </p>
          </div>
        </div>
        {isOpen
            ? (
                <div className={styles.menuBody}>
                  <ul className={styles.menu}>
                    {HeaderItems.map(({ route, name }) => (
                        <li
                            key={name}
                            className={cn(styles.menuItem, { [styles.active]: pathName === route })}
                            onTouchEnd={() => menuItemHandler(route)}
                        >
                          {name}
                        </li>
                    ))}
                  </ul>
                </div>
            )
            : null}
      </div>
  );
};