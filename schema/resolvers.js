import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const resolvers = {
    Query: {
        // USER QUERIES
        user: async(_, args) => {
            const { id } = args;
            const user = await User.findOne({ _id: id })

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
        post: (_, args) => {

        },
        allPosts() {

        }
    },

    Mutation: {
        // USER MUTATIONS
        // REGISTER USER
        register: async(_, args) => {
            const { user: { name, email, password }} = args;
            const salt = bcrypt.genSaltSync(10);
            let hashedPassword;
            // check if theres a password, if so encrypted
            if(password) hashedPassword = bcrypt.hashSync(password, salt)

            if(!name && !email && !hashedPassword) {
                console.log(args)
                return new Error("Please fill in the required fields");
            }

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
        },
        // LOGIN USER
        login: async(_, args) => {
            const { user: { email, password }} = args

            if(!email && !password) {
                throw new Error("Please enter your credentials")
            }
            
            const loggedInUser = await User.findOne({ email })
            const isPasswordTrue = bcrypt.compareSync(password, loggedInUser.password)

            if(loggedInUser && isPasswordTrue) {
                // SIGN A JWT TOKEN WHEN USER LOGIN
                const token = jwt.sign({ user: loggedInUser }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" })
                
                console.log("logged in", token)
                
                return {
                    user: loggedInUser,
                    token
                };
            }

            throw new Error("please enter the correct credentials")

        }, 
        // UPDATE USER
        updateUser: async(_, args) => {
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
        }
    }
}