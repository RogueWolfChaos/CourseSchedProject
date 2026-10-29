//still need to access db -- TODO access db
//for each instance fof data, create a course card via map in which each
// course id becomes its key and evey course id has its own course card with info

    function CourseCard({data, handleDelete}){
return(
    <>
        <div className="card" style="width: 18rem;">
            <div className="card-body">
                <h5 className="card-title">{data.title}</h5>
                <p className="card-text">Card content and course information </p>
                <button
                    className='btn btn-danger btn-sm'
                    onClick={() => handleDelete(data.id)}>
                    Delete {data.id}
                </button>
            </div>
        </div>
    </>

)
}

export default CourseCard