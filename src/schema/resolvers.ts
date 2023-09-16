import { User } from "../models/user.model";
import { Post } from "../models/post.model"

import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { RegisterArgs, LoginArgs, UpdateArgs } from "../types/user.types"
import { UpdatePostArgs, CreatePostArgs } from "../types/post.types";
import { Types } from "mongoose";

export const resolvers = {
    Query: {
        // USER QUERIES
        user: async(_ : any, args: { id: string } ) => {
            const { id } = args;
            const user = await User.findOne({ _id: { $in: [id] } })

            if(user) {
                return user;
            }

            console.log(user)
            return "no user with that ID"
        } ,
        async allUsers() {
           const users = await User.find({ })

           if(users) {
              return users;
           }

           return "no users yet"
        },

        // POST QUERIES
        post: (_: any, args: any) => {

        },

        async allPosts() {
            const posts = await Post.find({});

            if(posts) {
                return posts;
            }

            return "no posts yet"
        }
    },

    Mutation: {
        // USER MUTATIONS
        // REGISTER USER
        register: async(_: any, args: RegisterArgs) => {
            const { user: { name, email, password }} = args;
            const salt = bcrypt.genSaltSync(10);
            let hashedPassword: string;
            // check if theres a password, if so encrypted
            if(name && password && email) {
                hashedPassword = bcrypt.hashSync(password, salt)

                console.log(args.user)

                const newUser = new User({ 
                    name, 
                    email, 
                    password: hashedPassword, 
                    image: "", 
                    bannerImage: "", 
                    resetPasswordToken: "" 
                })
                await newUser.save()

                return args.user;
            }

            return "error"
        },
        // LOGIN USER
        login: async(_: any, args: LoginArgs) => {
            const { user: { email, password }} = args

            if(!email && !password) {
                throw new Error("Please enter your credentials")
            }
            
            if(email) {
                let isPasswordTrue;
                let loggedInUser = await User.findOne({ email })

                if(!(loggedInUser == null)) {
                    isPasswordTrue = bcrypt.compareSync(password, loggedInUser.password)
                }
    
                if(loggedInUser && isPasswordTrue) {
                    // SIGN A JWT TOKEN WHEN USER LOGIN
                    const token = jwt.sign({ user: loggedInUser }, process.env.JWT_SECRET_KEY!, { expiresIn: "1h" })
                    
                    console.log("logged in", token)
                    
                    return {
                        user: loggedInUser,
                        token
                    };
                }
            }


            throw new Error("please enter the correct credentials")

        }, 
        // UPDATE USER
        updateUser: async(_: any, args: UpdateArgs) => {
            const { id, userData: { name, email, password }} = args;
            const salt = bcrypt.genSaltSync(10);
            const filteredUser = await User.findOne({ _id: id }) 
            let hashedPassword;

            if(password) hashedPassword = bcrypt.hashSync(password, salt)

            if(!name || !email || !hashedPassword) {
                console.log(args)
                return new Error("Please fill in the required fields");
            }

            if(filteredUser) {
                await User.findOneAndUpdate({ _id: id }, { 
                    name,
                    email,
                    password: hashedPassword,
                    image: filteredUser.image,
                    bannerImage: filteredUser.bannerImage,
                    resetPasswordToken: ""
                 })

                 return args.userData;
            }

            return "no user with that ID"
        },

        deleteUser: async(_: any, args: { id: Types.ObjectId }) => {
             const { id } = args;
        },

        // POST MUTATIONS
        createPost: async(_: any, args: CreatePostArgs) => {
             const { post: { author, title, description, image } } = args;

             if(author && title && description) {
                  const newPost = new Post({ author, title, description, image })
                  await newPost.save();

                  console.log(args.post)
                  return args.post;
             }

             return "post creation is failed"
        },

        updatePost: async(_: any, args: UpdatePostArgs) => {
             const { id, postData: { author, title, description, image } } = args;
             const post = await Post.findOne({ _id: id })

             if(post) {
                 const updatedPost = await Post.findOneAndUpdate({ _id: id }, { 
                    author: author || post.author,
                    title: title || post.title,
                    description: description || post.description,
                    image: image || post.image
                  })

                  console.log(updatedPost)
                  return updatedPost
             }

        },

        deletePost: async(_: any, args: { id: Types.ObjectId }) => {

        },
    }
}