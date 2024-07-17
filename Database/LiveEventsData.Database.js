const mongoose = require("mongoose");
const schema = mongoose.Schema;

const liveEventsData = new schema({
    event_id: {
        type: String,
    },
    user_id:{
        type: String,
    },
    // question_id:{
    //     type: Array,
    //     default: [],
    // },
    // user_answer_status: {
    //     type: Array,
    //     default: [],
    // },
    // answered_time:{
    //     type: Array,
    //     default: [],
    // }
    question_id:{
        type: String,
    },
    user_answer:{
        type: String,
    },
    user_answer_status: {
        type: String,
    },
    answered_time:{
        type: String,
    }, 
    lifeUsed:{
        type: String,
    },
    level:{
        type: String,
    },
}, {strict: false});

const LiveEventData = mongoose.model("liveEventData", liveEventsData);
module.exports = LiveEventData;