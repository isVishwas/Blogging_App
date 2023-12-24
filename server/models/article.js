const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({

    title: {
        type: String,
        trim:true,
        require:true
    },
    content: {
        type: String,
        trim: true,
        require:true
    },
    created_by:{
        type:mongoose.Types.ObjectId,
        ref: "user",
        require:true,
        index:true
    }
},
    { timestamps: true }
);


module.exports = mongoose.model("article", articleSchema);
 