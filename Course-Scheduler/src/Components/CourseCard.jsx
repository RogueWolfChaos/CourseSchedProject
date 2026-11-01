function CourseCard({ data, courses, completed, isAvailable, handleComplete }) {

    const prerequisiteNumbers = data.prerequisites.map(id => {
        const prerequisite = courses.find(course => Number(course.id) === Number(id));
        return prerequisite ? prerequisite.number : 'Unknown';
    });

    const isCompleted = completed.includes(data.id);
    const available = isAvailable(data);

    let status = 'Locked';

    if (isCompleted) {
        status = 'Completed';
    } else if (available) {
        status = 'Available';
    }

    return (
        <div className="card h-100">
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

                <p>
                    <strong>Status:</strong>{' '}
                    <span className={
                              status === 'Completed'
                                  ? 'badge bg-success'
                                  : status === 'Available'
                                      ? 'badge bg-primary'
                                      : 'badge bg-secondary'
                          }>
                        {status}
                    </span>
                </p>

                <div className="form-check">
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