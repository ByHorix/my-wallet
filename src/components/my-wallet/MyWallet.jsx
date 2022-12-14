import React, { useContext } from 'react';
import { GlobalContext } from '../GlobalContext';
import { useNavigate } from 'react-router-dom';
import styles from './MyWallet.module.scss';
import cn from '../../utils/createClassNames';

export const MyWallet = () => {
  const { amounts } = useContext(GlobalContext);

  const navigate = useNavigate();

  const {
    earns, expenditure, // arrearsIn, arrearsOut,
    accumulations
  } = amounts;

  const btnClasses = cn(styles.btn, 'btn', 'btn-outline-warning');

  return (<div className={styles.container}>
    <ul className="list-group">
      <li
          className={
            cn(
                styles.listGroupItem,
                'list-group-item',
                'd-flex',
                'justify-content-left',
                'align-items-center'
            )
          }
      >
        <button onClick={() => navigate('/earns')} type="button" className={btnClasses}
                name="earns">Подробнее...
        </button>
        <span className={cn(styles.listGroupItemName, 'list-group-item-name')}>Доход</span>
        <span className={cn(styles.badge, 'badge', 'rounded-pill')}>{earns}</span>
      </li>
      <li
          className={
            cn(
                styles.listGroupItem,
                'list-group-item',
                'd-flex',
                'justify-content-left',
                'align-items-center'
            )
          }
      >
        <button onClick={() => navigate('/expenditure')} type="button" className={btnClasses}
                name="expenditure">Подробнее...
        </button>
        <span className={cn(styles.listGroupItemName, 'list-group-item-name')}>Расход</span>
        <span className={cn(styles.badge, 'badge', 'rounded-pill')}>{expenditure}</span>
      </li>
      {/*<li className="list-group-item d-flex justify-content-left align-items-center">*/}
      {/*    <button onClick={handler} type="button" className="btn btn-outline-warning edit-btn"*/}
      {/*            name="arrears">Подробнее...*/}
      {/*    </button>*/}
      {/*    <span className="list-group-item-name d-block w-75">Долги</span>*/}
      {/*    <span className="badge bg-primary rounded-pill">{totalArrears}</span>*/}
      {/*</li>*/}
      <li
          className={
            cn(
                styles.listGroupItem,
                'list-group-item',
                'd-flex',
                'justify-content-left',
                'align-items-center'
            )
          }>
        <button onClick={() => navigate('/accumulations')} type="button" className={btnClasses}
                name="accumulations">Подробнее...
        </button>
        <span className={cn(styles.listGroupItemName, 'list-group-item-name')}>Накопления</span>
        <span className={cn(styles.badge, 'badge', 'rounded-pill')}>{accumulations}</span>
      </li>
    </ul>
  </div>);
};