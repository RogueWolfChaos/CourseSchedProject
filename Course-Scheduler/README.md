test
M1 is react ONLY- no cutsom back end. 
JSON server acts as a stand in Rest API for course data
TODO:
fetch JSON data using useFetch hook
display full catalog showing each course's number, title, credits, description and prereq. course numbers
completion check

- course cannot be marked completed until its prereqs have been completed (enforced)
- each course is labled by completion state
- filter control lets student switch between AllCourses, CompletedOnly and Remaining(not yet completed)
