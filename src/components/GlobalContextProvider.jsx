import React, { useEffect, useState } from 'react';
import { GlobalContext } from './GlobalContext';
import * as LS from '../utils/localStorage';
import { getSumFromNotesList } from '../utils/getSumFromNotesList';
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

  const handleAddNote = (noteType, noteItem) => {
    setAmounts((prevState) => ({
      ...prevState,
      [noteType]: getSumFromNotesList([noteItem, ...notesLists[noteType]]),
    }));

    setNotesLists((prevState) => ({
      ...prevState,
      [noteType]: [noteItem, ...prevState[noteType]],
    }));

    LS.setItem('notesList', { ...notesLists, [noteType]: [noteItem, ...notesLists[noteType]]});
  };

  const contextValue = {
    amounts,
    setAmounts,
    notesLists,
    handleAddNote,
    balanceState,
  };

  return (
      <GlobalContext.Provider value={contextValue}>
        {children}
      </GlobalContext.Provider>
  );
};