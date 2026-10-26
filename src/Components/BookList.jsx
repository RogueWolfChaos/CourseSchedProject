function BookList( {title, books, handleDelete} ) {

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <h3>{title}</h3>
                <table className='table table-striped table-bordered table-hover'>
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Description</th>
                        <th>Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    {books.map(book => (
                        <tr key={book.id}>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.desc}</td>
                            <td>${book.cost}</td>
                            <button
                            className='btn btn-danger btn-sm'
                            onClick={() => handleDelete(book.id)}>
                            Delete {book.id}
                            </button>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
            )
            }

            export default BookList
