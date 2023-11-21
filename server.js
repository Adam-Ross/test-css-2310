const express = require('express')
const app = express()

const PORT = 3000

const {Pool} = require('pg')

const pool = new Pool({
    database: 'galvanize',
    user: 'garrettross',
    port: '5432',
    host: 'localhost',
    password: ''
})

app.use(express.static('public'))

app.use(express.json())

app.get('/api', async (req, res) => {    
    try {
        const data = await pool.query('SELECT * FROM instructors;')
        res.send(data.rows)
    } catch (error) {
        res.json({error: error.message})
    }
})

app.get('/api/:id', async (req, res) => {
    try {
        const {id} = req.params
        const data = await pool.query('SELECT * FROM instructors WHERE instructorid = $1;', [id])
        res.send(data.rows[0])
    } catch (error) {
        res.json({error: error.message})
    }

})


app.post('/api', async (req, res) => {
    try {
        const { name, age, areaofexpertise } = req.body;
        const newInstructor = await pool.query(
            'INSERT INTO instructors (name, age, areaofexpertise) VALUES ($1, $2, $3) RETURNING *;',
            [name, age, areaofexpertise]
        );
        res.json(newInstructor.rows[0]);
    } catch (error) {
        res.json({ error: error.message });
    }
});

// PUT route to update an existing instructor
app.put('/api/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, age, areaofexpertise } = req.body;
        const updateInstructor = await pool.query(
            'UPDATE instructors SET name = $1, age = $2, areaofexpertise = $3 WHERE instructorid = $4 RETURNING *;',
            [name, age, areaofexpertise, id]
        );
        res.json(updateInstructor.rows[0]);
    } catch (error) {
        res.json({ error: error.message });
    }
});

// DELETE route to delete an instructor
app.delete('/api/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteInstructor = await pool.query(
            'DELETE FROM instructors WHERE instructorid = $1;',
            [id]
        );
        res.json({ message: 'Instructor deleted' });
    } catch (error) {
        res.json({ error: error.message });
    }
});



app.listen(PORT, function() {
    console.log(`Listening on port: ${PORT}`)
})
