const mongoose = require('mongoose');
const dotenv = require("dotenv").config();
const mongoURI = process.env.mongoURI;

const connectToMongoDb = async () => {
    await mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, res) => {
        if (err) {
            console.log("some error ocoured", err);
        }
        else {
            console.log("Connected");
            const fetched_data = await mongoose.connection.db.collection("food_items");
            fetched_data.find({}).toArray(async function (err, data) {
                const foodCategory = await mongoose.connection.db.collection("foodCategory");
                foodCategory.find({}).toArray(function (err, categoryData) {
                    if (err) {
                        console.log("some error ocoured", err);
                    }
                    else {

                        global.food_items = data;
                        global.foodCategory = categoryData;

                    }
                })
            })
        }
    });
}

module.exports = connectToMongoDb;
