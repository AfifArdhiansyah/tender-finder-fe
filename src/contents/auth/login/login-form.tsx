'use client'

import Image from "next/image"
import InputText from "@/components/inputs/input-text"
import Button from "@/components/items/buttons/button"

export default function LoginForm(){
    return(
        <div className="flex flex-col w-full h-full justify-between">
            <div className="flex items-end gap-10">
                <Image src={"/logo-bank-bjb.png"} width={100} height={100} alt="logo bank bjb"/>
                <h1 className="text-3xl font-bold">Tender Finder</h1>
            </div>
            <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-1">
                    <h2 className="text-2xl font-bold">Login</h2>
                    <p>Masukkan User Id dan password</p>
                </div>
                <div className="flex flex-col gap-4 w-[70%]">
                    <label htmlFor="id">User ID</label>
                    <InputText placeholder="Masukkan User ID"/>
                    <label htmlFor="password">Password</label>
                    <InputText placeholder="Masukkan Password"/>
                    <Button className="h-[40px]" type={"primary"} size={"medium"} onClick={()=>{}}>Login</Button>
                </div>
            </div>
            <p className="text-sm text-gray-400 text-center">Copyright © 2024 bank bjb</p>
        </div>
    )
}