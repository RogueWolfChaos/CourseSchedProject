//11.	A progress summary is always visible showing:
// number of courses completed, number available, and number locked.
// These numbers update immediately when completion state changes.
// They are derived from state — not stored separately.

function ProgressSummary({
                             completedCount,
                             availableCount,
                             lockedCount
                         }) {

    return (
        <div>
            {/* Completed: X / 10 */}

            {/* Available: X */}

            {/* Locked: X */}
        </div>
    )
}

export default ProgressSummary
