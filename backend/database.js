const { response, json } = require('express')
const Pool = require('pg').Pool
require('dotenv').config()

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'ratemyapartment',
    user: 'kjj',
    password: "npc"
})

const closePool = () => {
    pool.end();
}

module.exports = { pool, closePool }

const addArea = (request, response) => {
    const name = request.body.name;

    pool.query('INSERT INTO area (name) VALUES ($1)', [name], (error, results) => {
        if (error) {
            response.status(400).send(`Error: ${error}`);
        }
        response.status(201).send(`Area added with ID: ${results.insertId}`);
    })
}

const getAreas = (request, response) => {
    pool.query('SELECT * FROM area', (error, results) => {
        if (error) {
            response.status(400).send(`Error: ${error}`);
        }
        response.status(200).json(results.rows);
    })
}

const getApartmentsInArea = (request, response) => {
    const areaId = parseInt(request.params.id);

    pool.query('SELECT * FROM area_apartments WHERE area_id = $1', [areaId], (error, results) => {
        if (error) {
            response.status(400).send(`Error: ${error}`);
        }
        const apartmentId = parseInt(results.rows[0].apartment_id);
        pool.query('SELECT * FROM apartments WHERE id = $1', [apartmentId], (error, results) => {
            if (error) {
                response.status(400).send(`Error: ${error}`);
            }
            response.status(200).json(results.rows);
        })
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

const addReview = (request, response) => {
    const { apartment_id, rating, review, user_id, title } = request.body;

    pool.query('INSERT INTO reviews (apartment_id, rating, content, user_id, title) VALUES ($1, $2, $3, $4, $5)', [apartment_id, rating, review, user_id, title], (error, results) => {
        if (error) {
            response.status(400).send(`Error: ${error}`);
        }
        response.status(201);
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

module.exports = { addArea, getAreas, getApartmentsInArea, getAreaName, getApartmentInformation, addReview, getReviews }




