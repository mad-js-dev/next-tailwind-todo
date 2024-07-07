'use client'
import { DOMElement, useEffect, useState } from "react";
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import classNames from "classnames";
import { useSelector, useDispatch } from 'react-redux'
import { updateTitle, createItem, updateItem, deleteItem  } from '@/store/taskListSlice'
import { MdArrowForward, MdArrowDownward } from 'react-icons/md';
import Image from 'next/image'
import TaskList from "./TaskList/TaskList";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Home() {
  const taskListTitle = useSelector((state:any) => state.taskList.title)
  const taskListData = useSelector((state:any) => state.taskList.data)
  const dispatch = useDispatch()
  let [hasLoaded, setHasLoaded] = useState(false);
  useEffect(() => {
    let sections = gsap.utils.toArray(".panel-1, .panel-2")
    //Set elements hidden
    gsap.set('.intro', { opacity: 0 , x: 100})
    gsap.set('.content', { opacity: 0 })
    //Hide loading layer
    setHasLoaded(true)
    //Display all content
    gsap.to('.intro', { opacity: 1, x: 0, delay: 0, stagger: 0.15});
    gsap.to('.content', { opacity: 1, delay: 1});

    const scrolling = {
      enabled: true,
      events: "scroll,wheel,touchstart,pointermove".split(","),
      prevent: (e:Event) => e.preventDefault(),
      disable() {
        if (scrolling.enabled) {
          scrolling.enabled = false;
          window.addEventListener("scroll", gsap.ticker.tick, {passive: true});
          scrolling.events.forEach((e, i) => (i ? document : window).addEventListener(e, scrolling.prevent, {passive: false}));
        }
      },
      enable() {
        if (!scrolling.enabled) {
          scrolling.enabled = true;
          window.removeEventListener("scroll", gsap.ticker.tick);
          scrolling.events.forEach((e, i) => (i ? document : window).removeEventListener(e, scrolling.prevent));
        }
      }
    };
  
  
    function goToSection(section:any) {
      if (scrolling.enabled) { // skip if a scroll tween is in progress
        scrolling.disable();
        

        gsap.to(window, {
          scrollTo: {y: section, autoKill: false},
          onComplete: scrolling.enable,
          duration: 0.3,
        });

      }
    }

    
    ScrollTrigger.create({
      trigger: '.panel-2',
      start: "top bottom-=1",
      end: "bottom top+=1",
      onEnter: () => {
        console.log('1e');
        goToSection('.panel-2')
      },
      onEnterBack: (e) => {
        console.log('1l');
        goToSection('.panel-2')
      }
    });

    ScrollTrigger.create({
      trigger: '.panel-1',
      start: "top bottom-=1",
      end: "bottom top+=1",
      onEnter: (e) => {
        console.log('2e', e);
        goToSection('.panel-1')
      },
      onEnterBack: () => {
        console.log('2l');
        goToSection('.panel-1')
      }
    });
  }, []);

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
    <main className={classNames(
    'group',
    {'is-loading': hasLoaded},
    `scrollContainer lg:container lg:mx-auto sm:bg-gradient-to-t lg:bg-none lg:px-32 xl:px-48 from-cyan-50 to-grey-50 flex flex-col sm:flex-row items-center justify-around text-black w-screen overflow-x-hidden`)}>
      <div className="pointer-events-none fixed top-0 left-0 z-50 w-screen h-screen opacity-100 group-[.is-loading]:opacity-0 transitio-all duration-150 flex items-center	bg-white">
        <div className="mx-auto text-center">
          <svg className="animate-spin mx-auto h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="#000" strokeWidth="4"></circle>
            <path className="opacity-75" fill="#000" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Loading</span>
        </div>
      </div>
      <div className="panel-1
      flex items-center sm:items-start md:pt-32 lg:pt-48 w-screen h-screen px-10 relative
      bg-gradient-to-b sm:bg-none from-cyan-50 to-grey-50
      ">
        <div className="w-full h-auto">
          <Image className="intro mb-5" src="https://fakeimg.pl/440x320/CCC/FFF" alt="Hero image" width="440" height="320" priority/>
          <h1 className="intro mb-1 font-mono text-3xl">TaskMinder</h1>
          <p className="intro mb-4">Keep track of you tasks & remiders, locally,  anywhere</p>
          <p className="intro mb-4 lg:hidden" >Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus perferendis obcaecati pariatur molestiae illum voluptate error dolorem.</p>
          <button className="intro flex flex-row p-2 gap-2 items-center bg-yellow-600 rounded-md font-bold">
            Try it out now
            <MdArrowForward size="1.2rem" />
          </button>
        </div>
        <div className="intro absolute bottom-0 left-1/2 h-full w-12">
          <button className="
          border-black border-t-2 border-r-2 border-l-2 rounded-t-xl
          absolute bottom-0 group/scrollDown
          -ms-6 sm:hidden
          ">
            <MdArrowDownward className="m-3 group-hover/scrollDown:mb-1 group-hover/scrollDown:mt-5 transition-all duration-150" size="1.2rem" />
          </button>
        </div>
      </div>
      
      <div className="content panel-2
      flex items-center sm:items-start md:pt-32 lg:pt-48 w-screen h-screen px-5 relative
      bg-gradient-to-t  sm:bg-none from-cyan-50 to-grey-50
      ">
        <div className="w-full h-auto">
          <TaskList title={taskListTitle} data={taskListData} onChange={updateStore}/>
        </div>
      </div>
    </main>
  );
}