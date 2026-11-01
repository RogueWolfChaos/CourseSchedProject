import CourseCard from './CourseCard';

function CourseList({ courses }) {

    return (
        <div>
            {courses.map(course => (
                <CourseCard
                    key={course.id}
                    data={course}
                    courses={courses}
                />
            ))}
        </div>
    );
}

export default CourseList;
