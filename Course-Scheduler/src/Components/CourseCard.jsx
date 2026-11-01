//still need to access db -- TODO access db
//for each instance fof data, create a course card via map in which each
// course id becomes its key and evey course id has its own course card with info
//const handleDelete = (id) => {
//     const newBooks = books.filter(book => book.id !== id)
//     setBooks(newBooks)
// }
    function CourseCard({data, completed, isAvailible, handleToggle, handleDelete}){
    let status=""
        if(completed){
            status="Completed"}
        else if(isAvailible){
            status="Availible"
        }else{
            status="Locked"
        }


    return(
    <>
        <div className="card" style="width: 18rem;">
            <div className="card-body">
                <h5 className="card-title">{data.number} - {data.title}</h5>
                <p className="card-text">Credits: {data.credits} </p>
                <p className="card-text">{data.description} </p>
                <p className="card-text">Prerequisities: {data.prq.length===0 ? "None" : data.prq.join(", ")} </p>
                <p className="card-text">Status: {status} </p>

                <div className={"form-check"}>
                    <input className={"form-check-input"} type={"checkbox"} checked={completed} disabled={!isAvailable && !completed} onChange={()=> handleToggle(data.id)}/>
                    <label className={"form-check-label"}>
                        Completed
                    </label>
                </div>

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