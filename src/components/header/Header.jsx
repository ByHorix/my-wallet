import React, { useContext } from 'react';
import { Tab } from '../tab/Tab';
import { GlobalContext } from '../GlobalContext';
import { HeaderItems } from '../../config';
import styles from './Header.module.scss';
import cn from '../../createClassNames';
import { BurgerMenu } from '../burger-menu/BurgerMenu';


// 'MyWallet',+
// 'доход',+
// 'расход',+
// 'долги',-
// 'накопления'+

export const Header = () => {
  const { balanceState, amounts } = useContext(GlobalContext);
  const navClasses = cn(styles.nav, 'nav nav-fill');
  const ulClasses = cn(styles.navTabs, 'nav nav-tabs');
  const balanceClasses = cn('nav-item', 'navLink', styles.balance);


  return (
      <header className={styles.header}>
        <div className={styles.burgerMenu}>
          <BurgerMenu/>
        </div>
        <nav className={navClasses}>
          <ul className={ulClasses}>
            {HeaderItems.map(({ name, route }) => (
                <Tab
                    key={name}
                    route={route}
                    name={name}
                />
            ))}
          </ul>
          <div className={balanceClasses}>
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