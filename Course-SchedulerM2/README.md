Installation and Setup

1. Install Dependencies

Open a terminal in the course-scheduler folder and run:

npm install

2. Configure the Environment

The project uses a .env file containing:

VITE_API_BASE_URL=http://localhost:3333

This configures the application to communicate with JSON Server.

3. Start JSON Server

Open a terminal in the project folder and run:

npx json-server --watch db/db.json --port 3333

JSON Server provides the course data at:

http://localhost:3333/courses

Keep this terminal running.

4. Start the React Application

Open a second terminal in the project folder and run:

npm run dev

Open the local URL displayed by Vite in your browser, typically:

http://localhost:5173

Both JSON Server and the React application must be running for the course catalog to load.

Using the Application

On the Home page, students can view the available courses and their prerequisites.

Courses without prerequisites are initially available. Completing a course may unlock additional courses.

Students can select the Completed checkbox to mark a course as finished. If a prerequisite course is unchecked, dependent courses are automatically unchecked as well.

The Save Completed Courses button stores completion selections in the browser's localStorage. Saved selections are restored when the application is reloaded.

The Course Progress section displays the number of completed, available, and locked courses, along with the overall completion percentage.

Contributors

Lucas Allway

Maura Sikorski