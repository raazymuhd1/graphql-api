import mongoose from "mongoose"

export const connectDb = async() => {
    try {
        const dbUrl = process.env.MONGODB_URL
        if(dbUrl) {
            await mongoose.connect(dbUrl)

            console.log("db is connected")
        }
    } catch (error) {
        console.log(error)
    }
}