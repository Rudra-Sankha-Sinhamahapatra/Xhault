import { NextRequest, NextResponse } from "next/server";


export function GET (req:NextRequest,res:NextResponse) {
const {searchParams} = new URL(req.url);
const searchQuery = searchParams.get("address");
//ata => associated token account
//pda => program derived address

}