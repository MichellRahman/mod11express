const path = require('path')
const fs = require('fs')
const express = require('express')
const app = express()
const port = 3000
const { v4: uuidv4 } = require('uuid');



app.use(express.json())
app.use(express.static('public'))

app.get('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, 'db/db.json'), "utf-8", (error, data) => {
        if (error) {
            res.status(500).json({ message: "Something went wrong!" })
        } else {
            res.status(200).send(data)
        }
    })
})
app.post('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, 'db/db.json'), "utf-8", (error, data) => {
        if (error) {
            res.status(500).json({ message: "Something went wrong!" })
        } else {
            const notes = JSON.parse(data)
            console.log('notes', notes);
            req.body.id = uuidv4()
            console.log('req.body', req.body);
            notes.push(req.body)
            fs.writeFile(path.join(__dirname, 'db/db.json'), JSON.stringify(notes), 'utf-8', (error) => {
                if (error) {
                res.status(500).json({ message: "Something went wrong!" })
                } else {
                    res.status(201).json(req.body)
                }
            })

        }
    })
})
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'))
})
app.get('*', (req, res) => {
    res.sendFile('index.html')
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})