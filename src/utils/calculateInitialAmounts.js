import { getSumFromNotesList } from './getSumFromNotesList';

export const calculateInitialAmounts = (init, data) => Object.keys(init)
    .reduce((acc, key) => ({...acc, [key]: getSumFromNotesList(data[key])}), {});