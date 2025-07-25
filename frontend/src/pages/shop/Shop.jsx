import React from "react";
import { Link } from "react-router-dom";

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
                }catch(err){
                    return setError(err)
                }finally {
                setLoading(false)
             }
            }
            getItems()
    }, [])
    
    const allItems = items.map(item => (
         <div key={item.id} className="item">
            <Link to={item.id.toString()}>
                    <h3>{ item.name }</h3>
                    <img src={`http://localhost:5003${item.imageUrl}`} alt="item image here" width="50px" />
                    <p>{ item.description }</p>
                    <p>{ item.brand }</p>
                    <p>{ item.quantity}</p>
             </Link>
        </div>
    ))

    if(loading){
        return <h1>Loading...</h1>
    }
    if(error){
        return <h1>There was a error: {error}</h1>
    }
    try{
    return items ? <div className="items">{ allItems }</div> : <h1>No item</h1>
}catch(err){
    return console.log(err)
}
}