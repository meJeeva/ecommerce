const express = require('express');
const mongoose = require('mongoose');

const ConnectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://jeevabrock2003:jeeva123@cluster0.iguiy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(() => {
            console.log('DB is Connected');
        }).catch(err => console.log(err))
    } catch (error) {
        console.log(error);
    }
}

module.exports = ConnectDB