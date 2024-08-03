/* eslint-disable @next/next/no-img-element */
"use client"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { Button as PrimaryButton } from "./Button";
import { useEffect, useState } from "react";

export default function ProfileCard ({publicKey}:{
    publicKey : string
}) {
    const session = useSession();
    const router = useRouter();

   if(session.status === "loading"){
    return <div>
        Loading ....
    </div>
   }

   if(!session.data?.user){
    router.push("/");
    return null;
   }

    return <div className="pt-7 flex justify-center">
        <div className="max-w-2xl bg-white rounded shadow w-full p-10">
         <Greeting
          name={session.data?.user?.name || ""} 
          image={session.data?.user?.image || ""}
          />
          <Assets  publicKey={publicKey}/>
        </div>

    </div>
}

function Greeting ({
    image,name
}:{
    image:string, name:string
}) {
    return <div className="flex">

    <img
    src={image} 
    className="rounded-full w-20 h-20" 
    alt="image"/>

    <div className="text-2lg font-bold w-full pt-4 pl-4">
      Welcome back, {name}
    </div>
    </div>
}


function Assets ({publicKey}:{
    publicKey : string
}) {

    const [copied,setCopied] = useState(false);

     useEffect(()=>{
      if(copied) {
        let timeout = setTimeout(()=>{
            setCopied(false);
        },3000);
        return () => {
            clearTimeout(timeout);
        }
      }
     },[copied])

    return <div className="text-slate-400 mt-4">
    Account Assets
    <br />
    <div className="flex justify-between">
        <div>
            
        </div>
        <div>
        <PrimaryButton
          subject={copied?`copied`:`Copy Address` }
          onClick={()=>{
            navigator.clipboard.writeText(publicKey);
           setCopied(true)
          }}/>
          </div>
          </div>
    </div>
}