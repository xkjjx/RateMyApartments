const { response, json, request } = require('express');
const Pool = require('pg').Pool;
require('dotenv').config();


const pool = new Pool({
    host: 'ep-young-night-a5728mqv.us-east-2.aws.neon.tech',
    database: 'maindb',
    user: 'maindb_owner',
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    },
    password: process.env.PGPASSWORD,
});

const closePool = () => {
    pool.end();
};

module.exports = { pool, closePool };

const addArea = (request, response) => {
    const name = request.body.name;

    pool.query('INSERT INTO area (name) VALUES ($1)', [name], (error, results) => {
        if (error) {
            response.status(400).send(`Error: ${error}`);
        }
        response.status(201).send(`Area added with ID: ${results.insertId}`);
    })
};

const getAreas = (request, response) => {
    pool.query('SELECT * FROM area', (error, results) => {
        if (error) {
            response.status(400).send(`Error: ${error}`);
        }
        response.status(200).json(results.rows);
    })
};

const getApartmentsInArea = (request, response) => {
    const areaId = parseInt(request.params.id);

    const query = `SELECT * FROM apartments where area_id = $1;
    `;

    pool.query(query, [areaId], (error, results) => {
        if (error) {
            response.status(400).send(`Error: ${error}`);
        } else {
            response.status(200).json(results.rows);
        }
    });
}


const addApartment = (request, response) => {
    const { name, address, description, google_maps_link, apple_maps_link } = request.body;

    pool.query('INSERT INTO apartments (name, address, description, google_maps_link, apple_maps_link) VALUES ($1, $2, $3) RETURNING id', [name, address, description, google_maps_link, apple_maps_link], (error, results) => {
        if (error) {
            response.status(400).send(`Error: ${error}`);
        }
        response.status(201).json(results.rows[0]);
    })
}

const getAreaName = (request, response) => {
    const areaId = parseInt(request.params.id);

    pool.query('SELECT name FROM area WHERE id = $1', [areaId], (error, results) => {
        if (error) {
            response.status(400).send(`Error: ${error}`);
        }
        response.status(200).json(results.rows[0]);
    })
}

const getApartmentInformation = (request, response) => {
    const apartmentId = parseInt(request.params.id);

    pool.query('SELECT * FROM apartments WHERE id = $1', [apartmentId], (error, results) => {
        if (error) {
            response.status(400).send(`Error: ${error}`);
        }
        response.status(200).json(results.rows[0]);
    })
}

const addReview = async (request, response) => {
    const { apartment_id, rating, review, title } = request.body;

    let userId = -1;

    const sessionToken = request.cookies.session_token;
    if (!sessionToken) {
        response.status(401).send('No access token provided. Please log in.');
        return;
    }
    else{
        const results = await pool.query('SELECT user_id FROM sessions WHERE token = $1 AND expires_at > NOW()', [sessionToken]);
        if(results.rows.length > 0){
            userId = results.rows[0].user_id;
        }
        else{
            response.status(401).send('Access token expired or invalid. Please log in again.');
            return;
        }
    }


    pool.query('INSERT INTO reviews (apartment_id, rating, content, user_id, title) VALUES ($1, $2, $3, $4, $5) RETURNING id', [apartment_id, rating, review, userId, title], (error, results) => {
        if (error) {
            response.status(400).send(`Error: ${error}`);
        }
        else{
            response.json(results.rows[0]);
        }
    })
}

const getReviews = (request, response) => {
    const apartmentId = parseInt(request.params.id);

    pool.query('SELECT * FROM reviews WHERE apartment_id = $1', [apartmentId], (error, results) => {
        if (error) {
            response.status(400).send(`Error: ${error}`);
        }
        response.status(200).json(results.rows);
    })
}

const getUserNameById = (request, response) => {
    const userId = parseInt(request.params.id);

    pool.query('SELECT name FROM users WHERE id = $1', [userId], (error, results) => {
        if (error) {
            response.status(400).send(`Error: ${error}`);
        }
        response.status(200).json(results.rows[0]);
    })
}

const addUser = (request, response) => {
    const { email, password, name } = request.body;

    pool.query('INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING id', [email, password, name], (error, results) => {
        if (error) {
            response.status(400).send(`Error: ${error}`);
        }
        response.status(201).json(results.rows[0]);
    })
}

async function getUserId(username) {
    try {
        const results = await pool.query('SELECT id FROM users WHERE email = $1', [username]);
        if (results.rows.length > 0) {
            return results.rows[0].id;
        } else {
            return -1; // or throw an error, or handle the absence of a user as you see fit
        }
    } catch (error) {
        console.error('Error querying database', error);
        return -1; // or throw an error
    }
}

async function storeSession(token, userId, expiresAt) {
    return pool.query(
        'INSERT INTO sessions (token, user_id, expires_at) VALUES ($1, $2, $3) RETURNING id',
        [token, userId, expiresAt]
    );
}

async function deleteSession(token) {
    return pool.query(
        'DELETE FROM sessions WHERE token = $1',
        [token]
    );
}

async function findSession(token) {
    return pool.query(
        'SELECT * FROM sessions WHERE token = $1 AND expires_at > NOW()',
        [token]
    );
}

async function validateCredentials(username, password){
    try{
        const results = await pool.query('SELECT id FROM users WHERE email = $1 AND password = $2', [username, password]);
        if(parseInt(results.rowCount) > 0){
            return true;
        }
        else{
            return false;
        }
    }
    catch(error){
        console.error('Error querying database', error);
        return false;
    }
}

const validateTokenAndReturnUserId = async (session_id, response) => {
    if(!session_id){
        response.status(401).send('Unauthorized');
    }
    else{
        try{
            const results = await pool.query('SELECT user_id FROM sessions WHERE token = $1 AND expires_at > NOW()', [session_id]);
            if(results.rows.length > 0){
                response.status(200).json(results.rows[0].user_id);
            }
            else{
                response.status(401).send('Unauthorized');
            }
        }
        catch(error){
            console.error('Error querying database', error);
            response.status(500).send('Internal Server Error');
        }
    }
}




module.exports = 
{ addArea,
     getAreas,
      getApartmentsInArea,
       getAreaName,
        getApartmentInformation,
         addReview,
          getReviews,
          getUserId,
           storeSession,
           findSession,
            deleteSession,
            validateCredentials,
             validateTokenAndReturnUserId,
              getUserNameById,
               closePool,
               addUser,
            addApartment}




