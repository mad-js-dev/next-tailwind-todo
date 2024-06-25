'use client'
import { ChangeEvent, useRef, useState } from 'react';
import { MdEdit, MdAdd, MdSearch, MdCheckBox, MdCheckBoxOutlineBlank, MdAllInclusive } from 'react-icons/md';
import TaskListItem from "./TaskListItem";
import ToggleButton from "../ToggleButton/ToggleButton";
import SearchBar from "../SearchBar/SearchBar";
import classNames from 'classnames';

type TaskListItemProps = {
    title: string
    description: string
    completed:boolean
}

type TaskListProps = {
    title: string
    data: TaskListItemProps[]
}

export default function TaskList(props:TaskListProps) {
    let [editMode, setEditMode] = useState(false);
    let titleInput = useRef<HTMLInputElement>(null);
    let [title, setTitle] = useState (props.title || 'Default title');
    let [searchString, setSearchString] = useState ('');
    let [toggleIndex, setToggleIndex] = useState (0);

    function toggleEditMode() {
        const inputElement = titleInput.current
        setEditMode(!editMode)

        if(inputElement !== null) {
            const selection = window.getSelection()
            if (selection !== null) { selection.removeAllRanges() }
            inputElement.selectionStart = inputElement.selectionEnd = inputElement.value.length
            setTimeout(() => {inputElement.focus()})
        }
    }

    function filterData() {
        let result = props.data.filter((item) => {
            if(searchString!='') {
                return (item.title.includes(searchString) ||item.description.includes(searchString))
            } else {
                return true
            }
        });

        if(toggleIndex!=0) {
            result = props.data.filter((item) => {
                if(toggleIndex==1 && item.completed) return true
                if(toggleIndex==2 && !item.completed) return true
                return false
            });
        }
        return result
    }

    return (
      <main
        className={'flex flex-col gap-3 rounded-xl bg-slate-50 shadow-lg p-3 relative z-1'}
      >
        <div className="flex flex-row justify-between gap-3">
            <div 
            className={classNames(
                'group', 
                {'is-editable': editMode}, 
                'flex'
            )}>
                <div className="content-center" onClick={toggleEditMode}>
                    <MdEdit  className="hover:text-green-600" />
                </div>
                <div className="content-center font-serif text-xl font-semibold">
                    <input 
                        type="text"  
                        ref={titleInput}
                        className="
                        bg-transparent border-2 rounded-md outline-0 p-1 box-border transition-all duration-300 
                        no-underline group-hover/labelWrapper:underline group-[.is-editable]:no-underline
                        hover:cursor-pointer
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
            <div>
                <div className="bg-slate-100 rounded-full p-2 shadow-md">
                    <MdAdd />
                </div>
            </div>
        </div>
        <div className="flex flex-row gap-3">
            <div className="basis-3/4">
                <SearchBar onChange={(e:string) => setSearchString(e)} />
            </div>
            <div className="basis-1/4 h-10">
                <div className="h-full">
                    <ToggleButton onChange={(index:number) => setToggleIndex(index)}/>
                </div>
            </div>
        </div>
        <div className="flex flex-col">
            {filterData().map((item, index) =>
                <TaskListItem key={index} title={item.title} description={item.description} completed={item.completed}/>
            )}
        </div>
      </main>
    );
  }
