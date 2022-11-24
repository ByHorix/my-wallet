import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../GlobalContext';
import { AppRoutes, HeaderItems } from '../../config';
import styles from './BurgerMenu.module.scss';
import burgerMenuIcon from '../../menu-icon/menu-icon.svg';
import closeMenuIcon from '../../menu-icon/close-menu-icon.svg';
import createClassNames from '../../createClassNames';

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

  const menuHeadContainer = (
      <div className={styles['menu-head']} onClick={menuOpenHandler} onTouchStart={menuOpenHandler}>
        <div className={styles['icon-container']}>
          <img className={styles.icon} src={isOpen ? closeMenuIcon : burgerMenuIcon} alt=""/>
        </div>
        <div className={styles.balance}>
          <p className={styles['balance-item']}>
            {`Общий баланс: ${balanceState}`}
          </p>
          <p className={styles['balance-item']}>
            {`Накопления: ${accumulations}`}
          </p>
        </div>
      </div>
  );

  const openedMenu = (
      <>
        {menuHeadContainer}
        <div className={styles['menu-body']}>
          <ul className={styles.menu}>
            {HeaderItems.map(({ route, name }) => (
                <li
                    key={name}
                    className={createClassNames(styles['menu-item'], { [styles.active]: pathName === route })}
                    onClick={() => menuItemHandler(route)}
                    onTouchStart={() => menuItemHandler(route)}
                >
                    {name}
                </li>
            ))}
          </ul>
        </div>
      </>
  );

  const closedMenu = (
      <>
        {menuHeadContainer}
      </>
  );

  return (
      <div>
        {isOpen ? openedMenu : closedMenu}
      </div>
  );
};