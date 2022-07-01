import React from 'react';
import News from './News';
import CryptoCurrencies from './CryptoCurrencies'
import {Typography ,Row, Col, Statistic} from 'antd'
import { Link } from 'react-router-dom';
import millify from 'millify';
import {useGetCryptoStatsQuery} from '../services/index';
import Loader from './Loader';
const { Title } = Typography;

function Homepage() {
  const {data, isFetching} = useGetCryptoStatsQuery();
  if(isFetching) return <Loader/>;
  const activecoins=data?data.data.active_cryptocurrencies:0;
  const exchanges=data?data.data.markets:0;
  const tmv=data?data.data.total_volume.usd:0;
  const tmc=data?data.data.total_market_cap.usd:0;
  const btcd=data?data.data.market_cap_percentage.btc:0;
  return (
    <>
      <Title level={2} className='heading'>Global Crypto Stats</Title>
      <Row>
        <Col span={12}><Statistic title="Total CryptoCurrencies" value={activecoins}></Statistic></Col>
        <Col span={12}><Statistic title="Total Exchanges" value={exchanges}></Statistic></Col>
        <Col span={12}><Statistic title="Total Market Cap" value={millify(tmc)}></Statistic></Col>
        <Col span={12}><Statistic title="Total 24h Volume" value={millify(tmv)}></Statistic></Col>
        <Col span={12}><Statistic title="BTC Dominance" value={millify(btcd)}></Statistic></Col>
      </Row>
      <div className='home-heading-container'>
        <Title level={2} className='home-title'>Top 10 cryptocurrencies in the world</Title>
        <Title level={3} className='show-more'><Link to='/cryptocurrencies'>Show More</Link></Title>
      </div>
      <CryptoCurrencies simplified/>
      <div className='home-heading-container'>
        <Title level={2} className='home-title'>Latest in the Cryto News</Title>
        <Title level={3} className='show-more'><Link to='/news'>Show More</Link></Title>
      </div>
      <News simplified/>
    </>
  )
}

export default Homepage