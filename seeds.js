var mongoose = require ("mongoose");
var TopList = require ("./models/titleTopList");
var List = require ("./models/list");

var data = [
    {
        name: "top 6 movies",
        image: "http://unsplash.com/photos/1PrQ2mHW-Fo/download?force=true",
        description: "Look, just because I don't be givin' no man a foot massage don't make it right for Marsellus to throw Antwone into a glass motherfuckin' house, fuckin' up the way the nigger talks. Motherfucker do that shit to me, he better paralyze my ass, 'cause I'll kill the motherfucker, know what I'm sayin'?",
    },
    {
        name: "top 10 songs",
        image: "http://unsplash.com/photos/MthLYI2WLCs/download?force=true",
        description: "Top 10 best songs in 2015 nice for parties and dancing!"
    },
    {
        name: "top 5 stupid things",
        image: "http://unsplash.com/photos/rzzeLJW8dWc/download?force=true",
        description: "Clearly the worst stupid things that were made."
    }
];

function seedDB() {

    TopList.remove({}, (err) => {
        if(err) {
             console.log(err);
        }
        console.log("removed toplists!");


        data.forEach((seed)=> {
            TopList.create(seed, (err, toplist)=> {
                if (err) {
                    console.log(err);
                } else {
                    console.log("data was successfully seeded to database");

                    List.create(
                        {
                            position: 1,
                            posTitle: "Mastodon",
                            posImage: "/images/iFjg0I.jpg",
                            posDescription: "Look, just because I don't be givin' no man a foot massage don't make it right for Marsellus to throw Antwone into a glass motherfuckin' house, fuckin' up the way the nigger talks. Motherfucker do that shit to me, he better paralyze my ass, 'cause I'll kill the motherfucker, know what I'm sayin'?!",
                            author: "MeatMetalhead"
                        }
                        , (err, list) => {
                        if (err) {
                            return console.log(err);
                        }

                        console.log(toplist);

                        toplist.lists.push(list);



                            console.log("List content" + list);
                            console.log(toplist.lists);
                        console.log("List was added successfully");
                    });

                    List.create(
                        {
                        position: 2,
                        posTitle: "BTBAM",
                        posImage: "/images/2.jpg",
                        posDescription: "Look, just because I don't be givin' no man a foot massage don't make it right for Marsellus to throw Antwone into a glass motherfuckin' house, fuckin' up the way the nigger talks. Motherfucker do that shit to me, he better paralyze my ass, 'cause I'll kill the motherfucker, know what I'm sayin'?",
                        author: "MeatMetalhead"
                    }

                        , (err, list) => {
                        if (err) {
                            return console.log(err);
                        }
                        toplist.lists.push(list);
                        toplist.save();
                            toplist.save();
                            toplist.save();
                            toplist.save();

                        console.log("List content" + list);
                        console.log(toplist.lists);
                        console.log("List was added successfully");
                    });


                }
            });
        });
    });
}



module.exports = seedDB;