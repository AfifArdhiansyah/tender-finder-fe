'use client'

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import InputText from "@/components/inputs/input-text";
import Button from "@/components/items/buttons/button";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useAuth } from "@/hooks/useAuth";

export default function LoginForm() {
    const nipRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [formData, setFormData] = useState({ nip: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);

    const { login, error, loading } = useAuth();

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, field: string) => {
        if (e.key === "Enter") {
            if (field === "nip" && passwordRef.current) {
                passwordRef.current.focus();
            } else if (field === "password") {
                handleLogin();
            }
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleLogin = async () => {
        await login(formData.nip, formData.password)
    };

    return (
        <div className="flex flex-col w-full h-full justify-between">
            <div className="flex items-end gap-10">
                <Image src={"/logo-bank-bjb.png"} width={100} height={100} alt="logo bank bjb" />
                <h1 className="text-3xl font-bold">Tender Finder</h1>
            </div>
            <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-1">
                    <h2 className="text-2xl font-bold">Login</h2>
                    <p>Masukkan NIP dan password</p>
                </div>
                <div className="flex flex-col gap-4 w-[70%]">
                    <label htmlFor="nip">NIP</label>
                    <InputText
                        name="nip"
                        placeholder="Masukkan NIP"
                        ref={nipRef}
                        value={formData.nip}
                        onChange={handleInputChange}
                        onKeyDown={(e) => handleKeyDown(e, "nip")}
                    />
                    <label htmlFor="password">Password</label>
                    <div className="relative">
                        <InputText
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Masukkan Password"
                            ref={passwordRef}
                            value={formData.password}
                            onChange={handleInputChange}
                            onKeyDown={(e) => handleKeyDown(e, "password")}
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-2 flex items-center text-gray-500"
                            onClick={() => setShowPassword((prev) => !prev)}
                        >
                            {showPassword ? <IoMdEye className="text-gray-500" size={20}/> : <IoMdEyeOff className="text-gray-500" size={20}/> }
                        </button>
                    </div>
                    <Button
                        className="h-[40px]"
                        type={"primary"}
                        size={"medium"}
                        onClick={handleLogin}
                    >
                        Login
                    </Button>
                </div>
            </div>
            <p className="text-sm text-gray-400 text-center">Copyright © 2024 bank bjb</p>
        </div>
    );
}
