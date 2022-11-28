import React, { useState, useContext, useEffect } from 'react';
import cn from '../../utils/createClassNames';
import validateValues from '../../utils/validateValues';
import { GlobalContext } from '../GlobalContext';
import { useLocation } from 'react-router-dom';
import styles from './AddNoteForm.module.scss';
import { v1 } from 'uuid';

export const AddNoteForm = ({ noteType }) => {
  const [isAddingNote, setIsAddingNote] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (isAddingNote) {
      setIsAddingNote(false);
    }
  }, [location.pathname]);

  const {
    handleAddNote,
  } = useContext(GlobalContext);

  const [formState, setFormState] = useState({ amount: '', description: '' });
  const isDisabledSubmitBtn = formState.amount === '' || formState.description === '';

  const handleInputChange = ( { target: { value, name } } ) => {
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateValues(formState.amount !== '', formState.description !== '');

    if (isValid) {
      const date = `${(new Date()).toLocaleDateString('ru-RU')} | ${(new Date()).toLocaleTimeString('ru-RU')}`;

      const noteItem = { id: v1(), amount: formState.amount, description: formState.description, date };

      handleAddNote(noteType, noteItem );
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