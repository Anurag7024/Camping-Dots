const mongoose = require('mongoose');
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground')

mongoose.connect('mongodb://0.0.0.0:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async() => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const cprice = Math.floor(Math.random() * 20) + 10;
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            author:'63620d252a28f2dd56543a2d',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            //image: 'https://source.unsplash.com/collections/483251',
            description : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga neque veritatis officiis ipsam alias recusandae, atque illo saepe debitis commodi, vel ea sunt veniam, magni inventore amet esse! Libero, porro!', 
            price: cprice,
            image: [
                {
                  url: 'https://res.cloudinary.com/daz0fxoyd/image/upload/v1670321789/YelpCamp/z86js36cfgnifon8omvv.jpg',
                  filename: 'YelpCamp/z86js36cfgnifon8omvv',
                  
                },
                {
                  url: 'https://res.cloudinary.com/daz0fxoyd/image/upload/v1670321789/YelpCamp/eempieac7hhvewtgazye.jpg',
                  filename: 'YelpCamp/eempieac7hhvewtgazye',
                } 
              ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})