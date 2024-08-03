
import prisma from "@/app/db/db";
import { Session } from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import { Keypair } from "@solana/web3.js";

export interface session extends Session {
user : {
    email : string;
    name : string;
    image : string;
    uid : string
}
}

export const authConfig = {
    providers:[
        GoogleProvider ({
         clientId:process.env.GOOGLE_CLIENT_ID || "",
         clientSecret:process.env.GOOGLE_CLIENT_SECRET || ""
        })
       ],
       callbacks : {
        session : ({session,token}:any) : session => {
        const newSession : session = session as session;
        if(newSession.user && token.uid){
            newSession.user.uid = token.uid || "";
        }
        return newSession;
        },
        async jwt({token,account,profile}:any){
         const user = await prisma.user.findFirst({
            where : {
                sub: account?.providerAccountId || ""
            }
         })

         if(user) {
            token.uid = user.id;
         }
         return token;
        },
         async signIn({ user, account, profile, email, credentials }:any) {
           if(account?.provider === "google"){
           const email = user.email;
           if(!email){
             return false;
           }
           const userDb = await prisma.user.findFirst({
             where:{
               username:email,
             }
           })
     
           if(userDb) {
             return true;
           }
     
           const keyPair = Keypair.generate();
           const publicKey = keyPair.publicKey.toBase58();
           const privateKey = keyPair.secretKey;
     
           await prisma.user.create ({
             data :{
               username : email,
               name:profile?.name,
               //@ts-ignore
               profilePicture:profile?.picture,
               provider:"Google",
               sub: account.providerAccountId,
               solWallet : {
                 create : {
                   publicKey : publicKey,
                   privateKey: privateKey.toString()
                 }
               },
               inrWallet :{
                 create : {
                   balance:0
                 }
               }
             }
           })
           }
           return true
         },
       }
}