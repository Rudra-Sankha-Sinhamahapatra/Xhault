"use server"
import { getServerSession } from "next-auth";
import ProfileCard from "../components/ProfileCard";
import prisma from "../db/db";
import { authConfig } from "../lib/auth";

async function getUserWallet () {
    const session = await getServerSession(authConfig);

 const userWallet = await prisma.solWallet.findFirst({
    where:{
        userId: session?.user?.uid,
    },
    select : {
        publicKey : true
    }
  })

  
if(!userWallet){
    return {
        error:"No solana wallet found"
    }
}

return {error:null,userWallet};
}


export default async function Page () {
    const userWallet = await getUserWallet();

    if(userWallet.error || !userWallet.userWallet?.publicKey) {
        return <div>
            No solana wallet found
        </div>
    }

return <div>
<ProfileCard publicKey={userWallet.userWallet?.publicKey}/>
</div> 
}

