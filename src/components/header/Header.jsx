import React, { useContext } from 'react';
import { Tab } from '../tab/Tab';
import { GlobalContext } from '../GlobalContext';
import { HeaderItems } from '../../config';
import styles from './Header.module.scss';
import createClassNames from '../../createClassNames';
import { BurgerMenu } from '../burger-menu/BurgerMenu';


// 'MyWallet',+
// 'доход',+
// 'расход',+
// 'долги',-
// 'накопления'+

export const Header = () => {
  const { balanceState, amounts } = useContext(GlobalContext);
  const navClasses = createClassNames(styles.nav, 'nav nav-fill');
  const ulClasses = createClassNames(styles['nav-tabs'], 'nav nav-tabs');
  const balanceClasses = createClassNames('nav-item', 'nav-link', styles.balance);
  const burgerMenuClasses = createClassNames(styles['burger-menu']);


  return (
      <header className={styles.header}>
        <div className={burgerMenuClasses}>
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
            <div className={styles['balance-item']}>
              {`Общий баланс: ${balanceState}`}
            </div>
            <div className={styles['balance-item']}>
              {`Накопления: ${amounts.accumulations}`}
            </div>
          </div>
        </nav>
      </header>
  );
};