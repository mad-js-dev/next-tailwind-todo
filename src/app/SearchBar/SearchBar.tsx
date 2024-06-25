'use client'
import { useRef, useState } from 'react';
import { MdEdit, MdAdd, MdSearch, MdCheckBox, MdCheckBoxOutlineBlank, MdAllInclusive } from 'react-icons/md';
import classNames from 'classnames';

type searchBarProps = {
    onChange: Function
}

export default function SearchBar(props:searchBarProps) {
    return (
      <main
        className={'flex flex-row bg-slate-100 rounded-full shadow-md h-10 p-2'}
      >
            <div className="content-center">
                <MdSearch />
            </div>
            <div className="content-center text-md align-middle	">
                <div className="align-middle">
                    <input 
                    type="text" 
                    placeholder="Search"
                    className="bg-slate-100 outline-none"
                    onChange={e => props.onChange(e.target.value)}
                     />
                </div>
            </div>
      </main>
    );
  }
