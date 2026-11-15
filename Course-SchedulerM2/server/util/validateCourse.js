// util/validateBook.js
//replace book validation w/ course validation (used by POST and PUT)
// make sur eit checks required course fields
function validateCourse(body) {
    if (!body || typeof body !== 'object') {
        return 'Request body must be a JSON object'
    }

    const { number, title, credits, prerequisites } = body

    if (!number || String(number).trim() === '') {
        return 'number is required'
    }
    if (!title || String(title).trim() === '') {
        return 'title is required'
    }
    if (credits === undefined || credits === null || credits === '') {
        return 'credits is required'
    }
    if (!Number.isInteger(Number(credits))) {
        return 'credits must be a whole number'
    }

    if (prerequisites !== undefined) {
        if (!Array.isArray(prerequisites) ||
            !prerequisites.every(p => Number.isInteger(Number(p)) && Number(p) > 0)) {
            return 'prerequisites must be an array of course ids'
        }
    }

    return null
}

module.exports = validateCourse