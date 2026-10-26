import './App.css'
import NavBar from './components/NavBar.jsx'
import LeftSide from './components/LeftSide.jsx'
import RightSide from './components/RightSide.jsx'

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
