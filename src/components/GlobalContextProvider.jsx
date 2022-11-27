import React, { useEffect, useState } from 'react';
import { GlobalContext } from './GlobalContext';
import * as LS from '../utils/localStorage';
import { getSumFromNotesList } from '../utils/getSumFromNotesList';
import { getItem } from '../utils/localStorage';
import { calculateInitialAmounts } from '../utils/calculateInitialAmounts';

const INITIAL_NOTES_LISTS = {
  earns: [],
  expenditure: [],
  accumulations: [],
  arrearsIn: [],
  arrearsOut: [],
};

const INITIAL_AMOUNTS = {
  earns: 0,
  expenditure: 0,
  arrearsIn: 0,
  arrearsOut: 0,
  accumulations: 0,
};

export const GlobalContextProvider = ({ children }) => {
  const [notesLists, setNotesLists] = useState(INITIAL_NOTES_LISTS);
  const [amounts, setAmounts] = useState(INITIAL_AMOUNTS);

  const arrearsState = amounts.arrearsIn - amounts.arrearsOut;
  const balanceState = amounts.earns - amounts.expenditure - amounts.accumulations + arrearsState;

  useEffect(() => {
    const data = LS.getItem('notesList');
    setNotesLists(data || INITIAL_NOTES_LISTS);
    setAmounts(data ? calculateInitialAmounts(INITIAL_AMOUNTS, data) : INITIAL_AMOUNTS);
  }, []);

  const handleAddNote = (notesList) => {
    const [ currentKey ] = Object.keys(notesList);

    setAmounts((prevState) => ({
      ...prevState,
      [currentKey]: getSumFromNotesList(notesList[currentKey])
    }));

    setNotesLists((prevState) => ({
      ...prevState,
      ...notesList
    }));
    LS.setItem('notesList', { ...notesLists, ...notesList });
  };

  const contextValue = {
    amounts,
    setAmounts,
    notesLists,
    setNotesLists: handleAddNote,
    balanceState,
  };

  return (
      <GlobalContext.Provider value={contextValue}>
        {children}
      </GlobalContext.Provider>
  );
};