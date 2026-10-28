import './assets/App.css'
import CourseList from './components/CourseList'
import CourseCard from './components/CourseCard'
import ProgressSummary from './components/ProgressSummary'
import NavBar from './Components/NavBar.jsx'
import LeftSide from './Components/LeftSide.jsx'
import RightSide from './Components/RightSide.jsx'

function App() {

    return (
        <>
            <NavBar/>
            <div className='container mt'>
                <div className="row">
                    <div className='col-md-3 text-center'>
                        <LeftSide/>
                    </div>
                    <div className='col-md-9 text-center'>
                        <RightSide/>
                    </div>
                </div>
            </div>
        </>
            )
            }

            export default App
