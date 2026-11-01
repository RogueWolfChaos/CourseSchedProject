import CourseCard from './CourseCard';

function CourseList({ courses, allCourses, completed, isAvailable, handleComplete }) {

    return (
        <div>
            {courses.map(course => (
                <CourseCard
                    key={course.id}
                    data={course}
                    courses={allCourses}
                    completed={completed}
                    isAvailable={isAvailable}
                    handleComplete={handleComplete}
                />
            ))}
        </div>
    );
}

export default CourseList;