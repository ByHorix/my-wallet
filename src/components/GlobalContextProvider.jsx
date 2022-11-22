import React, {useState} from 'react';
import {GlobalContext} from './GlobalContext';

export const GlobalContextProvider = ({children}) => {
  const [notesLists, setNotesLists] = useState({
    earns: [],
    expenditure: [],
    accumulations: [],
    arrearsIn: [],
    arrearsOut: [],
  })

  const [amounts, setAmounts] = useState({
    earns: 0,
    expenditure: 0,
    arrearsIn: 0,
    arrearsOut: 0,
    accumulations: 0,
  })

  const arrearsState = amounts.arrearsIn - amounts.arrearsOut;

  const balanceState = amounts.earns - amounts.expenditure - amounts.accumulations + arrearsState ;

  const contextValue = {
    amounts,
    setAmounts,
    notesLists,
    setNotesLists,
    balanceState,
  };

  return (
      <GlobalContext.Provider value={contextValue}>
        {children}
      </GlobalContext.Provider>
  );
};