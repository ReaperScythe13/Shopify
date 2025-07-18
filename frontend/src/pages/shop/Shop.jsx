import React from "react";


export default function Shop(){
    const [ items, setItems ] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)

    React.useEffect(() => {
            async function getItems(){
                setLoading(true)
                try{
                const response = await fetch("http://localhost:5003/shop/")
                const data = await response.json()
                setItems(data.items)
                console.log(data)
                }catch(err){
                    return setError(err)
                }
            }
            getItems()
    }, [])
    
    const allItems = items.map(item => (
         <div key={item.id} className="item">
                    <h3>{ item.name }</h3>
                    <img src={`http://localhost:5003${item.imageUrl}`} alt="item image here" width="50px" />
                    <p>{ item.description }</p>
                    <p>{ item.brand }</p>
                    <p>{ item.quantity}</p>
                </div>
    ))

    if(loading){
        <h1>Loading...</h1>
    }
    if(error){
        <h1>There was a error {error}</h1>
    }
    try{
    return items ? <div className="items">{ allItems }</div> : <h1>No items</h1>
}catch(err){
    return console.log(err)
}
}