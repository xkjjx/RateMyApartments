const express = require('express');
const session = require('express-session');
const { v4: uuidv4 } = require('uuid');
const db = require('./database.js');
const { parse } = require('dotenv');



const login = async (req, res) => {
    const { username, password } = req.body;
    if (db.validateCredentials(username, password)) {
        const token = uuidv4();
        let userId = await db.getUserId(username);
        await db.storeSession(token, userId, new Date(Date.now() + 86400000)); // 24 hour expiration
        res.cookie('session_token', token); // Send token as cookie
        res.redirect('/');
    } else {
        res.send('Login Failed!');
    }
};

const logout = async (req, res) => {
    //console.log(req.cookies);
    const token = req.cookies.session_token;

    if (!token) {
        return res.status(400).send('Session token is missing.');
    }

    try {
        await db.deleteSession(token);
        res.clearCookie('session_token');
        res.redirect('/login');
    } catch (error) {
        console.error('Failed to delete session:', error);
        res.status(500).send('Failed to log out.');
    }
};


module.exports = { login, logout };


