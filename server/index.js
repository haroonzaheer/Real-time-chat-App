
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) =>{
    res.send("Well come Our Chat App API..");
});


const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

app.listen(port, () => {
    console.log(`Server is running on: ${port}`);
});

mongoose.connect(uri, {
    //useNewUrlParser: true, // deprecated but harmless for now
    //useUnifiedTopology: true, // deprecated but harmless for now
    auth: {
        username: username,
        password: password
    }
})
.then(() => console.log("MongoDB connection established"))
.catch((error) => console.error("MongoDB connection failed:", error.message));
