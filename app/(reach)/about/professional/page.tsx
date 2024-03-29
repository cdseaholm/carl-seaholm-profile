'use client'

import React, { useState } from 'react';
import useMediaQuery from '@/components/listeners/WidthSettings';
import ProfessionalDesktop from './desktop';
import ProfessionalMobile from './mobile';

export default function Professional() {

  const isBreakpoint = useMediaQuery(768);

  return (
    <main>
      <div className="childFirst min-w-screen min-h-screen my-10 mx-10">
        {!isBreakpoint &&
        <ProfessionalDesktop />
        }
        {isBreakpoint &&
        <ProfessionalMobile />
        }

      </div>
    </main>
  );
}