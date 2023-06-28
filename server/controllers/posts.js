import Post from "../models/Post.js";
import User from "../models/User.js"

// CREATE
export const createPost = async (req, res) => {
    try{

        const {userId, description, picturePath }  = req.body;
        const user = await User.findById(userId)
        const newPost = new Post ({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: []
        })
        console.log(newPost)
        await newPost.save();

        const post = await Post.find();
        res.status(201).json(post);
    } catch (error){
        res.status(401).json({ message: error.message })
    }
}

// READ 
export const getFeedPosts = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        const friendsId = user.friends;
        const post = await Post.find({ userId: { $in: friendsId } });
        res.status(200).json(post);
        } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const getUserPosts = async (req, res) => {
try{
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
} catch (error) {
    res.status(404).json({ message: error.message })
}
}

// UPDATE 
export const likePost = async (req, res) => {
    try{
        const { id } = req.params;
        const { userId } = req.body; 
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);

        if(isLiked){
            post.likes.delete(userId);
        } else {
            post.likes.set(userId, true);
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id, 
            { likes: post.likes },
            { new: true }
        );

        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

// commentaires 

export const createComment = async (req, res) => {
    const { userId, firstName, lastName, content, postId, picturePath
    } = req.body;
    console.log(req)
    try {
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      
      const newComment = {
        userId,
        firstName,
        lastName,
        content,
        picturePath
      };
      post.comments.push(newComment);
      
      const updatedPost = await post.save();
      
      res.status(201).json(updatedPost);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong", error });
    }
  };


export const updateComment = async (req, res) => {
    const { postId, commentId } = req.params;
    const { content } = req.body;
    
    try {
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      
      const comment = post.comments.id(commentId);
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }
      
      comment.content = content;
      const updatedPost = await post.save();
      
      res.status(200).json(updatedPost);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong", error });
    }
  };
  
  export const deleteComment = async (req, res) => {
    const { postId, commentId } = req.params;
    
    try {
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      
      const comment = post.comments.id(commentId);
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }
      
      comment.remove();
      const updatedPost = await post.save();
      
      res.status(200).json(updatedPost);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong", error });
    }
  };

export const getPostComments = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId);
    console.log(post);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post.comments);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};