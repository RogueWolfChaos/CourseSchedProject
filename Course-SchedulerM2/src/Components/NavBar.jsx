import { Link } from 'react-router-dom'

function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    Aurora CS Course Scheduler
                </Link>

                <div className="navbar-nav">
                    <Link className="nav-link" to="/">
                        Home
                    </Link>

                    <Link className="nav-link" to="/about">
                        About
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default NavBar
