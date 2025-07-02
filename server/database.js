// import mongoose from "mongoose";

// export async function connectDB() {
//     try {
//         mongoose.connect(process.env.MONGO_DB)
//         const connection = mongoose.connection
//         connection.on('connected', () => {
//             console.log('MongoDB Connected')
//         })
//         connection.on('error', (err) => {
//             console.log('MongoDB connection error, please check your DB: ' + err)
//             process.exit()
//         })
        
//     } catch (error) {
//         console.log('Error in Connecting DB')
//         console.log(error)
//     }

// }
import mongoose from "mongoose";

export async function connectDB() {
    try {
        mongoose.set('strictQuery', true); // Suppress strictQuery warning

        // Wait for connection
        await mongoose.connect(process.env.MONGO_DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('MongoDB Connected'); // Log connection success

        const connection = mongoose.connection;

        connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
            process.exit(1);
        });

    } catch (error) {
        console.error('Error in Connecting DB:', error);
    }
}
