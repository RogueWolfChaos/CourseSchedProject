//Outline TODO: fill in gaps and such

import { useState, useEffect } from 'react'
import useFetch from '../hooks/useFetch'
import CourseList from '../components/CourseList'
import ProgressSummary from '../components/ProgressSummary'

function HomePage() {

    // Fetch courses using useFetch

    // State: completed course IDs

    // State: selected filter (All / Completed / Remaining)

    // Restore saved completion state from localStorage

    // Handle checking a course as completed

    // Handle unchecking a course
    // Cascade: also uncheck dependent courses

    // Filter courses based on selected filter

    // Calculate completed, available, and locked counts

    // Handle saving completion state to localStorage

    return (
        <div>
            {/* Page heading */}

            {/* ProgressSummary component */}

            {/* Filter control */}

            {/* CourseList component */}

            {/* Save button */}
        </div>
    )
}

export default HomePage
