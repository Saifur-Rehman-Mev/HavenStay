const express = require("express");
const router = express.Router();

router.get("/", (req,res)=> {
    res.send("this is user")
})

router.get("/:id",(req,res)=> {
    res.send("this is id ");
})

router.post("/",(req,res)=> {
    res("this is post ");
})

router.delete("/:id",(req,res)=> {
    res("this is delete ");
})

module.exports = router;