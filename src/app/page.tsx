'use client'
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { updateTitle, createItem, updateItem, deleteItem  } from '@/store/taskListSlice'
import { MdArrowForward, MdArrowDownward } from 'react-icons/md';
import Image from 'next/image'
import TaskList from "./TaskList/TaskList";

export default function Home() {
  const taskListTitle = useSelector((state:any) => state.taskList.title)
  const taskListData = useSelector((state:any) => state.taskList.data)
  const dispatch = useDispatch()
  
  function updateStore(changeEvent:any) {
    console.log('view event', changeEvent)
    if(changeEvent.action == 'editTitle') {
      dispatch(updateTitle(changeEvent.data))
    }else if(changeEvent.action == 'createItem') {
      dispatch(createItem())
    }else if(changeEvent.action == 'editItem') {
      dispatch(updateItem(changeEvent.data))
    }else if(changeEvent.action == 'deleteItem') {
      dispatch(deleteItem(changeEvent.data))
    }
  }

  return (
    <main className="flex flex-col items-center justify-around text-black">
      <div className="
      flex items-center w-screen h-screen px-10 relative
      bg-gradient-to-b from-cyan-100 to-grey-100
      ">
        <div className="w-full h-auto">
          <Image className="mb-5" src="https://fakeimg.pl/440x320/CCC/FFF" alt="Hero image" width="440" height="320" />
          <h1 className="mb-1 font-mono text-3xl">TaskMinder</h1>
          <p className="mb-4">Keep track of you tasks, anywhere</p>
          <p className="mb-4" >Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus perferendis obcaecati pariatur molestiae illum voluptate error dolorem.</p>
          <button className="flex flex-row p-2 gap-2 items-center bg-yellow-600 rounded-md font-bold">
            Try it out now
            <MdArrowForward size="1.2rem" />
          </button>
        </div>
        <div className="absolute bottom-0 left-1/2 h-full w-12">
          <button className="
          border-black border-t-2 border-r-2 border-l-2 rounded-t-xl
          absolute bottom-0 group/scrollDown
          -ms-6
          ">
            <MdArrowDownward className="m-3 group-hover/scrollDown:mb-1 group-hover/scrollDown:mt-5 transition-all duration-150" size="1.2rem" />
          </button>
        </div>
      </div>
      
      <div className="
      flex items-center w-screen h-screen px-5 relative
      bg-gradient-to-t from-cyan-100 to-grey-100
      ">
        <div className="w-full h-auto">
          <TaskList title={taskListTitle} data={taskListData} onChange={updateStore}/>
        </div>
      </div>
    </main>
  );
}