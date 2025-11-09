import prisma from '../DB/db.config.js';

export const createUser = async (req, res) => {
    try {
        console.log('Content-Type:', req.headers['content-type']);
        console.log('Body:', req.body);
        
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