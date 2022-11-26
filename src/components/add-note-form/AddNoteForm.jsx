import React, { useState, useContext, useEffect } from 'react';
import cn from '../../createClassNames';
import validateValues from '../../validateValues';
import { GlobalContext } from '../GlobalContext';
import { useLocation } from 'react-router-dom';
import styles from './AddNoteForm.module.scss';
import { v1 } from 'uuid';

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
  const isDisabledSubmitBtn = formState.amount === '' || formState.description === '';

  const handleInputChange = (e) => {
    e.preventDefault();
    const { target: { value, name } } = e;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateValues(formState.amount !== '', formState.description !== '');

    if (isValid) {
      const currentHistoryState = notesLists[name];
      const date = `${(new Date()).toLocaleDateString('ru-RU')} | ${(new Date()).toLocaleTimeString('ru-RU')}`;
      const newId = v1();

      const newNoteItem = { id: newId, amount: formState.amount, description: formState.description, date };
      const newCurrentHistoryState = [newNoteItem, ...currentHistoryState];
      const newCurrentAmount = newCurrentHistoryState.reduce((acc, { amount }) => acc + Number(amount), 0);

      setNotesLists({ ...notesLists, [name]: newCurrentHistoryState });
      setAmounts({ ...amounts, [name]: newCurrentAmount });
      setFormState({ amount: '', description: '' });
      setIsAddingNote(false);
    }
  };

  const handleCloseForm = () => {
    setIsAddingNote(false);
  };

  if (!isAddingNote) {
    return (
        <div className={cn(styles.formContainer, 'd-flex')}>
          <button
              onClick={() => setIsAddingNote(true)}
              onTouchStart={() => setIsAddingNote(true)}
              type="button"
              className={cn(styles.btn, 'btn', 'btn-primary')}
          >
            Добавить запись
          </button>
        </div>
    );
  }

  return (
      <form onSubmit={handleSubmit} className={cn(styles.formContainer, 'd-flex')}>
        <div className={styles.formInput}>
          <input
              onChange={handleInputChange}
              type="number"
              className={cn(styles.formControl, 'form-control')}
              name="amount"
              value={formState.amount}
              placeholder="Сумма"
          />
        </div>
        <div className={styles.formInput}>
          <input
              onChange={handleInputChange}
              type="text"
              className={cn(styles.formControl, 'form-control')}
              name="description"
              value={formState.description}
              placeholder="Описание"
          />
        </div>
        <button
            type="submit"
            disabled={isDisabledSubmitBtn}
            className={
              cn(
                  styles.btn,
                  'btn',
                  'btn-primary',
                  { [styles.disabled]: isDisabledSubmitBtn }
              )
            }
        >
          Добавить
        </button>
        <button
            onTouchStart={handleCloseForm}
            onClick={handleCloseForm}
            type="button"
            className={cn(styles.btn, 'btn', 'btn-danger')}
        >
          Отмена
        </button>
      </form>
  );
};