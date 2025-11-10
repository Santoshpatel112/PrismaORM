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


export const ShowPost=async (req,res)=>{
    try {
        const postId=req.params.id;
        const post=await Prisma.post.findFirst({
            where :{
                PostId :Number(postId)
            }
        })
        return res.status(201).json({
            message :"Post fetch Sucessfully",
            Post :post
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
          message: "Somthing error occerd Unble to Seen Post",
        })   
    }
}


export const FetchAllPost =async (req ,res)=>{
    try {
      const postId = req.params.id;
      const post = await Prisma.post.findMany({
        where: {
          postId: Number(postId),
        },
      });
      return res.status(201).json({
        message: "Post fetch Sucessfully",
        Post: post,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Somthing error occerd Unble to Fetch All Post",
      });
    }
}

export const UpdatePost=async (req,res)=>{
    try {
        const postId=req.params.id;
        const {title,decription}=req.body();
        const post= await Prisma.post.findUnique({
            where:{
                id :parseInt(postId)
            }
        })
        if(!post){
            return res.status(400).json({
                message :"Post Not Found"
            })
        }
        const updatedPost= await Prisma.post.update({
            where:{
                id:parent(postId)
            },
            data :{
                title,
                decription
            }
        })
        return res.status(201).json({
            message :"Post updated Sucessfully",
            Post :updatedPost
        })
    } catch (error) {
         console.error(error);
         return res.status(500).json({
           message: "Somthing error occerd Unble to Update Post",
         });
    }
}



export const deletePost= async (req,res)=>{
    try {
        const id=req.params.id;
        const post=await Prisma.post.findUnique({
            where :{
                id:parseInt(id)
            }
        })
        if(!post){
            return res.status(400).json({
                message :"Post not fount"
            })
        }
        const deletedPost =await Prisma.post.delete({
            where:{
                id:parent(id)
            }
        })
        return res.status(201).json({
            message :"Post deleted Sucessfully",
            Post :deletePost
        })
    } catch (error) {
         console.error(error);
         return res.status(500).json({
           message: "Somthing error occerd Unble to Update Post",
         });
    }
}