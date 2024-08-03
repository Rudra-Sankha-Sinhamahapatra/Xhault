"use client"
import { signIn, useSession } from "next-auth/react"
import { SecondaryButton } from "./Button"
import googleImage from '../../public/google.ico'
import { Button as PrimaryButton } from "./Button"

export const Hero = () => {
const session = useSession();

    return <div> 
        <div className="text-5xl font-extrabold ">
     India&apos;s Cryptocurrency <span className="text-blue-600">Revolution</span> 
    </div>

    <div className="flex justify-center pt-5 text-2xl text-slate-600">
        Create a frictionless wallet from India with just a google account.
    </div>
    <div className="flex justify-center text-2xl text-slate-600">
    Convert your INR into Cryptocurrency
    </div>

    <div className="pt-5 flex justify-center">
      {session.data?.user?<PrimaryButton subject="Go to The Dashboard"/>:<SecondaryButton prefix={googleImage} subject="Login With Google" onClick={()=>{
            signIn("google");
         }} />}
    </div>
    </div> 
}