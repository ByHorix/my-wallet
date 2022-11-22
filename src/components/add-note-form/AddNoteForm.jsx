import React, { useState, useContext, useEffect } from 'react';
import createClassNames from '../../createClassNames';
import validateValues from '../../validateValues';
import { GlobalContext } from '../GlobalContext';
import { useLocation } from 'react-router-dom';
import styles from './AddNoteForm.module.scss';

export const AddNoteForm = ({ name }) => {
  const [isAddingNote, setIsAddingNote] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (isAddingNote) {
      setIsAddingNote(false);
    }
  }, [location.pathname]);

  const {
    amounts,
    setAmounts,
    notesLists,
    setNotesLists,
  } = useContext(GlobalContext);

  const [formState, setFormState] = useState({ amount: '', description: '' });

  const onChangeHandler = (e) => {
    e.preventDefault();
    const { target: { value, name } } = e;
    setFormState({ ...formState, [name]: value });
  };

  const addingNoteFormHandler = (e) => {
    e.preventDefault();
    const isValid = validateValues(formState.amount !== '', formState.description !== '');

    if (isValid) {
      const currentHistoryState = notesLists[name];
      // const currentAmountState = amountsState[activeTabState];
      const date = `${(new Date()).toLocaleDateString('ru-RU')} | ${(new Date()).toLocaleTimeString('ru-RU')}`;
      const newId = currentHistoryState.length;

      const newNoteItem = { id: newId, amount: formState.amount, description: formState.description, date };
      const newCurrentHistoryState = [newNoteItem, ...currentHistoryState];
      const newCurrentAmount = newCurrentHistoryState.reduce((acc, { amount }) => acc + Number(amount), 0);

      setNotesLists({ ...notesLists, [name]: newCurrentHistoryState });
      setAmounts({ ...amounts, [name]: newCurrentAmount });
      setFormState({ amount: '', description: '' });
      setIsAddingNote(false);
    }
  };

  const formClasses = createClassNames(styles['d-flex'], 'd-flex');
  const btnClasses = createClassNames(styles.btn, 'btn');
  const addNoteBtnClasses = createClassNames(btnClasses, 'btn-primary');
  const disabledClasses = createClassNames(styles.disabled, 'disabled');
  const btnSubmitClasses = createClassNames(btnClasses, 'btn-primary', { [disabledClasses]: formState.amount === '' || formState.description === '' });
  const cancelBtnClasses = createClassNames(btnClasses, 'btn-danger');

  if (!isAddingNote) {
    return (
        <div className={formClasses}>
          <button onClick={() => setIsAddingNote(true)} type="button" className={addNoteBtnClasses}>
            Добавить запись
          </button>
        </div>
    );
  }

  return (
      <form onSubmit={addingNoteFormHandler} className={formClasses}>
        <div className={styles['form-input']}>
          <input
              onChange={onChangeHandler}
              type="number"
              className="form-control"
              name="amount"
              value={formState.amount}
              placeholder="Сумма"
          />
        </div>
        <div className={styles['form-input']}>
          <input
              onChange={onChangeHandler}
              type="text"
              className="form-control"
              name="description"
              value={formState.description}
              placeholder="Описание"
          />
        </div>
        <div className="">
          <button type="submit" className={btnSubmitClasses}>Добавить</button>
        </div>
        <div className="">
          <button onClick={() => setIsAddingNote(false)} type="button" className={cancelBtnClasses}>Отмена</button>
        </div>
      </form>
  );
};