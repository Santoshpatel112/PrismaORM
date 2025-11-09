import Prisma from '../DB/db.config.js';
import prisma from '../DB/db.config.js';

export const createUser = async (req, res) => {
    try {
        const { email, name, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ error: "Email and Password are required" });
        }
        
        const existingUser = await prisma.user.findUnique({
            where: { email: email }
        });
        
        if (existingUser) {
            return res.status(400).json({ error: "Email already taken! Please use another one" });
        }
        
        const newUser = await prisma.user.create({
            data: {
                email,
                name,
                password
            }
        });
        
        return res.status(201).json(newUser);
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
}

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { email, name, password } = req.body;
        
        const user = await prisma.user.findUnique({
            where: { id: parseInt(id) }
        });
        
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        
        const updatedUser = await prisma.user.update({
            where: { id: parseInt(id) },
            data: {
                ...(email && { email }),
                ...(name && { name }),
                ...(password && { password })
            }
        });
        
        return res.status(200).json({
            message: "User updated successfully",
            user: updatedUser
        });
    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
}



export const findAllUser=async (req,res)=>{
    try {
        const findUser=await Prisma.User.findMany();
        return res.status(201).json({
            message :"User fetch sucessfully",
            User:findUser
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message:"error in fetch all user "
        });
    }
}