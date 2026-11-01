function AboutPage() {
    const currentDate = new Date().toLocaleDateString();

    return (
        <div className="container mt-4">
            <h2>About Aurora CS Course Scheduler</h2>

            <p>
                Aurora CS Course Scheduler helps students track
                completed computer science courses and determine
                which courses are available based on prerequisites.
            </p>

            <p><strong>Authors:</strong> Lucas Allway and Maura Sikorski</p>
            <p><strong>Version:</strong> 1.0.0</p>
            <p><strong>Date:</strong> {currentDate}</p>
        </div>
    );
}

export default AboutPage;
