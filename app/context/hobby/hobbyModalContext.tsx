'use client'

import { IHobby } from '@/models/types/hobby';
import React, { createContext, useContext } from 'react';

type ContextType = {
    openAddModal: boolean;
    setOpenAddModal: React.Dispatch<React.SetStateAction<boolean>>;
    filterItem: string;
    setFilterItem: React.Dispatch<React.SetStateAction<string>>;
    categoryPassed: string;
    setCategoryPassed: React.Dispatch<React.SetStateAction<string>>;
    openCategoryModal: boolean;
    setOpenCategoryModal: React.Dispatch<React.SetStateAction<boolean>>;
    openLogSessionModal: boolean;
    setOpenLogSessionModal: React.Dispatch<React.SetStateAction<boolean>>;
    setDaySelected: React.Dispatch<React.SetStateAction<string>>;
    daySelected: string;
    setHobbies: React.Dispatch<React.SetStateAction<IHobby[]>>;
    hobbies: IHobby[];
    refreshKey: number;
    setRefreshKey: React.Dispatch<React.SetStateAction<number>>;
};

//wrap these into one function maybe

const initialContext: ContextType = {
    openAddModal: false,
    setOpenAddModal: () => {},
    filterItem: '',
    setFilterItem: () => {},
    categoryPassed: '',
    setCategoryPassed: () => {},
    openCategoryModal: false,
    setOpenCategoryModal: () => {},
    openLogSessionModal: false,
    setOpenLogSessionModal: () => {},
    setDaySelected: () => {},
    daySelected: '',
    setHobbies: () => {},
    hobbies: [] as IHobby[],
    refreshKey: 0,
    setRefreshKey: () => {},
};

const HobbyContext = createContext<ContextType>(initialContext);

export const useHobbyContext = () => useContext(HobbyContext);

export const HobbyProvider = ({ children, openAddModal, setOpenAddModal, filterItem, setFilterItem, categoryPassed, setCategoryPassed, openCategoryModal, setOpenCategoryModal, openLogSessionModal, setOpenLogSessionModal, setDaySelected, daySelected, setHobbies, hobbies, refreshKey, setRefreshKey }: React.PropsWithChildren<{ openAddModal: boolean, setOpenAddModal: React.Dispatch<React.SetStateAction<boolean>>, filterItem: string; setFilterItem: React.Dispatch<React.SetStateAction<string>>, categoryPassed: string, setCategoryPassed: React.Dispatch<React.SetStateAction<string>>, openCategoryModal: boolean, setOpenCategoryModal: React.Dispatch<React.SetStateAction<boolean>>, openLogSessionModal: boolean, setOpenLogSessionModal: React.Dispatch<React.SetStateAction<boolean>>, setDaySelected: React.Dispatch<React.SetStateAction<string>>, daySelected: string, setHobbies: React.Dispatch<React.SetStateAction<IHobby[]>>, hobbies: IHobby[], setRefreshKey: React.Dispatch<React.SetStateAction<number>>, refreshKey: number }>) => {
    
    const value = { openAddModal, setOpenAddModal, filterItem, setFilterItem, categoryPassed, setCategoryPassed, openCategoryModal, setOpenCategoryModal, openLogSessionModal, setOpenLogSessionModal, setDaySelected, daySelected, setHobbies, hobbies, refreshKey, setRefreshKey };

    return <HobbyContext.Provider value={value}>{children}</HobbyContext.Provider>;
};