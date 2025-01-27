'use client'

import CircularProgress from '@mui/material/CircularProgress';

export default function Loading(){
    return(
        <div className="w-full h-full flex flex-col items-center justify-center gap-4">
            <CircularProgress/>
            <p>Loading...</p>
        </div>
    )
}