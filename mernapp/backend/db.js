const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://myfood:Ajeet12@@cluster0.ajlzsn9.mongodb.net/myfood?retryWrites=true&w=majority';

const connectToMongoDb = async () => {
    await mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, res) => {
        if (err) {
            console.log("some error ocoured", err);
        }
        else {
            console.log("Connected");
            const fetched_data = await mongoose.connection.db.collection("food_items");
            fetched_data.find({}).toArray(function (err, data) {
                if (err) {
                    console.log("some error ocoured", err);
                }
                else {
                    //console.log(data);
                }
            })
        }
    });
}

module.exports = connectToMongoDb;
