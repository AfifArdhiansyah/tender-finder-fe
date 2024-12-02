import LoginForm from "@/contents/auth/login/login-form"
import LoginTeas from "@/contents/auth/login/login-teas"

export default function Auth(){
    return(
        <div className="flex min-w-screen min-h-screen gap-2 px-12 max-lg:px-8 max-md:px-4">
            <div className="w-full min-h-screen p-10 max-lg:px-8 max-md:p-4">
                <LoginForm/>
            </div>
            <div className="w-full min-h-screen p-10 max-lg:hidden">
                <LoginTeas/>
            </div>
        </div>
    )
}