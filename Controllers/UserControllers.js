import User from '../prisma/schema.prisma'
import Prisma from '../DB/db.config.js';
import bcrypt from 'bcryptjs';
export const createUser= async (req,res)=>{
    try {
        const {email,name,password}=req.body;
        if(!email || !password){
            return res.json({error:"Email and Password are required"},{status:400});
        }
        const exitinguser=await Prisma.user.findunique({
            where:{email : email}
        });
        if(exitinguser){
            return res.json({error:"Email Alredy taken  ! please use anather one "},{status:400});
        }
        const newUser=await User.create({
            data:{
                email,
                name,
                password
            }
        });
        return res.json(newUser);
    } catch (error) {
        console.error("Error creating user:", error);
        return res.json({error:"Internal Server Error"},{status:500});
    }
}