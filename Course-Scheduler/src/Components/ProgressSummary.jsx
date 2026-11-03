
function ProgressSummary({ completedCount, availableCount, lockedCount }) {

    const totalCourses = completedCount + availableCount + lockedCount;

    const progress = totalCourses > 0
        ? (completedCount / totalCourses) * 100
        : 0;

    return (
        <div className="card mb-4">
            <div className="card-body">

                <h5 className="card-title">Course Progress</h5>

                <p>
                    {completedCount} of {totalCourses} courses completed
                </p>

                <div className="progress mb-3">
                    <div
                        className="progress-bar bg-success"
                        role="progressbar"
                        style={{ width: `${progress}%` }}
                        aria-valuenow={progress}
                        aria-valuemin="0"
                        aria-valuemax="100"
                    >
                        {progress.toFixed(0)}%
                    </div>
                </div>

                <div className="d-flex justify-content-between">
                    <span className="text-success">
                        Completed: {completedCount}
                    </span>

                    <span className="text-primary">
                        Available: {availableCount}
                    </span>

                    <span className="text-secondary">
                        Locked: {lockedCount}
                    </span>
                </div>

            </div>
        </div>
    );
}

export default ProgressSummary;
