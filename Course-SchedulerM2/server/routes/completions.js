const express = require('express')
const pool = require('../util/database')
const { getCoursesWithPrereqs, replaceCompletions } = require('../util/courseData')
const USER_ID = 1 //M3: replaced by the logged-in user's id
const router = express.Router()
const isValidCompletionSet = (courses, completed) => {
    return completed.every(id => {
        const course = courses.find(c => c.id === id)
        return course && course.prerequisites.every(p => completed.includes(p))
    })
}
function describeProblem(courses, completed) {
    for (const id of completed) {
        const course = courses.find(c => c.id === id)
        if (!course) return `Course id ${id} does not exist`
        const missing = course.prerequisites.filter(p => !completed.includes(p))
        if (missing.length > 0) {
            const names = missing.map(p => courses.find(c => c.id === p)?.number ?? `id ${p}`)
            return `${course.number} cannot be completed without ${names.join(', ')}`
        }
    }
    return 'Invalid completion list'
}

// get from api
router.get('/completions', async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT course_id FROM completions WHERE user_id = ? ORDER BY course_id',
            [USER_ID]
        )
        res.json(rows.map(r => r.course_id))
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})
//put
router.put('/completions', async (req, res) => {
    const body = req.body
    if (!Array.isArray(body) || !body.every(id => Number.isInteger(id) && id > 0)) {
        return res.status(400).json({ error: 'Body must be an array of course ids' })
    }
    const completed = [...new Set(body)].sort((a, b) => a - b)
    try {
        const courses = await getCoursesWithPrereqs(pool)
        if (!isValidCompletionSet(courses, completed)) {
            return res.status(400).json({ error: describeProblem(courses, completed) })
        }
        await replaceCompletions(pool, USER_ID, completed)
        res.json(completed)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})
module.exports = router