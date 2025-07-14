import React from "react";

export default function Shop(){
    const [ items, setItems ] = React.useState()
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)

    React.useEffect(() => {
            async function getItems(){
                setLoading(true)
                try{
                const response = await fetch("http://localhost:5003/shop/")
                const data = await response.json()
                setItems(data)
                console.log(data)
                }catch(err){
                    return setError(err)
                }
            }
            getItems()
    }, [])

    if(loading){
        <h1>Loading...</h1>
    }
    if(error){
        <h1>There was a error {error}</h1>
    }
    return console.log(items)
}