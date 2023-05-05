

import { adminProcedure, createTRPCRouter, publicProcedure, } from "../trpc";

import {  z } from 'zod'


import  cookie  from "cookie"
import { nanoid } from 'nanoid'
import { SignJWT } from "jose";
import { env } from "process";
import { getJwtSecretKey } from "~/lib/auth";
import { cookies } from "next/dist/client/components/headers";
import { TRPCError } from "@trpc/server";
import { sensitiveHeaders } from "http2";


export const adminRouter = createTRPCRouter({
    Login: publicProcedure
    .input(z.object({ email: z.string(), password: z.string() })) 
    .mutation(async ({ctx,input}) => {
        
    const { res } = ctx
    const { email, password } = input

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD)  {

        const token=await new SignJWT({}).setProtectedHeader({alg:'HS256'}).setJti(nanoid()).setIssuedAt().setExpirationTime('1h').sign(new TextEncoder().encode(getJwtSecretKey()))
    

    res.setHeader('set-cookie',cookie.serialize('user-token',token,{

        httpOnly:true,
        path:'/',
        secure:process.env.NODE_ENV==='production',

    } ) 
    )
    

    return {success:true}
    }
    
    throw new TRPCError({
        code:'UNAUTHORIZED',
        message:'Invalid email or password',
    })
    
    


    }),
    sensitive:adminProcedure.mutation(()=>{
        return 'sensitive'
    })



})