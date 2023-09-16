"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const user_model_1 = require("../models/user.model");
const post_model_1 = require("../models/post.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.resolvers = {
    Query: {
        // USER QUERIES
        user: async (_, args) => {
            const { id } = args;
            const user = await user_model_1.User.findOne({ _id: { $in: [id] } });
            if (user) {
                return user;
            }
            console.log(user);
            return "no user with that ID";
        },
        async allUsers() {
            const users = await user_model_1.User.find({});
            if (users) {
                return users;
            }
            return "no users yet";
        },
        // POST QUERIES
        post: (_, args) => {
        },
        async allPosts() {
            const posts = await post_model_1.Post.find({});
            if (posts) {
                return posts;
            }
            return "no posts yet";
        }
    },
    Mutation: {
        // USER MUTATIONS
        // REGISTER USER
        register: async (_, args) => {
            const { user: { name, email, password } } = args;
            const salt = bcryptjs_1.default.genSaltSync(10);
            let hashedPassword;
            // check if theres a password, if so encrypted
            if (name && password && email) {
                hashedPassword = bcryptjs_1.default.hashSync(password, salt);
                console.log(args.user);
                const newUser = new user_model_1.User({
                    name,
                    email,
                    password: hashedPassword,
                    image: "",
                    bannerImage: "",
                    resetPasswordToken: ""
                });
                await newUser.save();
                return args.user;
            }
            return "error";
        },
        // LOGIN USER
        login: async (_, args) => {
            const { user: { email, password } } = args;
            if (!email && !password) {
                throw new Error("Please enter your credentials");
            }
            if (email) {
                let isPasswordTrue;
                let loggedInUser = await user_model_1.User.findOne({ email });
                if (!(loggedInUser == null)) {
                    isPasswordTrue = bcryptjs_1.default.compareSync(password, loggedInUser.password);
                }
                if (loggedInUser && isPasswordTrue) {
                    // SIGN A JWT TOKEN WHEN USER LOGIN
                    const token = jsonwebtoken_1.default.sign({ user: loggedInUser }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
                    console.log("logged in", token);
                    return {
                        user: loggedInUser,
                        token
                    };
                }
            }
            throw new Error("please enter the correct credentials");
        },
        // UPDATE USER
        updateUser: async (_, args) => {
            const { id, userData: { name, email, password } } = args;
            const salt = bcryptjs_1.default.genSaltSync(10);
            const filteredUser = await user_model_1.User.findOne({ _id: id });
            let hashedPassword;
            if (password)
                hashedPassword = bcryptjs_1.default.hashSync(password, salt);
            if (!name || !email || !hashedPassword) {
                console.log(args);
                return new Error("Please fill in the required fields");
            }
            if (filteredUser) {
                await user_model_1.User.findOneAndUpdate({ _id: id }, {
                    name,
                    email,
                    password: hashedPassword,
                    image: filteredUser.image,
                    bannerImage: filteredUser.bannerImage,
                    resetPasswordToken: ""
                });
                return args.userData;
            }
            return "no user with that ID";
        },
        deleteUser: async (_, args) => {
            const { id } = args;
        },
        // POST MUTATIONS
        createPost: async (_, args) => {
            const { post: { author, title, description, image } } = args;
            if (author && title && description) {
                const newPost = new post_model_1.Post({ author, title, description, image });
                await newPost.save();
                console.log(args.post);
                return args.post;
            }
            return "post creation is failed";
        },
        updatePost: async (_, args) => {
            const { id, postData: { author, title, description, image } } = args;
            const post = await post_model_1.Post.findOne({ _id: id });
            if (post) {
                const updatedPost = await post_model_1.Post.findOneAndUpdate({ _id: id }, {
                    author: author || post.author,
                    title: title || post.title,
                    description: description || post.description,
                    image: image || post.image
                });
                console.log(updatedPost);
                return updatedPost;
            }
        },
        deletePost: async (_, args) => {
        },
    }
};
