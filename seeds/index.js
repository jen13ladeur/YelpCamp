const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedhelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database Connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6125294252da711d5c271e3a',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum necessitatibus sapiente facilis cupiditate incidunt beatae in, culpa quos voluptas, quas unde quibusdam quisquam! Quidem cumque perspiciatis eos architecto ipsa quis. Ad vel excepturi porro nihil quibusdam, facere dolores autem illum rem nemo, id quae? Dolor necessitatibus sequi quis obcaecati minus quae, numquam earum facere, fugit explicabo itaque maiores enim quisquam?',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dchcgzyc4/image/upload/v1633615986/YelpCamp/zsbtndwu6h44ecbezeyq.jpg',
                    filename: 'YelpCamp/zsbtndwu6h44ecbezeyq'
                }
            ],
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})