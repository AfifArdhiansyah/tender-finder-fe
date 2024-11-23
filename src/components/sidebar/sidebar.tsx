import React from 'react';
import Image from 'next/image'
import Pill from '../items/pill'
import SidebarList from './sidebar-list';
import SidebarListChild from './sidebar-list-child';
import { SidebarNavigator } from '@/constants/navigator';
import { IoClose } from "react-icons/io5";

interface SidebarProps{
    indexNav: number,
    setIndexList: Function
    isSidebarOpen: boolean
    setSidebarOpen: Function
}

export default function Sidebar(props: SidebarProps) {
    return (
        <div className="relative h-full max-md:z-[100] ">
            {/* Sidebar */}
            <div className={`fixed top-0 left-0 w-64 h-full bg-white max-md:shadow-lg transition-transform transform ${props.isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:w-[100px] md:relative md:translate-x-0 lg:w-64`}>
                <div className="flex flex-col px-10 py-8 items-center gap-6 md:px-3 lg:px-10">
                    <div className='flex items-end justify-center gap-8'>
                        <Image src={"/logo-bank-bjb.png"} width={110} height={200} className='md:w-[60px] lg:w-[110px]' alt='logo bank bjb' />
                        <button className='md:hidden' onClick={() => props.setSidebarOpen(false)}>
                            <IoClose className='text-2xl' size={30}/>
                        </button>
                    </div>
                    <div className='flex gap-4 md:flex-col md:items-center lg:flex-row lg:items-start'>
                        <Image src={"/manager.png"} width={50} height={50} className='rounded-full' alt='foto-profile' />
                        <div className='flex flex-col gap-2 md:items-center lg:items:start'>
                            <p className='font-bold'>Claudia</p>
                            <Pill type='general' size='small'>manager</Pill>
                        </div>
                    </div>
                    <div className='h-[2px] w-full bg-gray-200'></div>
                    <SidebarList>
                        {SidebarNavigator.map((content, i) => (
                            <SidebarListChild
                                key={i}
                                isActive={props.indexNav === i}
                                onClickChild={props.setIndexList}
                                navIndex={i}
                                iconPath={content.iconPath}
                                label={content.name}
                                ref={content.ref}
                            />
                        ))}
                    </SidebarList>
                </div>
            </div>
        </div>
    );
}
