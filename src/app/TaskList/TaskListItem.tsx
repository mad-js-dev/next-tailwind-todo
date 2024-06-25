import { useState, useRef, useEffect } from 'react';
import classNames from "classnames";
import { MdEdit, MdDelete, MdOutlineSave, MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';

type TaskListItemProps = {
    title: string
    description: string
    completed:boolean,
    onChange?: Function
}

export default function TaskList(props:TaskListItemProps) { 
    // States
    let [editMode, setEditMode] = useState (false);
    let [expandedMode, setExpandedMode] = useState (false);
    // Data props
    let [completed, setCompleted] = useState(props.completed);
    let [title, setTitle] = useState(props.title || 'Default title');
    let [description, setDescription] = useState(props.description || 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit optio libero aperiam eius dolorum facere, architecto temporibus esse.')
    // Dom Refs
    let titleInput = useRef<HTMLInputElement>(null);
    let descriptionInput = useRef<HTMLTextAreaElement>(null);

    
    useEffect(() => {
        setTitle(props.title)
    }, [props.title]);

    useEffect(() => {
        setDescription(props.description)
    }, [props.description]);

    useEffect(() => {
        setCompleted(props.completed)
    }, [props.completed]);
    

    useEffect(() => {
        console.log('t', title != props.title)
        console.log('d', description != props.description)
        console.log('c', completed != props.completed)
        if(
            title != props.title || 
            description!= props.description ||
            completed != props.completed
        ) {
            const changeEvent = {action: 'edit', data: {title: title, description: description, completed: completed} as TaskListItemProps}
            console.log('ev', changeEvent)
            if(props.onChange) props.onChange(changeEvent)
        }
    }, [completed, description, props, title]);

    function toggleCheckbox() {
        setCompleted((prevCompleted) => !prevCompleted)
    }

    function toggleDescription() {
        if(!editMode)setExpandedMode(!expandedMode)
    }
    
    function toggleEditMode() {
        const inputElement = titleInput.current
        setEditMode(!editMode)

        if(inputElement !== null) {
            const selection = window.getSelection()
            if (selection !== null) { selection.removeAllRanges() }
            inputElement.selectionStart = inputElement.selectionEnd = inputElement.value.length
            setTimeout(() => {inputElement.focus()})
        }
/*
        if(!editMode) {
            if(
                title != props.title || 
                description!= props.description
            ) {
                const changeEvent = {action: 'edit', data: {title: title, description: description, completed: completed} as TaskListItemProps}
                if(props.onChange) props.onChange(changeEvent)
            }
        }*/
    }

    return (
        <main className={classNames(
            'group', 
            {'is-editable': editMode}, 
            {'is-expanded': expandedMode}, 
            {'is-checked': completed}, 
            'border-b-2 last:border-b-0'
        )}>
            <div className="flex flex-col w-full content-around gap-2 group[is-editable]:gap-2">
                <div className="flex flex-row  mt-1">
                    <div className="content-center pr-2 hover:cursor-pointer">
                        <div className="hidden group-[.is-editable]:block">
                            <MdDelete className="hover:text-red-600" />
                        </div>
                        <div className="block group-[.is-checked]:hidden group-[.is-editable]:hidden" onClick={toggleCheckbox}>
                            <MdCheckBoxOutlineBlank />
                        </div>
                        <div className="block hidden group-[.is-checked]:block group-[.is-editable]:hidden" onClick={toggleCheckbox}>
                            <MdCheckBox />
                        </div>
                    </div>
                    <div 
                    className="group/labelWrapper grow content-center pr-2 text-md hover:cursor-pointer"
                    >
                        <div onClick={toggleDescription}>
                            <input 
                                type="text"  
                                ref={titleInput}
                                className="
                                bg-transparent border-2 rounded-md outline-0 p-1 box-border transition-all duration-300 
                                no-underline group-hover/labelWrapper:underline  group-[.is-editable]:no-underline
                                border-slate-50 group-[.is-editable]:border-black 
                                pl-0 group-[.is-editable]:pl-1 
                                disabled:pointer-events-none
                                "
                                value={title} 
                                onChange={e => setTitle(e.target.value)}
                                disabled={!editMode} 
                            />
                        </div>
                    </div>
                    <div className="content-center pr-2" >
                        <div className="hover:cursor-pointer" onClick={toggleEditMode}>
                            <div className="hidden group-[.is-editable]:block">
                                <MdOutlineSave  className="hover:text-green-600" />
                            </div>
                            <div className="block group-[.is-editable]:hidden">
                                <MdEdit />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="
                text-xs py-0 
                overflow-hidden group-[.is-editable]:overflow-visible group-[.is-expanded]:overflow-visible 
                h-0 group-[.is-editable]:h-full group-[.is-expanded]:h-full">
                    <textarea 
                        ref={descriptionInput}
                        className="
                        w-full scroll-auto min-h-20 resize-none bg-transparent border-2 rounded-md outline-0 pr-1 py-1 box-border 
                        transition-all duration-300 
                        border-slate-50 group-[.is-editable]:border-black 
                        pl-0 group-[.is-editable]:pl-1 
                        h-0 group-[.is-editable]:h-auto group-[.is-expanded]:h-auto
                        "
                        onChange={e => setTitle(e.target.value)}
                        value={description}
                        disabled={!editMode} 
                    />
                </div>
            </div>
      </main>
    );
  }
