
function AboutPage() {
    const currentDate = new Date().toLocaleDateString();

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-7">

                    <div className="card shadow-sm">
                        <div className="card-body p-4">

                            <h2 className="card-title text-center mb-4">
                                About Aurora CS Course Scheduler
                            </h2>

                            <p className="card-text text-center">
                                Aurora CS Course Scheduler helps students
                                track completed computer science courses
                                and determine which courses are available
                                based on prerequisites.
                            </p>

                            <hr />

                            <p>
                                <strong>Authors:</strong> Lucas Allway and Maura Sikorski
                            </p>

                            <p>
                                <strong>Version:</strong> 1.0.0
                            </p>

                            <p>
                                <strong>Date:</strong> {currentDate}
                            </p>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default AboutPage;
