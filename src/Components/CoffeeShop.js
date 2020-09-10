import React, {useEffect, useState} from "react"

const CoffeeShop = (props) => {
    const [coffeeShopData, setCoffeeShopData] = useState(null)
    console.log(props)
    useEffect (()=>{
        fetch (`/coffeeshop/${props.match.params.id}`)
        .then (res => res.json())
        .then (data => {
            console.log(data)
            setCoffeeShopData(data)})
    }, [props.match.id, props.match.params.id])

    if (!coffeeShopData) return <div>loading...</div>
    return (<div>
        {coffeeShopData.address}
    </div>)

}

export default CoffeeShop