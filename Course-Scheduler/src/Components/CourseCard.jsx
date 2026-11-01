
function CourseCard({ data, courses }) {

    const prerequisiteNumbers = data.prerequisites.map(id => {
        const prerequisite = courses.find(course => course.id === id);
        return prerequisite ? prerequisite.number : 'Unknown';
    });

    return (
        <div className="card mb-3">
            <div className="card-body">
                <h5 className="card-title">
                    {data.number} - {data.title}
                </h5>

                <p className="card-text">
                    {data.description}
                </p>

                <p className="card-text">
                    <strong>Credits:</strong> {data.credits}
                </p>

                <p className="card-text">
                    <strong>Prerequisites:</strong>{' '}
                    {prerequisiteNumbers.length > 0
                        ? prerequisiteNumbers.join(', ')
                        : 'None'}
                </p>
            </div>
        </div>
    );
}

export default CourseCard;