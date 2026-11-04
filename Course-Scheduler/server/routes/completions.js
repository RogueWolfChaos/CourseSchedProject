//- GET /completions — retrieve the completed course IDs
// - PUT /completions — replace the completed course list in MySQL
// Also includes:
// - const USER_ID = 1 and the M3 comment
// - Prerequisite validation on the server
// - replaceCompletions() helper
// - Return status 400 if prerequisites aren't satisfied
// - try/catch for database errors