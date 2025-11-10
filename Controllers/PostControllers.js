import prisma from "../DB/db.config.js";

export const createPost = async (req, res) => {
    try {
        const { title, description, userid } = req.body;
        
        if (!title || !description || !userid) {
            return res.status(400).json({ message: "All fields required" });
        }

        const newPost = await prisma.post.create({
            data: {
                userid: Number(userid),
                title,
                description
            }
        });
        
        return res.status(201).json({
            message: "Post created successfully",
            post: newPost
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Something went wrong. Unable to create post",
            details: error.message
        });
    }
}

export const ShowPost = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await prisma.post.findUnique({
            where: {
                id: Number(postId)
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        });
        
        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }
        
        return res.status(200).json({
            message: "Post fetched successfully",
            post: post
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Something went wrong. Unable to fetch post",
            details: error.message
        });
    }
}

export const FetchAllPost = async (req, res) => {
    try {
        const posts = await prisma.post.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        
        return res.status(200).json({
            message: "Posts fetched successfully",
            count: posts.length,
            posts: posts
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Something went wrong. Unable to fetch all posts",
            details: error.message
        });
    }
}

export const UpdatePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const { title, description } = req.body;
        
        const post = await prisma.post.findUnique({
            where: {
                id: parseInt(postId)
            }
        });
        
        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }
        
        const updatedPost = await prisma.post.update({
            where: {
                id: parseInt(postId)
            },
            data: {
                ...(title && { title }),
                ...(description && { description })
            }
        });
        
        return res.status(200).json({
            message: "Post updated successfully",
            post: updatedPost
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Something went wrong. Unable to update post",
            details: error.message
        });
    }
}

export const deletePost = async (req, res) => {
    try {
        const id = req.params.id;
        
        const post = await prisma.post.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        
        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }
        
        await prisma.post.delete({
            where: {
                id: parseInt(id)
            }
        });
        
        return res.status(200).json({
            message: "Post deleted successfully"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Something went wrong. Unable to delete post",
            details: error.message
        });
    }
}
