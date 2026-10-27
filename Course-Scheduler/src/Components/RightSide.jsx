// src/components/RightSide.jsx
import BookHome from './BookHome.jsx'

function RightSide() {
    return (
        <div className='col-md-4'>
            <h1 className='text-center text-warning'>Featured This Week</h1>
            <div className='card' style={{maxWidth: '400px', margin: '0 auto'}}>
                <div className='card-header bg-primary text-white'>
                    Staff Pick
                </div>
                <div className='card-body'>
                    <h5 className='card-title'>American Prometheus</h5>
                    <h6 className='card-subtitle mb-2 text-muted'>Bird and Sherwin</h6>
                    <p className='card-text'>
                        The definitive biography of J. Robert Oppenheimer.
                    </p>
                    <p className='card-text'>
            <span className='text-muted text-decoration-line-through me-2'>
              $12.99
            </span>
                        <span className='text-success fw-bold'>$9.99</span>
                    </p>
                    <a href='#' className='btn btn-primary'>Buy Now</a>
                </div>
            </div>
            <hr />
            <BookHome />
        </div>
    )
}

export default RightSide
