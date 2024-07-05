'use client'
import { useRef, useState } from 'react';
import classNames from 'classnames';
import type {TaskListProps, TaskListEventType} from '@/types/TaskList.d'

import { MdEdit, MdAdd } from 'react-icons/md';
import TaskListItem from "./TaskListItem";
import ToggleButton from "../ToggleButton/ToggleButton";
import SearchBar from "../SearchBar/SearchBar";

export default function TaskList(props:TaskListProps) {
    let [editMode, setEditMode] = useState(false);
    let [isLoading, setIsLoading] = useState(false);
    let titleInput = useRef<HTMLInputElement>(null);
    let [title, setTitle] = useState (props.title);
    let [searchString, setSearchString] = useState ('');
    let [toggleIndex, setToggleIndex] = useState (0);

    // Event triggers
    function titleEdit(newTitle:string) {
        setTitle(newTitle)
    }
    
    function createItem() {
        const changeEvent = {action: 'createItem'}
        if(props.onChange) props.onChange(changeEvent)
    }
    
    function itemEdit(changeEvent:TaskListEventType) {
        if(props.onChange) props.onChange(changeEvent)
    }

    function toggleEditMode() {
        const inputElement = titleInput.current
        setEditMode(!editMode)

        if(inputElement !== null) {
            const selection = window.getSelection()
            if (selection !== null) { selection.removeAllRanges() }
            inputElement.selectionStart = inputElement.selectionEnd = inputElement.value.length
            setTimeout(() => {inputElement.focus()})

            if(editMode && inputElement.value != props.title) {
                const changeEvent = {action: 'editTitle', data: inputElement.value}
                if(props.onChange) props.onChange(changeEvent)
            }
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
        className="flex flex-col gap-3 p-3 rounded-xl bg-slate-50 shadow-lg relative z-1 w-full"
      >
        <div className="flex flex-row gap-3  justify-between">
            <div 
            className={classNames(
                'group', 
                {'is-editable': editMode}, 
                {'is-loading': false}, 
                {'is-empty': filterData().length === 0}, 
                'flex'
            )}>
                <div className="content-center" onClick={toggleEditMode}>
                    <MdEdit className="hover:text-green-600 mb-3" />
                </div>
                <div className="content-center font-serif text-2xl font-semibold">
                    <input 
                        type="text"  
                        ref={titleInput}
                        className="
                        w-full bg-transparent border-2 rounded-md outline-0 p-1 box-border transition-all duration-300 
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
                    <MdAdd onClick={createItem}  size="24"/>
                </div>
            </div>
        </div>
        <div className="flex flex-row gap-3">
            <div className="basis-3/4 transition-all duration-300">
                <SearchBar onChange={(e:string) => setSearchString(e)} />
            </div>
            <div className="basis-1/4 h-10 transition-all duration-300">
                <div className="h-full w-full">
                    <ToggleButton onChange={(index:number) => setToggleIndex(index)}/>
                </div>
            </div>
        </div>
        <div className="flex flex-col">
            <div className="h-60 overflow-y-auto">
                <div className={(filterData().length < 1) ? "text-center my-24 font-bold block" : "text-center my-6 font-bold hidden"}>No data available</div>
                <div className={(isLoading) ? "text-center my-24 font-bold block" : "text-center my-6 font-bold hidden"}>No data available</div>
                {filterData().map((item, index) =>
                    <TaskListItem 
                        key={index} 
                        id={item.id}
                        title={item.title} 
                        description={item.description} 
                        completed={item.completed}
                        onChange={(data:TaskListEventType) => itemEdit(data)}
                    />
                )}
            </div>
        </div>
      </main>
    );
  }
