import mongoose from "mongoose"

export const connectDb = async() => {
    try {
        const dbUrl = process.env.MONGODB_URL
        if(dbUrl) {
            await mongoose.connect(dbUrl, // enabling/disabling autoIndex on development and production 
            { autoIndex: process.env.NODE_ENV === "development" ? true : false })

            console.log("db is connected")
        }
    } catch (error) {
        console.log(error)
    }
}