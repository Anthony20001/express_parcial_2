import mongoose from "mongoose"

const connect = () => {
    // @ts-ignore
    mongoose.connect(process.env.DB_URI)
        .then(() => console.log(`⚡️ [database]: Database is running`))
        .catch(() => console.log(`❌ [database]: Database is not running`))
}

export {connect}