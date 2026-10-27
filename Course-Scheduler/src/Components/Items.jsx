// src/components/Items.jsx
function Items() {
    const listStyle = {
        backgroundColor: 'yellow',
        padding: '10px',
        borderRadius: '8px',
        textAlign: 'left',
        listStyle: 'none'
    }
    const itemStyle = {
        marginBottom: '8px',
        padding: '6px',
        borderBottom: '1px solid green'
    }
    const featured = {color: 'red', fontWeight: 'bold'}
    const books = [
        {
            title: 'American Prometheus', cost: 12.99, color: 'darkblue',
            background: 'transparent', newArrival: false
        },
        {
            title: 'Educated', cost: 10.99, color: 'darkgreen',
            background: 'transparent', newArrival: false
        },
        {
            title: 'Fellowship of the Ring', cost: 11.99, color: 'purple',
            background: 'transparent', newArrival: false
        },
        {
            title: 'Sapiens', cost: 9.99, color: 'darkblue',
            background: '#ffffcc', newArrival: true
        },
        {
            title: 'The Martian!!!', cost: 14.99, color: 'red',
            background: 'transparent', newArrival: true
        },
    ];
    function countColor(color) {
        return books.filter(book => book.color === color).length;
    }

    return (
        <>
        <p>Books in dark blue: {countColor('darkblue')}</p>
    <ul className='list-group' style={listStyle}>
            {books.map((book) => (
                <li key={book.title}
                    style={{
                        ...itemStyle, color: book.color,
                        backgroundColor: book.background
                    }}
                >
                    {book.title} — ${book.cost}
                    - {book.cost > 12 ? ' 💰 Premium' : ' 👍 Great Value'}
                </li>
            ))}
        </ul>
        </>
    );
}

export default Items;
