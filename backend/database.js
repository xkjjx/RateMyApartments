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
        console.log(apartmentId);
        pool.query('SELECT * FROM apartments WHERE id = $1', [apartmentId], (error, results) => {
            if (error) {
                response.status(400).send(`Error: ${error}`);
            }
            response.status(200).json(results.rows);
        })
    })
}


module.exports = { addArea, getAreas, getApartmentsInArea }




