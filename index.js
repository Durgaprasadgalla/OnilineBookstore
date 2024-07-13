const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const collection = require("./config");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Serve login page
app.get("/", (req, res) => {
    
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Serve signup page
app.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

// Handle signup form submission
app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.username,
        password: req.body.password
    };

    const existingUser = await collection.findOne({ name: data.name });
    if (existingUser) {
        res.send("User already exists, choose a different username");
    } else {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);
        data.password = hashedPassword;
        await collection.insertMany([data]); // Insert data as an array of objects
        res.redirect("/"); // Redirect to login page after successful signup
    }
});

// Handle login form submission
app.post("/login", async (req, res) => {
    try {
        const user = await collection.findOne({ name: req.body.username });
        if (!user) {
            return res.send("Username not found");
        }

        const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
        if (isPasswordMatch) {
            res.sendFile(path.join(__dirname, 'public', 'main.html'));
        } else {
            res.send("Wrong password");
        }
    } catch (error) {
        res.send("Error during login process");
    }
});

const port = 4040;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});





