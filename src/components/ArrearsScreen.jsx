import React, {useState, useContext} from "react";
import {ArrearsInOut} from "./ArrearsInOut";
import createClassNames from "../utils/createClassNames";
import {GlobalContext} from "./GlobalContext";

export const ArrearsScreen = ({name}) => {
    const {
        amountsState,
        setAmountsState,
        historyState,
        setHistoryState,
        activeTabState,
    } = useContext(GlobalContext);

    const [addingArrearsInNotesState, setAddingArrearsInNoteState] = useState(false);
    const [addingArrearsOutNotesState, setAddingArrearsOutNoteState] = useState(false);

    const componentClassName = createClassNames("d-flex", "justify-content-between", "notes-screen", "border", "border-1", "rounded-bottom", "container", "vw-60", {"d-none": activeTabState !== name});


    return (
        <div className={componentClassName}>
            <ArrearsInOut
                name="arrearsIn"
            />
            <ArrearsInOut
                name="arrearsOut"
            />
        </div>
    );
}