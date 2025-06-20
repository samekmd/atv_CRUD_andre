// @types/express/index.d.ts

import { Request } from "express";


declare module 'express'{
    export interface Request{
        user?:{
            user_id:number;
            user_email:string;
            user_admin:boolean;
        };
    }
}