    'use client'
    
    import { useState } from 'react';
    import { MdCheckBox, MdCheckBoxOutlineBlank, MdAllInclusive } from 'react-icons/md';
    import classNames from "classnames";

    type ToggleButtonProps = {
        onChange: Function
    }

    export default function ToggleButton(props:ToggleButtonProps) {
        let [toggleState, setToggleState] = useState (false);
        let [selectedIndex, setSelectedIndex] = useState (0);
        
        function setState(index:number) {
            setSelectedIndex(index)
            props.onChange(index)
        }

        return (
            <div className={classNames(
                "group", 
                {'is-allSet': selectedIndex==0}, 
                {'is-doneSet': selectedIndex==1}, 
                {'is-notdoneSet': selectedIndex==2}, 
                "h-full flex border rounded px-2 py-1 text-xs"
            )   
            }
            onClick={() => setState((selectedIndex==2) ? 0 : ++selectedIndex)}
            >
                <div className="content-center pr-2">
                    <div className="hidden group-[.is-allSet]:block">
                        <MdAllInclusive />
                    </div>
                    <div className="hidden group-[.is-doneSet]:block">
                        <MdCheckBox />
                    </div>
                    <div className="hidden group-[.is-notdoneSet]:block">
                        <MdCheckBoxOutlineBlank />
                    </div>
                </div>
                <div className="content-center text-xs">
                    { (selectedIndex==0) ? 'All' : (selectedIndex==1) ? 'Done' : 'Not done'}
                </div>
            </div>
        );
    }
