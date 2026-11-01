import CourseCard from './CourseCard';

function CourseList({ courses, completed, isAvailable, handleComplete }) {

    return (
        <div>
            {courses.map(course => (
                <CourseCard
                    key={course.id}
                    data={course}
                    courses={courses}
                    completed={completed}
                    isAvailable={isAvailable}
                    handleComplete={handleComplete}
                />
            ))}
        </div>
    );
}

export default CourseList;