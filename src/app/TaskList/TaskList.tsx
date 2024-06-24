'use client'
import { MdEdit, MdAdd, MdSearch, MdCheckBox, MdCheckBoxOutlineBlank, MdAllInclusive } from 'react-icons/md';
import TaskListItem from "./TaskListItem";

export default function TaskList() {

    return (
      <main className="flex flex-col gap-3 rounded-xl bg-slate-50 shadow-lg p-3 relative z-1">
        <div className="flex flex-row justify-between gap-3">
            <div className="flex">
                <div className="content-center">
                    <MdEdit />
                </div>
                <div className="content-center font-serif text-xl font-semibold">
                    Header Edition
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
                <div className="flex flex-row bg-slate-100 rounded-full shadow-md h-10 p-2">
                    <div className="content-center">
                        <MdSearch /> 
                    </div>
                    <div className="content-center text-md align-middle	">
                        <span className="align-middle">
                            Search
                        </span>
                        ...
                    </div>
                </div>
            </div>
            <div className="basis-1/4">
                <div className="flex border rounded px-2 py-1 text-xs">
                    <div className="content-center pr-2">
                        <MdCheckBoxOutlineBlank /> 
                    </div>
                    <div className="content-center text-xs">
                        Not done
                    </div>
                </div>
            </div>
        </div>
        <div className="flex flex-row">
            <TaskListItem />
        </div>
      </main>
    );
  }

  /*
                      <MdCheckBox /> 

<MdCheckBoxOutlineBlank /> 
<MdAllInclusive />
*/