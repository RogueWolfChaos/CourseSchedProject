import { useState, useEffect } from 'react'

function useFetch(url) {

    const [data, setData] = useState(null)

    const [isPending, setIsPending] = useState(true)

    const [error, setError] = useState(null)

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