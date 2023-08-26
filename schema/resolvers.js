import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const resolvers = {
    Query: {
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
        post: (_, args) => {

        },
        allPosts() {

        }
    },

    Mutation: {
        register: async(_, args) => {
            const { user: { name, email, password }} = args;
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(password, salt)

            if(!name && !email && !hashedPassword) {
                console.log(args)
                throw new Error("Please fill in the required fields");
            }

            const newUser = new User({ name, email, password: hashedPassword })
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

        }
    }
}