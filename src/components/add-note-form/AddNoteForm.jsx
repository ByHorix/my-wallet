import React, { useState, useContext, useEffect } from 'react';
import cn from '../../utils/createClassNames';
import validateValues from '../../utils/validateValues';
import { GlobalContext } from '../GlobalContext';
import styles from './AddNoteForm.module.scss';
import { v1 } from 'uuid';

export const AddNoteForm = ({ noteType, handleCloseForm }) => {
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
      handleCloseForm();
    }
  };

  return (
      <div
          className={styles.modalWindow}
          onClick={handleCloseForm}
          // onTouchStart={closeForm}
      >
        <form
            onSubmit={handleSubmit}
            className={styles.formContainer}
            onClick={(e) => e.stopPropagation()}
            // onTouchStart={(e) => e.stopPropagation()}
        >
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
          <textarea
              onChange={handleInputChange}
              className={cn(styles.formControl, styles.textarea, 'form-control')}
              name="description"
              value={formState.description}
              placeholder="Описание"
              rows="3"
          />
          </div>
          <div className={styles.buttonsContainer}>
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
                // onTouchStart={closeForm}
                onClick={handleCloseForm}
                type="button"
                className={cn(styles.btn, 'btn', 'btn-danger')}
            >
              Отмена
            </button>
          </div>
        </form>
      </div>
  );
};