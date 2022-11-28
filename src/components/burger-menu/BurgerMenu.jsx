import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../GlobalContext';
import { HeaderItems } from '../../utils/config';
import styles from './BurgerMenu.module.scss';
import burgerMenuIcon from '../../menu-icon/menu-icon.svg';
import closeMenuIcon from '../../menu-icon/close-menu-icon.svg';
import cn from '../../utils/createClassNames';

export const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { amounts: { accumulations }, balanceState } = useContext(GlobalContext);

  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (route) => {
    navigate(route);
    setIsOpen(false);
  };

  const handleOpenMenu = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  return (
      <div>
        <div className={styles.menuHead} onTouchEnd={handleOpenMenu}>
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
                            className={cn(styles.menuItem, { [styles.active]: location.pathname === route })}
                            onTouchEnd={() => handleNavigate(route)}
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