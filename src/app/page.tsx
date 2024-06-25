'use client'
import { useState } from "react";
import Image from "next/image";
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '@/store/counterSlice'

import TaskList from "./TaskList/TaskList";

const data  = [
  {
    title: 'Lorem ipsum dolor sit Alpha',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit optio libero aperiam eius dolorum facere, architecto temporibus esse.',
    completed: false
  },
  {
    title: 'Lorem ipsum dolor sit Beta',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit optio libero aperiam eius dolorum facere, architecto temporibus esse.',
    completed: false
  },
  {
    title: 'Lorem ipsum dolor sit Charlie',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit optio libero aperiam eius dolorum facere, architecto temporibus esse.',
    completed: false
  },
  {
    title: 'Lorem ipsum dolor sit Delta',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit optio libero aperiam eius dolorum facere, architecto temporibus esse.',
    completed: false
  }
]

export default function Home() {
  let [taskListData, setTaskListData] = useState(data);

  const count = useSelector((state:any) => state.counter.value)
  const dispatch = useDispatch()

  console.log(count)
  
  function updateStore(changeEvent:any) {
    let result = {...taskListData}
    console.log(changeEvent)
  }

  return (
    <main className="flex  flex-col items-center justify-around p-24 text-black">
      <div className="relative z-1 min-h-screen flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
        <TaskList title={'My To do list'} data={data} onChange={updateStore}/>
      </div>

    </main>
  );
}
