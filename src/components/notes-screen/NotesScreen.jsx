import React, { useContext } from 'react';
import { AddNoteForm } from '../add-note-form/AddNoteForm';
import { GlobalContext } from '../GlobalContext';
import styles from './NotesScreen.module.scss';
import cn from '../../utils/createClassNames';

export const NotesScreen = ({ name }) => {

  const {
    amounts,
    notesLists,
  } = useContext(GlobalContext);

  const currentState = amounts[name];

  const notesList = notesLists[name].length === 0
      ? <div className={styles.withoutNotes}>Записей пока что нет...</div>
      : <ul className="list-group list-group-flush">
        {notesLists[name].map(({ id, amount, description, date }) => (
            <li
                key={id}
                className={cn(styles.listGroupItem, 'list-group-item', 'd-flex', 'justify-content-between')}
            >
              <div className={styles.amount}>| {amount}</div>
              <div className={styles.description}>| {description}</div>
              <div className={styles.date}>{date}</div>
            </li>
        ))}
      </ul>;

  return (
      <div className={cn(styles.container, 'border', 'border-1', 'rounded-bottom')}>
        <div className={cn(styles.screenTitle, 'd-flex', 'justify-content-between')}>
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