function ProgressSummary({ completedCount, availableCount, lockedCount }) {
    return (
        <div className="card mb-4">
            <div className="card-body">
                <h5 className="card-title">Course Progress</h5>

                <p>Completed: {completedCount}</p>
                <p>Available: {availableCount}</p>
                <p>Locked: {lockedCount}</p>
            </div>
        </div>
    );
}

export default ProgressSummary;
