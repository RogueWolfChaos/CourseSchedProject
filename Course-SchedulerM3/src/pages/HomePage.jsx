import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import CourseList from '../components/CourseList';
import ProgressSummary from '../components/ProgressSummary';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function HomePage() {
    const { data, isPending, error } = useFetch(`${BASE_URL}/api/courses`);
    const { data: savedCompletions, isPending: completionsPending, error: completionsError } =
        useFetch(`${BASE_URL}/api/completions`);

    const courses = Array.isArray(data)
        ? data.map(course => ({
            ...course,
            id: Number(course.id),
            prerequisites: course.prerequisites.map(id => Number(id))
        }))
        : [];

    const [completed, setCompleted] = useState([]);
    const [filter, setFilter] = useState('all');
    const [message, setMessage] = useState(null); // { type: 'success' | 'danger', text }
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (Array.isArray(savedCompletions)) setCompleted(savedCompletions.map(Number));
    }, [savedCompletions]);

    const isAvailable = (course) => {
        return course.prerequisites.every(prereqId =>
            completed.includes(prereqId)
        );
    };

    const handleComplete = (course) => {
        setMessage(null);

        if (completed.includes(course.id)) {

            let remaining = completed.filter(
                id => id !== course.id
            );

            let changed = true;

            while (changed) {
                changed = false;

                remaining = remaining.filter(id => {
                    const currentCourse = courses.find(
                        c => c.id === id
                    );

                    if (!currentCourse) return false;

                    const prerequisitesMet =
                        currentCourse.prerequisites.every(
                            prereqId => remaining.includes(prereqId)
                        );

                    if (!prerequisitesMet) {
                        changed = true;
                    }

                    return prerequisitesMet;
                });
            }

            setCompleted(remaining);

        } else if (isAvailable(course)) {

            setCompleted([...completed, course.id]);

        }
    };

    const handleSave = async () => {
        setSaving(true);
        setMessage(null);

        try {
            const resp = await fetch(`${BASE_URL}/api/completions`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(completed)
            });
            const body = await resp.json().catch(() => null);

            if (!resp.ok) {
                // server error message
                throw new Error(body?.error || `HTTP error: ${resp.status}`);
            }

            setCompleted(body);
            setMessage({ type: 'success', text: 'Completed courses saved successfully!' });
        } catch (err) {
            setMessage({ type: 'danger', text: `Save failed: ${err.message}` });
        } finally {
            setSaving(false);
        }
    };

    const filteredCourses = courses.filter(course => {
        if (filter === 'completed') {
            return completed.includes(course.id);
        }

        if (filter === 'remaining') {
            return !completed.includes(course.id);
        }

        return true;
    });

    const completedCount = courses.filter(course =>
        completed.includes(course.id)
    ).length;

    const availableCount = courses.filter(course =>
        !completed.includes(course.id) && isAvailable(course)
    ).length;

    const lockedCount = courses.filter(course =>
        !completed.includes(course.id) && !isAvailable(course)
    ).length;


    return (
        <div className="container mt-4">

            <h2>Aurora CS Course Scheduler</h2>

            <ProgressSummary
                completedCount={completedCount}
                availableCount={availableCount}
                lockedCount={lockedCount}
            />

            {(isPending || completionsPending) && (
                <p>Loading courses...</p>
            )}

            {(error || completionsError) && (
                <p className="text-danger">{error || completionsError}</p>
            )}

            <h4>Course Catalog</h4>

            <div className="mb-3">
                <label htmlFor="courseFilter" className="form-label">
                    Filter Courses
                </label>

                <select
                    id="courseFilter"
                    className="form-select"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="all">All Courses</option>
                    <option value="completed">Completed Only</option>
                    <option value="remaining">Remaining</option>
                </select>
            </div>

            <button
                className="btn btn-success mb-3"
                onClick={handleSave}
                disabled={saving || isPending || completionsPending}
            >
                {saving ? 'Saving...' : 'Save Completed Courses'}
            </button>

            {message && (
                <div className={`alert alert-${message.type}`} role="alert">
                    {message.text}
                </div>
            )}

            <CourseList
                courses={filteredCourses}
                allCourses={courses}
                completed={completed}
                isAvailable={isAvailable}
                handleComplete={handleComplete}
            />

        </div>
    );
}

export default HomePage;
