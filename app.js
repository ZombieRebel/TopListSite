/**
 * Created by HAL3000 on 02-01-17.
 */



const express = require("express");
var hbs = require('hbs');
var bodyParser = require("body-parser");
var {ObjectID} = require('mongodb');
const mongoose = require("mongoose");

const TopList = require("./models/titleTopList");
const List = require("./models/list");
var seedDB = require("./seeds");
var path    = require("path");


mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost/toplist_db");
var app = express();



hbs.registerPartials(__dirname + "/views/partials");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));



app.set('view engine', 'hbs');

seedDB();


app.get("/test", (req, res) => {
    res.sendFile(path.join(__dirname+'/test.html'));
});

// --------------------------
//        ROOT ROUTE
// --------------------------

app.get("/", (req, res) => {
    res.render("home.hbs", {
        pageTitle: "HomePage",
        currentYear: new Date().getFullYear()
        });
});


// ---------------------------------
//        LANDING PAGE ROUTE
// ---------------------------------

app.get("/landing", (req, res) => {
    res.render("landing.hbs", {
        pageTitle: "Landing Page",
        currentYear: new Date().getFullYear()
    });

});


// ---------------------------------
//        SHOW ALL LISTS ROUTE
// ---------------------------------

app.get("/lists", (req, res) => {

    TopList.find({}, (err, allToplists) => {
        if(err) {
            console.log(err);
        } else {
            res.render("index.hbs",{
                topLists: allToplists,
                pageTitle: "All top lists",
                currentYear: new Date().getFullYear(),
                });
        }
    });




});


// ---------------------------------
//        POST LISTS ROUTE
// ---------------------------------


app.post("/lists", (req, res) => {
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;

    var newList = {name: name, image: image, description: description};


    TopList.create(newList, (err, newToplist)=> {
            if(err) {
                return console.log(err);
            }
                console.log("NEWLY CREATED TOPLIST");
                console.log(newToplist);

        }
    );


    res.redirect("/lists");
});



// -------------------------------------------------
//        CREATE A NEW TOPLIST ROUTE
// -------------------------------------------------

app.get("/lists/new", (req,res) => {
    res.render("new.hbs");
});

// -------------------------------------------------
//        SHOW DETAILED INFO ABOUT TOPLIST ROUTE
// -------------------------------------------------

app.get("/lists/:id", (req, res) => {
    TopList.findById(req.params.id).populate("lists").then((foundToplist) => {
        if (!foundToplist) {
            return res.status(404).send();
        }
        console.log(foundToplist);
        //render show template with that campground
        res.render("show.hbs", {
            topList: foundToplist,
        });

    }).catch((e)=> {
        console.log(e);
    });
});

// -------------------------------------------------
//        DELETE POST ROUTE
// -------------------------------------------------

app.delete("/lists/:id", (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    TopList.findByIdAndDelete(id).then((toplist) => {
        if (!toplist) {
            return res.status(404).send();
        }

        res.redirect("/lists");
    }).catch ((e) => {
        res.status(400).send();
    });
});

app.listen(3000, ()=> {
    console.log("Server is running");
});

