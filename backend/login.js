const express = require('express');
const session = require('express-session');
const { v4: uuidv4 } = require('uuid');
const db = require('./database.js');
const { parse } = require('dotenv');



const login = async (req, res) => {
    const { username, password } = req.body;
    if (await db.validateCredentials(username, password)) {
        const token = uuidv4();
        let userId = await db.getUserId(username);
        await db.storeSession(token, userId, new Date(Date.now() + 86400000)); // 24 hour expiration

        res.status(200);
        let cookierSettings = {
            domain: process.env.FRONTEND_URL.substring(8),
            path: '/',
            maxAge: 1000 * 60 * 60 * 24, // 24 hour
            secure: true, // if your site is HTTPS
            httpOnly: false, // if you need to access it via JavaScript
            sameSite: 'None' // if cross-site
        }
        res.cookie('session_token', token, cookierSettings);
        res.send(JSON.stringify(cookierSettings))
        // res.redirect('/');
    } else {
        res.status(400).send('Login Failed!');
    }
};

const logout = async (req, res) => {
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


