require('dotenv').config(); // Load environment variables from .env file

const mongoose = require('mongoose');

// Get the MongoDB URI from environment variables
const mongoURI = process.env.MONGODB_URI;

// Set the strictQuery option to prepare for Mongoose 7
mongoose.set('strictQuery', true); // or false

// Connect to MongoDB
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
})
.then(() => {
    console.log("Database connected");
})
.catch((err) => {
    console.error("Database connection error:", err);
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error(`Mongoose connection error: ${err.message}`);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected from MongoDB');
});

// Define Login Schema
const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Create Model based on Schema
const UserModel = mongoose.model("users", LoginSchema);

module.exports = UserModel;
