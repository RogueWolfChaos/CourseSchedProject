import { useState } from 'react';
import useFetch from '../hooks/useFetch';
import CourseList from '../components/CourseList';

function HomePage() {
    const url = `${import.meta.env.VITE_API_BASE_URL}/courses`;

    const { data, isPending, error } = useFetch(url);

    const courses = Array.isArray(data) ? data : [];

    const [completed, setCompleted] = useState([]);

    const isAvailable = (course) => {
        return course.prerequisites.every(prereqId =>
            completed.includes(prereqId)
        );
    };

    const handleComplete = (course) => {

        if (completed.includes(course.id)) {

            const remaining = completed.filter(
                id => id !== course.id
            );

            setCompleted(remaining);

        } else if (isAvailable(course)) {

            setCompleted([...completed, course.id]);

        }
    };

    return (
        <div className="container mt-4">

            <h2>Aurora CS Course Scheduler</h2>

            {isPending && (
                <p>Loading courses...</p>
            )}

            {error && (
                <p className="text-danger">{error}</p>
            )}

            <h4>Course Catalog</h4>

            <CourseList
                courses={courses}
                completed={completed}
                isAvailable={isAvailable}
                handleComplete={handleComplete}
            />

        </div>
    );
}

export default HomePage;