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
}

export default function Sidebar(props: SidebarProps){

    return(
        <div className="flex flex-col px-6 py-8 items-center gap-6">
            <Image src={"/logo-bank-bjb.png"} width={110} height={200} alt='logo bank bjb' />
            <div className='flex justify-between w-full'>
                <div className='flex gap-4'>
                    <Image src={"/manager.png"} width={50} height={50} className='rounded-full' alt='foto-profile' />
                    <div className='flex flex-col gap-2'>
                        <p className='font-bold'>Claudia</p>
                        <Pill type='general' size='small'>manager</Pill>
                    </div>
                </div>
                <ArrowToggle start='up' direction='y' />
            </div>
            <div className='h-[2px] w-full bg-gray-200'></div>
            <SidebarList>
                {SidebarNavigator.map((content, i)=>(
                    <SidebarListChild key={i} isActive={props.indexNav==i? true : false} onClickChild={props.setIndexList} navIndex={i} iconPath={content.iconPath} label={content.name} ref={content.ref} />
                ))}
            </SidebarList>
        </div>
    )
}