import useFetch from '../hooks/useFetch';
import CourseList from '../components/CourseList';

function HomePage() {

    const url = `${import.meta.env.VITE_API_BASE_URL}/courses`;

    const { data, isPending, error } = useFetch(url);

    const courses = Array.isArray(data) ? data : [];

    return (
        <div className="container mt-4">
            <h2>Aurora CS Course Scheduler</h2>

            {isPending && <p>Loading courses...</p>}

            {error && (
                <p className="text-danger">{error}</p>
            )}

            <h4>Course Catalog</h4>

            <CourseList courses={courses} />
        </div>
    );
}

export default HomePage;
