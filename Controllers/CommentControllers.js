import prisma from "../DB/db.config.js";

export const createComment = async (req, res) => {
    try {
        const { postid, userid, comment } = req.body;
        
        if (!postid || !userid || !comment) {
            return res.status(400).json({
                message: "All fields required (postid, userid, comment)"
            });
        }

        const user = await prisma.user.findUnique({
            where: { id: parseInt(userid) }
        });
        
        if (!user) {
            return res.status(404).json({
                message: "User not found. Please create an account first"
            });
        }

        const post = await prisma.post.findUnique({
            where: { id: parseInt(postid) }
        });
        
        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        const newComment = await prisma.comment.create({
            data: {
                userid: parseInt(userid),
                postid: parseInt(postid),
                comment
            }
        });

        
        await prisma.post.update({
            where: { id: parseInt(postid) },
            data: {
                comment_count: {
                    increment: 1
                }
            }
        });

        return res.status(201).json({
            message: "Comment created successfully",
            comment: newComment
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Unable to create comment",
            details: error.message
        });
    }
}




export const deleteComment = async (req, res) => {
    try {
        const id = req.params.id;
        
        const comment = await prisma.comment.findUnique({
            where: {
                id: id
            }
        });
        
        if (!comment) {
            return res.status(404).json({
                message: "Comment not found"
            });
        }

        // Decrement comment count on the post
        await prisma.post.update({
            where: { id: comment.postid },
            data: {
                comment_count: {
                    decrement: 1
                }
            }
        });

        await prisma.comment.delete({
            where: {
                id: id
            }
        });
        
        return res.status(200).json({
            message: "Comment deleted successfully"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Unable to delete comment",
            details: error.message
        });
    }
}