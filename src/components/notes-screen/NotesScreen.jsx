import React, { useContext, useEffect, useState } from 'react';
import { AddNoteForm } from '../add-note-form/AddNoteForm';
import { GlobalContext } from '../GlobalContext';
import styles from './NotesScreen.module.scss';
import cn from '../../utils/createClassNames';
import { useLocation } from 'react-router-dom';

export const NotesScreen = ({ name }) => {
  const [isShowAddNoteForm, setIsShowAddNoteForm] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (isShowAddNoteForm) {
      setIsShowAddNoteForm(false);
    }
  }, [location.pathname]);

  const handleCloseForm = () => {
    setIsShowAddNoteForm(false);
  };

  const {
    amounts,
    notesLists,
  } = useContext(GlobalContext);

  const currentAmount = amounts[name];

  const notesList = notesLists[name].length === 0
      ? <div className={styles.withoutNotes}>Записей пока что нет...</div>
      : <ul className="list-group list-group-flush">
        {notesLists[name].map(({ id, amount, description, date }) => (
            <li
                key={id}
                className={cn(styles.listGroupItem, 'list-group-item')}
            >
              <div className={styles.amount}>{amount}</div>
              <div className={styles.description}>{description}</div>
              <div className={styles.date}>{date}</div>
            </li>
        ))}
      </ul>;

  return (
      <div className={cn(styles.container, 'border', 'border-1', 'rounded-bottom')}>
        { isShowAddNoteForm && <AddNoteForm noteType={name} handleCloseForm={handleCloseForm}/>}
        <div className={cn(styles.screenTitle, 'd-flex', 'justify-content-between')}>
          <h4 className={styles.total}>
            В общем и целом: {currentAmount}
          </h4>
          <button
              onClick={() => setIsShowAddNoteForm(true)}
              // onTouchStart={() => setIsShowAddNoteForm(true)}
              type="button"
              className={cn(styles.btn, 'btn', 'btn-primary')}
          >
            Добавить запись
          </button>
        </div>
        <hr/>
        {notesList}
      </div>
  );
};