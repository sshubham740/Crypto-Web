import React, {useState} from 'react'
import {Row, Col, Input, Card} from 'antd'
import { Link } from 'react-router-dom';
import millify from 'millify';
import {useGetCryptoCoinsQuery} from '../services/index';
import { useEffect } from 'react';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import Loader from './Loader';

const CryptoCurrencies=({simplified})=> {
  const count=simplified?10:100

  const {data: cryptoList, isFetching}=useGetCryptoCoinsQuery(count);
  const [cryptos,setCryptos]=useState([]);
  const [searchItem, setSearchItem]=useState('');

  useEffect(() => {
    const filteredItem=cryptoList?.filter((coin)=> coin.id.includes(searchItem.toLowerCase()))
    setCryptos(filteredItem);
  
  }, [cryptoList,searchItem]);
  if(isFetching) return <Loader/>;
  
  return (
    <>
    {!simplified && (
      <div className='search-crypto'>
        <Input placeholder='Search...' onChange={e=>(setSearchItem(e.target.value))}/>
      </div>
    )}
      <Row gutter={[32,32]} className='crypto-card-container'>
        {cryptos?.map((currency)=>(
          <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.id}>
            <Link to={`/coin/${currency.id}`}>
              <Card 
              title={`${currency.market_cap_rank}. ${currency.name}`}
              extra={<img className='crypto-image' alt='cryptoimage' src={currency.image}/>}
              hoverable
              >
                <p>Price: {currency.current_price}$</p>
                <p>Market Cap: {millify(currency.market_cap)}$</p>
                <p>Daily Change: {currency.market_cap_change_percentage_24h}%</p>
                <Sparklines data={currency?.sparkline_in_7d?.price} width={100} height={30} margin={5} >
                {currency?.sparkline_in_7d?.price[0]<currency?.sparkline_in_7d?.price[currency?.sparkline_in_7d?.price.length-1]?<SparklinesLine color="green" />:<SparklinesLine color="red" />}
                </Sparklines>
              </Card>
            </Link>

          </Col>
        ))}
      </Row>
    </>
  )
}

export default CryptoCurrencies