const mongoose = require("mongoose");
const mongoosastic = require('mongoosastic');

const instituteSchema = mongoose.Schema({
    aicte_id : {
        type : String,
        required : true,
        trim : true,
    },
    ranking_category : {
        type : String,
        enum : ["Dental", "Overall", "University", "Medical", "Management", "Research", "Agriculture and Allied Sectors", "Pharmacy", "Law", "Innovation", "Architecture", "College"],
        required : true
    },
    institute_name : {
        type : String,
        required : true,
        trim : true
    },
    city : {
        type : String,
        required : true,
        trim : true
    },
    state : {
        type : String,
        enum : ["Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli", "Daman and Diu", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"],
        required : true
    },
    score : {
        type : Number,
    },
    rank : {
        type : Number
    },
    visited : {
        type : Number
    },
    institution_type : {
        type : String,
        enum : ["Government", "Govt aided", "Private-Self Financing", "State Government", "State Private University", "State Government University", "Deemed to be University(Pvt)"],
        required : true
    }
})
instituteSchema.plugin(mongoosastic, {
    hosts: [
        'anotherhost:5601'
    ]
})

const Institute = mongoose.model("Institute", instituteSchema);

module.exports = Institute;

// const stream = Institute.synchronize();

// let count = 0;

// stream.on('data', function () {
//   count++;
// });

// stream.on('close', function () {
//   console.log('Indexed ' + count + ' documents!');
//   mongoose.connection.close(); // Close the MongoDB connection after syncing
// });

// stream.on('error', function (err) {
//   console.log(err);
// });