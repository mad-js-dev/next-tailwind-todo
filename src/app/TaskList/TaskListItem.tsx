import { useState, useRef } from 'react';
import classNames from "classnames";
import { MdEdit, MdOutlineSave, MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';
export default function TaskList() { 

    let [editMode, setEditMode] = useState (false);
    let [completed, setCompleted] = useState (false);
    let [title, setTitle] = useState ('Default title');
    let [description, setDescription] = useState ('Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit optio libero aperiam eius dolorum facere, architecto temporibus esse.')
    let titleInput = useRef<HTMLInputElement>(null);
    let descriptionInput = useRef<HTMLTextAreaElement>(null);

    function toggleCheckbox() {
        setCompleted(!completed)
    }

    function toggleEditMode() {
        const inputElement = titleInput.current

        setEditMode(!editMode)

        if(inputElement !== null) {
            const selection = window.getSelection()
            if (selection !== null) {selection.removeAllRanges();}
            inputElement.selectionStart = inputElement.selectionEnd = inputElement.value.length
            setTimeout(() => {inputElement.focus()})
            
        }
    }


    return (
        <main className={classNames(
            "group", 
            {'is-editable': editMode}, 
            {'is-checked': completed}, 
            `flex flex-row justify-between w-full`
        )}>
            <div className="flex flex-col w-full">
                <div className="flex flex-row">
                    <div className="content-center pr-2"  onClick={toggleCheckbox}>
                        <div className="block group-[.is-checked]:hidden">
                            <MdCheckBoxOutlineBlank />
                        </div>
                        <div className="hidden group-[.is-checked]:block">
                            <MdCheckBox />
                        </div>
                    </div>
                    <div className="grow content-center pr-2 text-md">
                        <input 
                            type="text"  
                            ref={titleInput}
                            className="bg-transparent border-2 rounded-md outline-0 p-1 box-border transition-all duration-300  border-slate-50 group-[.is-editable]:border-black pl-0 group-[.is-editable]:pl-1"
                            value={title} 
                            onChange={e => setTitle(e.target.value)}
                            disabled={!editMode} 
                        />
                    </div>
                    <div className="content-center pr-2" >
                        {
                            //!editMode && <MdEdit/>
                        }
                        <div onClick={toggleEditMode}>
                            <div className="hidden group-[.is-editable]:block">
                            <MdOutlineSave />
                            </div>
                            <div className="block group-[.is-editable]:hidden">
                                <MdEdit />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-xs py-2">
                    <textarea 
                        rows={5}
                        ref={descriptionInput}
                        className="w-full bg-transparent border-2 rounded-md outline-0  pr-1 py-1 box-border transition-all duration-300  border-slate-50 group-[.is-editable]:border-black pl-0 group-[.is-editable]:pl-1"
                        onChange={e => setTitle(e.target.value)}
                        disabled={!editMode} 
                        value={description}
                    />
                </div>
            </div>
      </main>
    );
  }
