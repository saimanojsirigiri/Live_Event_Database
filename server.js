const express = require("express");
const morgan = require("morgan");
const createError = require("http-errors");
require("dotenv").config();
require("./Helper/start_database");

const app = express();
const liveEventsData = require("./Database/LiveEventsData.Database");
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

const PORT = process.env.PORT || 8080;

app.get("/", async(req,res,next) => {
    res.send("Hello");
});

app.get("/getAllData", async(req,res,next) => {
    try{
        const data = await liveEventsData.find();
        if(data) return res.status(200).json({data: data});
        else return res.status(400).json({message: "No Data"})
    }catch(err){
        return res.status(500).json({message: "Internal Server Error"})
    }
});

app.post("/getUsersData", async(req,res,next) => {
    const{
        event_id,
        user_id,
        level
    } = req.body;

    console.log(req.body);

    try{
        const userData = await liveEventsData.find({event_id, user_id, level});
        if(userData) return res.status(200).json({data: userData});
        else return res.status(400).json({message: "Details not found"});
    }catch(err){
        return res.status(500).json({message: "Internal Server Error"});
    }
});

app.post("/saveData", async(req,res,next) => {
    const{
        event_id,
        user_id,
        question_id,
        user_answer,
        user_answer_status,
        answered_time,
        life_used,
        level,
    } = req.body;

    console.log(req.body);
    try{
        const newLiveData = new liveEventsData({
            event_id,
            user_id,
            question_id,
            user_answer,
            user_answer_status,
            answered_time,
            life_used,
            level,
        });

        console.log(newLiveData);

        const data = await liveEventsData.create(newLiveData);
        console.log(data);
        if(data) return res.status(200).json({message: "Data Saved"});
        else return res.status(400).json({message: "Data not Saved"});

    }catch(err){
        return res.status(500).json({message: "Internal Server Error"})
    }


});

app.use(async(req, res, next) => {
    next(createError.NotFound("Url doesnt exist"));
});

app.use(async(err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: "Incorrect Data",
        },
    });
    console.log(err);
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});