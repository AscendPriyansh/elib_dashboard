import express from "express";

const app = express();

// routes
app.get("/", (req, res) => {
    return res.json({ message: "Welcome bro." });
});


export default app;

