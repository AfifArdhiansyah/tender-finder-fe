import React from 'react';
import Image from 'next/image'
import Pill from '../items/pill'
import ArrowToggle from '../toggles/arrow-toggle'
import SidebarList from './sidebar-list';
import SidebarListChild from './sidebar-list-child';
import { SidebarNavigator } from '@/constants/navigator';

interface SidebarProps{
    indexNav: number,
    setIndexList: Function
    isSidebarOpen: boolean
}

export default function Sidebar(props: SidebarProps) {
    return (
        <div className="relative h-full">
            {/* Sidebar */}
            <div className={`z-20 fixed top-0 left-0 w-64 h-full bg-white shadow-lg transition-transform transform ${props.isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:w-[100px] md:relative md:translate-x-0 lg:w-64`}>
                <div className="flex flex-col px-10 py-8 items-center gap-6 md:px-3 lg:px-10">
                    <Image src={"/logo-bank-bjb.png"} width={110} height={200} className='md:w-[70px] lg:w-[110px]' alt='logo bank bjb' />
                    <div className='flex justify-between w-full'>
                        <div className='flex gap-4 md:flex-col md:items-center lg:flex-row lg:items-start'>
                            <Image src={"/manager.png"} width={50} height={50} className='rounded-full' alt='foto-profile' />
                            <div className='flex flex-col gap-2 md:items-center lg:items:start'>
                                <p className='font-bold'>Claudia</p>
                                <Pill type='general' size='small'>manager</Pill>
                            </div>
                        </div>
                        <ArrowToggle className='md:hidden lg:block' start='up' direction='y' />
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
