import React, { useContext } from 'react';
import { Tab } from '../tab/Tab';
import { GlobalContext } from '../GlobalContext';
import { HeaderItems } from '../../utils/config';
import styles from './Header.module.scss';
import cn from '../../utils/createClassNames';
import { BurgerMenu } from '../burger-menu/BurgerMenu';


// 'MyWallet',+
// 'доход',+
// 'расход',+
// 'долги',-
// 'накопления'+

export const Header = () => {
  const { balanceState, amounts } = useContext(GlobalContext);


  return (
      <header className={styles.header}>
        <div className={styles.burgerMenu}>
          <BurgerMenu/>
        </div>
        <nav className={cn(styles.nav, 'nav nav-fill')}>
          <ul className={cn(styles.navTabs, 'nav nav-tabs')}>
            {HeaderItems.map(({ name, route }) => (
                <Tab
                    key={name}
                    route={route}
                    name={name}
                />
            ))}
          </ul>
          <div className={cn('nav-item', 'navLink', styles.balance)}>
            <div className={styles.balanceItem}>
              {`Общий баланс: ${balanceState}`}
            </div>
            <div className={styles.balanceItem}>
              {`Накопления: ${amounts.accumulations}`}
            </div>
          </div>
        </nav>
      </header>
  );
};