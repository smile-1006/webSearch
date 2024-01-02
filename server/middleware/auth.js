const express = require('express');
const app = express();

app.use(express.json());

const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");


exports.auth = async(req, res, next) => {
    try{
        
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer", "");

        if(!token){
            return res.status(401).json({
                success : false,
                message : `Token is missing`
            });
        }

        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        }   
        catch(error){
            return res.status(401).json({
                success : false,
                message : `Token is invalid`
            });
        }
        next();
    }
    catch(error){
        return res.status(401).json({
            success : false,
            message : `Something went wrong while valadating the token`
        });
    }
} 


exports.isStudent = async(req, res, next) => {
    try{
            if(req.user.accountType !== "Student"){
                return res.status(401).json({
                    success : false,
                    message : "This is protected route for Students only"
                })
            }
            next();
    }
    catch(error){
        return res.status(500).json({
            success : false,
            message : "User role cannot be verified, please try again"
        });
    }
}


exports.isFaculty = async(req, res, next) => {
    try{
        if(req.user.accountType !== "Faculty"){
            return res.status(401).json({
                success : false,
                message : "This is protected route for Faculties only"
            })
        }
        next();
    }   
    catch(error){
        return res.status(500).json({
            success : false,
            message : "User role cannot be verified, please try again"
        })
    }
}


exports.isAdmin = async(req, res, next) => {
    try{
        if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                success : false,
                message : "This is protected route for Admin only"
            })
        }
        next();
    }
    catch(err){
        return res.status(500).json({
            success : false,
            message : "User role cannot be verified, please try again"
        })
    }
}

exports.isAicteMember = async(req, res, next) => {
    try{
        if(req.user.accountType !== "Aicte-Member"){
            return res.status(401).json({
                success : false,
                message : "This is protected route for Aicte-Members only"
            })
        }
        next();
    }
    catch(err){
        return res.status(500).json({
            success : false,
            message : "User role cannot be verified, please try again"
        })
    }
}

exports.isInstitute = async(req, res, next) => {
    try{
        if(req.user.accountType !== "Institute"){
            return res.status(401).json({
                success : false,
                message : "This is protected route for Aicte-Members only"
            })
        }
        next();
    }
    catch(err){
        return res.status(500).json({
            success : false,
            message : "User role cannot be verified, please try again"
        })
    }
}

