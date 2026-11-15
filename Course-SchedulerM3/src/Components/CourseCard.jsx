function CourseCard({ data, courses, completed, isAvailable, handleComplete }) {

    const prerequisiteNumbers = data.prerequisites.map(id => {
        const prerequisite = courses.find(course => Number(course.id) === Number(id));
        return prerequisite ? prerequisite.number : 'Unknown';
    });

    const isCompleted = completed.includes(data.id);
    const available = isAvailable(data);

    let status = 'Locked';
    let statusColor = 'secondary';

    if (isCompleted) {
        status = 'Completed';
        statusColor = 'success';
    } else if (available) {
        status = 'Available';
        statusColor = 'primary';
    }

    return (
        <div className="card h-100 overflow-hidden">

            <div
                className={`bg-${statusColor}`}
                style={{ height: '6px' }}
            ></div>

            <div className="card-body d-flex flex-column">

                <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title me-2">
                        {data.number} - {data.title}
                    </h5>

                    <span className={`badge bg-${statusColor}`}>
                        {status}
                    </span>
                </div>

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

                <div className="form-check mt-auto">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id={`course-${data.id}`}
                        checked={isCompleted}
                        disabled={!isCompleted && !available}
                        onChange={() => handleComplete(data)}
                    />

                    <label
                        className="form-check-label"
                        htmlFor={`course-${data.id}`}
                    >
                        Completed
                    </label>
                </div>

            </div>
        </div>
    );
}

export default CourseCard;
