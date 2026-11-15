require('dotenv').config()

const express = require('express')
const cors = require('cors')
const coursesRouter = require('./routes/courses')
const completionsRouter = require('./routes/completions')
const app = express()
app.use(cors({ origin: process.env.CLIENT_ORIGIN }))
app.use(express.json())
app.use('/api', coursesRouter)
app.use('/api', completionsRouter)

// 404
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' })
})
// other uncaught errors
app.use((err, req, res, next) => {
    if (err.type === 'entity.parse.failed') {
        return res.status(400).json({ error: 'Invalid JSON in request body' })
    }
    res.status(err.status || 500).json({ error: err.message })
})
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Course Scheduler API running on http://localhost:${PORT}`)
})