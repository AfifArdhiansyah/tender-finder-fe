'use client'

import { IoIosArrowDown, IoIosArrowUp, IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { useState } from "react";

interface ArrowToggleProps{
    direction: "x" | "y",
    start: "up" | "down" | "right" | "left",
    className?: string
}


export default function ArrowToggle(arrowToggleProps: ArrowToggleProps){
    const [isClicked, setClick] = useState(false)
    function onClickToggle(){
        setClick(isClicked? false : true)
    }
    switch(arrowToggleProps.direction){
        case "y":
            switch(arrowToggleProps.start){
                case "up":
                    return <button className={arrowToggleProps.className} onClick={onClickToggle}>
                        {isClicked ? <IoIosArrowDown /> : <IoIosArrowUp />}
                    </button>
                case "down":
                    return <button className={arrowToggleProps.className} onClick={onClickToggle}>
                        {isClicked ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </button>
            }
        case "x":
            switch(arrowToggleProps.start){
                case "right":
                    return <button className={arrowToggleProps.className} onClick={onClickToggle}>
                        {isClicked ? <IoIosArrowBack /> : <IoIosArrowForward />}
                    </button>
                case "left":
                    return <button className={arrowToggleProps.className} onClick={onClickToggle}>
                        {isClicked ? <IoIosArrowForward /> : <IoIosArrowBack />}
                    </button>
            }
    }
}