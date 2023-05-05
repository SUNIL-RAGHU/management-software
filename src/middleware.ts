import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "./lib/auth";

export async function middleware(req:NextRequest) {
    const token=req.cookies.get('user-token')?.value

    const verifiedtoken=token &&(await verifyAuth(token).catch((err)=>{
        console.error(err.message)
    }))

    if (req.nextUrl.pathname.startsWith('/Login') && !verifiedtoken) {
        return;
    }

    const url = req.url;

    if(url.includes('/Login')&& verifiedtoken){
        return NextResponse.redirect(new URL('/dashboard',req.url))
    }

    if(!verifiedtoken){
        return NextResponse.redirect(new URL('/Login',req.url))
    }

    return
}

export const config = {
    matcher: ['/dashboard/', '/Login/'],
  }