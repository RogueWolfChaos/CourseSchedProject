import { useState } from 'react';
import useFetch from '../hooks/useFetch';
import CourseList from '../components/CourseList';
import ProgressSummary from '../components/ProgressSummary';

function HomePage() {
    const url = `${import.meta.env.VITE_API_BASE_URL}/courses`;

    const { data, isPending, error } = useFetch(url);

    const courses = Array.isArray(data)
        ? data.map(course => ({
            ...course,
            id: Number(course.id),
            prerequisites: course.prerequisites.map(id => Number(id))
        }))
        : [];

    const [completed, setCompleted] = useState(() => {
        const savedCourses = localStorage.getItem('completedCourses');

        return savedCourses ? JSON.parse(savedCourses).map(Number) : [];
    });
    const [filter, setFilter] = useState('all');

    const isAvailable = (course) => {
        return course.prerequisites.every(prereqId =>
            completed.includes(prereqId)
        );
    };


    const handleComplete = (course) => {

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

    const handleSave = () => {
        localStorage.setItem('completedCourses', JSON.stringify(completed));
        alert('Completed courses saved successfully!');
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

            {isPending && (
                <p>Loading courses...</p>
            )}

            {error && (
                <p className="text-danger">{error}</p>
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
            >
                Save Completed Courses
            </button>

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