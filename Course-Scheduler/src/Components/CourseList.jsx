
import CourseCard from './CourseCard'

function CourseList({
                        courses,
                        completed,
                        onToggle
                    }) {

    return (
        <div>
            {courses.map(course => (

                // Render a CourseCard for each course

            ))}
        </div>
    )
}

export default CourseList
