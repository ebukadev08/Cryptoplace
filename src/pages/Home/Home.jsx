import React, { useContext, useEffect, useState } from 'react'
import "./Home.css"
import { CoinContext } from '../../assets/context/CoinContext'
import { Link } from 'react-router-dom'

const Home = () => {
 
  const {allCoin, currency} = useContext(CoinContext)
  const [displayCoin,setDisplayCoin] = useState([]);

  const [input, setInput] = useState("");

  const inputHandler = (event)=> {
      setInput(event.target.value)
      if (event.target.value === ""){
        setDisplayCoin(allCoin);
      }
  }
  const searchHandler = async (event)=> {
   event.preventDefault();
   const coins = await allCoin.filter((item)=> {
      return item.name.toLowerCase().includes(input.toLowerCase())
   })
   setDisplayCoin(coins);
  }


  useEffect(()=>{
      setDisplayCoin(allCoin);
  },[allCoin])
  return (
    <div className="Home">
       <div className="hero">
         <h1>largest <br/> Crypto Marketplace</h1>
         <p>Welcome to the world's largest cryptocurrency marketplace. sign up to explore more about cryptos</p>
         <form onSubmit={searchHandler}>

          <input type="text" onChange={inputHandler} list="coinList" value={input} placeholder="search cryptos..." required/>
          <button type="submit">Search</button>

            <datalist id="coinList">
              {allCoin.map((item, index)=>(<option key={index} value={item.name}/>))}
            </datalist>

         </form>
       </div>
       <div className="crypto-table">
            <div className="table-layout">
              <p>#</p>
              <p>Coins</p>
              <p>Price</p>
              <p style={{textAlign: "center"}}>24H Change</p>
              <p className="market-cap">Market Cap</p>
            </div>
             
            {
              displayCoin.slice(0,15).map((item, index)=>(
                <Link to={`./Coin/${item.id}`} className="table-layout" key={index}> 
                <p>{item.market_cap_rank}</p>
                <div> 
                  <img src={item.image} alt=""/>
                  <p style={{cursor: "pointer"}}>{item.name + " - " + item.symbol}</p>
                </div>
                <p>{currency.symbol} {item.current_price.toLocaleString()}</p>
                <p className={item.price_change_percentage_24h>0? "green": "red"}>
                  {Math.floor(item.price_change_percentage_24h*100)/ 100}</p>
                <p className="market-cap">{currency.symbol} {item.market_cap.toLocaleString()}</p>
                </Link>
              ))
            }
       </div>
    </div>
  )
}

export default Home
