import CourseCard from './CourseCard';

function CourseList({ courses, allCourses, completed, isAvailable, handleComplete }) {

    return (
        <div className="row g-3">
            {courses.map(course => (
                <div className="col-12 col-md-6 col-lg-4" key={course.id}>
                    <CourseCard
                        data={course}
                        courses={allCourses}
                        completed={completed}
                        isAvailable={isAvailable}
                        handleComplete={handleComplete}
                    />
                </div>
            ))}
        </div>
    );
}

export default CourseList;