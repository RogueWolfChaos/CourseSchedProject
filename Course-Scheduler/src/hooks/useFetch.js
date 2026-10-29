import { useState, useEffect } from 'react'

function useFetch(url) {

    const [data, setData] = useState(null)

    const [isPending, setIsPending] = useState(true)

    const [error, setError] = useState(null)

    //Question for u :
    //function App() {
       // const [animals, setAnimals] = useState([]);

        // useEffect(() => {
        //     fetch('http://localhost:3000/animals')
        //         .then((response) => response.json())
        //         .then((data) => setAnimals(data))
        //         .catch((error) => console.error(error));
        // }, []);
    //this one above sets the values into a list...but the one below doesn't. My example is crude, yes ,
    //but do we not need a list here?

    useEffect(() => {
        setTimeout(() => {
            fetch(url)
                .then(resp => {
                    if (!resp.ok) {
                        console.log( `Bad Response res:${resp.status}`)
                        throw new Error(`HTTP error: ${resp.status}`)
                    }
                    return resp.json()
                })
                .then(data => {
                    setData(data)
                    setIsPending(false)
                    setError(null)
                })
                .catch(err => {
                    console.log( `Catch Happened error:${err.message}`)
                    setError(err.message)
                    setIsPending(false)
                })
        }, 2000);
    }, [url])

    return { data, isPending, error }
}

export default useFetch