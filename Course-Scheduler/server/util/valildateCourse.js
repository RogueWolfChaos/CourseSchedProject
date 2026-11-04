// util/validateBook.js
//replace book validation w/ course validation (used by POST and PUT)
// make sur eit checks required course fields
function validateBook(body) {
    const { title, pages, author, year } = body
    if (!title || !author) {
        return 'title and author are required'
    }
    if (!pages || isNaN(parseInt(pages))) {
        return 'pages must be a whole number'
    }
    if (!year || isNaN(parseInt(year))) {
        return 'year must be a whole number'
    }
    if (parseInt(year) < 1000 || parseInt(year) > 2100) {
        return 'year must be between 1000 and 2100'
    }
    return null // null means valid
}
module.exports = validateBook