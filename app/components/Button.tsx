"use client"

import Image, { StaticImageData } from "next/image";

interface ButtonProps {
    subject: React.ReactNode;
    prefix? : StaticImageData;
    onClick?: () => void;
}

export const Button = ({subject,onClick}:ButtonProps) => {
    return <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={onClick}>
      {subject}
 </button>
}

export const SecondaryButton = ({subject,onClick,prefix}:ButtonProps) => {
    return <button type="button" className="text-white bg-blue-800 hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-7 py-4 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex" onClick={onClick}>
        <div>
        {prefix && (
                <Image src={prefix} alt="icon" className="w-5 h-5 mr-2" />
            )}
        </div>
        <div>
        {subject}
        </div>
 </button>
}


export const TabButton = ({active,children,onClick}:{
    active:boolean;
    children:React.ReactNode;
    onClick: ()=> void
}) => {
    return <button type="button" className = {`text-white  ${active ? "bg-blue-700" : "bg-blue-400"} hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`} onClick={onClick} >{children}</button>
}