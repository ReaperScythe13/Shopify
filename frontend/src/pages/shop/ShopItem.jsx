import React from "react";
import { Link, useParams, useLocation } from "react-router-dom";

export default function ShopItem(){
    const [item, setItem] = React.useState({})
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)
    const { id } = useParams()
    const location = useLocation()


    const url = `http://localhost:5003/shop/${id}`
    React.useEffect(()=>{
        async function getItem(){
            setLoading(true)
            try{
                const response = await fetch(url)
                const data = await response.json()
                setItem(data)
            }catch(err){
                return setError(err)
            }finally {
                setLoading(false)
            }
        }
        getItem()
    }, [])

    const search = location.state?.search || ""

    const product = ( 
                     item.message ? <h1>{item.message}</h1> :
                        <div className="product">
                            <h3>{ item.name }</h3>
                            <img src={`http://localhost:5003${item.imageUrl}`} alt="item image here" width="50px" />
                            <p>{ item.description }</p>
                            <p>{ item.brand }</p>
                            <p>{ item.quantity}</p>
                        </div>
                )
                console.log(product)
     if(loading){
        return <h1>Loading...</h1>
    }
     if(error){
        return <h1>There was a error {error}</h1>
    }
    try{
        return item && <div className="productContainer">
                                <Link
                                        to={`..${search}`}
                                        relative="path"
                                        className="back-button"
                                    >&larr; <span>Back to items</span>
                                </Link> 
                                { product } 
                        </div>
    }catch(err){
        return console.log(err)
    }

}