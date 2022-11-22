import React, {useContext} from "react";
import {AddNoteForm} from "./add-note-form/AddNoteForm";
import createClassNames from "../createClassNames";
import {GlobalContext} from "./GlobalContext";


export const ArrearsInOut = ({name}) => {
    const {
        amountsState,
        setAmountsState,
        historyState,
        setHistoryState,
        addingNoteState,
        setAddingNote,
    } = useContext(GlobalContext);

    const title = name === 'arrearsIn' ? `Вы должны: ${amountsState[name]}` : `Вам должны: ${amountsState[name]}`;
    const noteList = historyState[name].length === 0
        ? 'Записей пока что нет...'
        : historyState[name].map(({id, amount, description, date}) => {
            return (
                <ul className="list-group list-group-flush">
                    {historyState[name].map(({id, amount, description, date}) => (
                        <li
                            key={id}
                            className="list-group-item d-flex justify-content-between"
                        >
                            <div className="w-25">| {amount}</div>
                            <div className="w-50">| {description}</div>
                            <div className="w-25">{date}</div>
                        </li>
                    ))}
                </ul>
            );
        });

    const titleDivClassName = createClassNames({"d-flex justify-content-between align-items-center": !addingNoteState});

    return (
        <div className="arrears-item border border-1">
            <div className={titleDivClassName}>
                <h5>
                    {title}
                </h5>

            </div>
            <hr/>
            {noteList}
        </div>
    );
}