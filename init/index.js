const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");


main()
.then(res => console.log("conneted"))
.catch(err => console.log(err));


async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/HavenStay");
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=> ({...obj, owner: "68935956b8ff5c02846995e5" }))
    await Listing.insertMany(initData.data);
    console.log("data is inserted");
}

initDB();