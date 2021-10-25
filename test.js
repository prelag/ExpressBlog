const mongoose = require('mongoose');
const BlogPost = require('./models/BlogPost');

mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true, useUnifiedTopology: true});

/*
BlogPost.create({
    title: 'The Mythbuster`s Guide to Pooop Saving Money on Energy Bills',
    body: 'I don`t feel like typing all of that shit right now'
}, (error, blogpost) => {
    console.log(error, blogpost);
    });*/

BlogPost.find({title:/Poo/}, (error, blogpost) => {
    console.log(error, blogpost);
});
