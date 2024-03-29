'use client'

import React, { useEffect, useRef, useState } from 'react';
import useMediaQuery from '@/components/listeners/WidthSettings';
import InnerHeader from '@/components/pagetemplates/innerheader/InnerHeader';
import MainChild from '@/components/pagetemplates/mainchild/mainchild';
import Image from 'next/image';
import { jobsArray, schoolsArray } from '@/components/pagecomponents/professionalComponents/jobsarray';
import { JobBite, SchoolBite } from '@/components/pagecomponents/professionalComponents/proBites';

const openInNewTab = (url: string) => {
  const win = window.open(url, '_blank');
  win?.focus();
};

export default function Professional() {

  const isBreakpoint = useMediaQuery(768);
  const [isHovered, setIsHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState('Timeline');
  const divRef = useRef<HTMLDivElement>(null);
  const imageRef = React.useRef<HTMLDivElement>(null);
  const [filteredSchools, setFilteredSchools] = React.useState(schoolsArray);
  const [filteredJobs, setFilteredJobs] = React.useState(jobsArray);

  /**Variables */

  const categories = [
    'Timeline',
    'Development',
    'Management',
    'Sales',
    'Education'
  ];

  /**Functions */
  const imageClick = () => {
    setIsHovered(!isHovered);
    setClicked(!clicked);
  };

  /**Styles */
  const style = {
    profilepicture: {
      large: `absolute z-20 top-20 left-20 rounded-full overflow-x-hidden transition-all ease duration-200 ${isHovered ? 'cursor-pointer' : ''}`,
      small: `absolute z-20 top-20 left-20 my-3 ml-3 rounded-full overflow-x-hidden transition-all ease duration-200 ${isHovered ? 'cursor-pointer' : ''}`
    },
  };

  /**Effects */
  React.useEffect(() => {
    if (category === 'Timeline') {
      setFilteredJobs(jobsArray.sort((a, b) => (a.date.endDate < b.date.endDate) ? 1 : -1));
    } else if (category === 'Education') {
      setFilteredSchools(schoolsArray.sort((a, b) => (a.date.endDate < b.date.endDate) ? 1 : -1));
    } else {
      setFilteredJobs(jobsArray.sort((a, b) => (a.date.endDate < b.date.endDate) ? 1 : -1).filter(job => job.category.includes(category)));
    }
  }, [category]);

  React.useEffect(() => {
    const handleOutsideClick = (event: { target: any; }) => {
      if (!imageRef.current || !imageRef.current.contains(event.target as HTMLDivElement)) {
        if (!clicked) return;
        imageClick();
      }
    };
    window.addEventListener('mousedown', handleOutsideClick);
    return () => window.removeEventListener('mousedown', handleOutsideClick);
  }, [clicked, imageRef, imageClick]);

  React.useEffect(() => {
    const handleOutsideClick = (event: { target: any; }) => {
      if (!divRef.current || !(divRef.current as HTMLDivElement).contains(event.target as HTMLDivElement)) {
        if (open) {
          setOpen(false);
      }
      }
    };
    window.addEventListener('mousedown', handleOutsideClick);
    return () => window.removeEventListener('mousedown', handleOutsideClick);
  }, [open, divRef, setOpen]);

  return (
    <div>
      <InnerHeader>
        <div />
        <div className={`flex flex-row ${isBreakpoint ? 'justify-between px-1' : 'justify-end'}`}>
          {!isBreakpoint &&
            <div ref={imageRef} className={`${clicked ? style.profilepicture.large : style.profilepicture.small}`}>
                <Image
                onClick={imageClick}
                priority
                src="/images/carlseaholmimage.jpg"
                className={`z-30 rounded-full overflow-x-hidden transition-all ease duration-200 ${isHovered ? 'cursor-pointer' : ''}`}
                height={clicked ? 200 : 70}
                width={clicked ? 200 : 70}
                alt="Carl Seaholm Profile Photo"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                />
            </div>
            }
            <div className='flex flex-col w-100'>
              <h1 className={`flex ${isBreakpoint ? 'text-xl' : 'text-5xl'} font-bold justify-end`}>
                Carl Seaholm
              </h1>
              <div className='flex flex-row justify-evenly items-center'>
                <p className={`${isBreakpoint ? 'text-md' : 'text-base'}`}>
                  Filter:
                </p>
                <div ref={divRef} onClick={open ? () => setOpen(false) : () => setOpen(true)} className='cursor-pointer w-5/12'>
                  <div className={`relative ${isBreakpoint ? 'text-md' : 'text-base'} text-black rounded`}>
                    {category}
                  </div>
                </div>
                <div className='flex items-end'>
                  <svg
                      className="h-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  {open && 
                    <div ref={divRef} className={`absolute flex flex-col z-30 right-22 top-48 mt-2 justify-end text-left border border-gray-300 rounded-sm bg-clip-padding bg-slate-800/70 text-white shadow-lg w-32 cursor-pointer`}>
                      {categories.map((item, index) => (
                        <div key={index} onClick={() => {
                            setCategory(item)
                            setOpen(false)
                          }} className='block px-4 py-2 text-sm text-white hover:bg-slate-800'>
                          {item}
                        </div>
                      ))}
                    </div>
                  }
              </div>
            </div>
        </div>
      </InnerHeader>
      <MainChild>
        {filteredSchools.map((item, index) => (
            <div key={index} className='flex flex-row justify-center'>
              {category === 'Education' &&
                <SchoolBite school={item} index={index}/>
              }
            </div>
          ))}
          {filteredJobs.length > 0 &&
            filteredJobs.map((item, index) => (
              <div key={index} className='flex flex-row justify-center'>
                {category !== 'Education' &&
                  <JobBite job={item} index={index}/>
                }
              </div>
          ))}
      </MainChild>
    </div>
  );
}