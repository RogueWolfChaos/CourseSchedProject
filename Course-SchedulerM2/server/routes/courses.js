const express = require('express')
const pool = require('../util/database')
const { getCoursesWithPrereqs } = require('../util/courseData')
const validateCourse = require('../util/validateCourse')

const router = express.Router()
const cleanPrereqs = body => [...new Set((body.prerequisites || []).map(Number))]
async function findMissingIds(ids) {
    if (ids.length === 0) return []
    const [rows] = await pool.query('SELECT id FROM courses WHERE id IN (?)', [ids])
    const found = rows.map(r => r.id)
    return ids.filter(id => !found.includes(id))
}
async function insertPrereqs(courseId, ids) {
    if (ids.length === 0) return
    const rows = ids.map(prereqId => [courseId, prereqId])
    await pool.query('INSERT INTO prerequisites (course_id, prereq_id) VALUES ?', [rows])
}

// Get all courses from api
router.get('/courses', async (req, res) => {
    try {
        const courses = await getCoursesWithPrereqs(pool)
        res.json(courses)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})
// Get specific course form api
router.get('/courses/:id', async (req, res) => {
    const id = Number(req.params.id)
    if (!Number.isInteger(id)) {
        return res.status(404).json({ error: 'Course not found' })
    }
    try {
        const course = await getCoursesWithPrereqs(pool, id)
        if (!course) return res.status(404).json({ error: 'Course not found' })
        res.json(course)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// post course to api
router.post('/courses', async (req, res) => {
    const error = validateCourse(req.body)
    if (error) return res.status(400).json({ error })

    const { number, title, credits, description } = req.body
    const prereqs = cleanPrereqs(req.body)

    try {
        const missing = await findMissingIds(prereqs)
        if (missing.length > 0) {
            return res.status(400).json({
                error: `Prerequisite course id(s) not found: ${missing.join(', ')}`
            })
        }
        const [result] = await pool.query(
            'INSERT INTO courses (number, title, credits, description) VALUES (?, ?, ?, ?)',
            [number, title, credits, description ?? null]
        )
        await insertPrereqs(result.insertId, prereqs)

        const created = await getCoursesWithPrereqs(pool, result.insertId)
        res.status(201).json(created)
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: `Course number ${number} already exists` })
        }
        res.status(500).json({ error: err.message })
    }
})

// Put specific course api
router.put('/courses/:id', async (req, res) => {
    const id = Number(req.params.id)
    if (!Number.isInteger(id)) {
        return res.status(404).json({ error: 'Course not found' })
    }

    const error = validateCourse(req.body)
    if (error) return res.status(400).json({ error })

    const { number, title, credits, description } = req.body
    const prereqs = cleanPrereqs(req.body)

    if (prereqs.includes(id)) {
        return res.status(400).json({ error: 'A course cannot be its own prerequisite' })
    }

    try {
        const missing = await findMissingIds(prereqs)
        if (missing.length > 0) {
            return res.status(400).json({
                error: `Prerequisite course id(s) not found: ${missing.join(', ')}`
            })
        }

        const [result] = await pool.query(
            'UPDATE courses SET number = ?, title = ?, credits = ?, description = ? WHERE id = ?',
            [number, title, credits, description ?? null, id]
        )
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Course not found' })
        }

        await pool.query('DELETE FROM prerequisites WHERE course_id = ?', [id])
        await insertPrereqs(id, prereqs)

        const updated = await getCoursesWithPrereqs(pool, id)
        res.json(updated)
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: `Course number ${number} already exists` })
        }
        res.status(500).json({ error: err.message })
    }
})

// Del specific course from api
router.delete('/courses/:id', async (req, res) => {
    const id = Number(req.params.id)
    if (!Number.isInteger(id)) {
        return res.status(404).json({ error: 'Course not found' })
    }
    try {
        const course = await getCoursesWithPrereqs(pool, id)
        if (!course) return res.status(404).json({ error: 'Course not found' })
        await pool.query('DELETE FROM courses WHERE id = ?', [id])
        res.json(course)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

module.exports = router