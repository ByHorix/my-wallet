import React, { useContext } from 'react';
import { AddNoteForm } from '../add-note-form/AddNoteForm';
import { GlobalContext } from '../GlobalContext';
import styles from './NotesScreen.module.scss';
import createClassNames from '../../createClassNames';

export const NotesScreen = ({ name }) => {

  const {
    amounts,
    notesLists,
  } = useContext(GlobalContext);

  const currentState = amounts[name];

  const notesScreenClasses = createClassNames(styles.container, 'border', 'border-1', 'rounded-bottom');
  const liClasses = createClassNames(styles['list-group-item'], 'list-group-item', 'd-flex', 'justify-content-between');
  const titleClasses = createClassNames(styles['d-flex'], 'd-flex', 'justify-content-between');

  const notesList = notesLists[name].length === 0
      ? <div className={styles['without-notes']}>Записей пока что нет...</div>
      : <ul className="list-group list-group-flush">
        {notesLists[name].map(({ id, amount, description, date }) => (
            <li
                key={id}
                className={liClasses}
            >
              <div className="w-25">| {amount}</div>
              <div className="w-50">| {description}</div>
              <div className="w-25">{date}</div>
            </li>
        ))}
      </ul>;

  return (
      <div className={notesScreenClasses}>
        <div className={titleClasses}>
          <h4 className={styles.total}>
            В общем и целом: {currentState}
          </h4>
          <AddNoteForm name={name}/>
        </div>
        <hr/>
        {notesList}
      </div>
  );
};