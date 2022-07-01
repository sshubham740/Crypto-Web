import React, {useState} from 'react'
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import {Col, Typography,Radio} from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined,ExclamationCircleOutlined, TrophyOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { useGetCryptoChartQuery, useGetCryptoDetailsQuery} from '../services/index';
import Linechart from './Linechart';
import Loader from './Loader';
const {Title, Text}=Typography;
function CoinDetails() {
  const {coinId}=useParams();
  const [days,setDays]=useState('1');
  const {data:marketChart,isFetching:chartFetching}=useGetCryptoChartQuery({coinId,days});
  const {data:coinDetails,isFetching:detailFetching}=useGetCryptoDetailsQuery(coinId);
  if(detailFetching) return <Loader/>;
  if(chartFetching) return <Loader/>;

  const time = [
                {label:'24h',value:'1'},
                {label:'7d', value:'7'},
                {label:'30d', value:'30'},
                {label:'3m', value:'90'},
                {label:'1y', value:'365'},
                {label:'max', value:'max'}
              ];

  const stats = [
    { title: 'Price in USD', value: `$ ${coinDetails.market_data.current_price.usd}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: coinDetails.market_cap_rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${millify(coinDetails.market_data.total_volume.usd)}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${millify(coinDetails.market_data.market_cap.usd)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${millify(coinDetails.market_data.ath.usd)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Exchanges', value: coinDetails.tickers.length, icon: <MoneyCollectOutlined /> },
    { title: 'Max. Supply', value: `$ ${coinDetails.market_data.max_supply?millify(coinDetails.market_data.max_supply):'--'}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${coinDetails.market_data.total_supply?millify(coinDetails.market_data.total_supply):'--'}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${coinDetails.market_data.circulating_supply?millify(coinDetails.market_data.circulating_supply):'--'}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Hashing Algorithm', value: `${coinDetails.hashing_algorithm!==null?coinDetails.hashing_algorithm:'--'}`, icon: <ExclamationCircleOutlined /> },

  ];

  return (
    <Col className='coin-detail-container'>
      <Col className="coin-heading-container">
        <Title level={2} className="coin-name">
          {coinDetails?.name}
        </Title>
        <p>{HTMLReactParser(coinDetails.description.en)}</p>
      </Col>
      <Col className='stats-container'>
        <Col className='coin-value-statistics'>
          <Col className='coin-value-statistics-heading'>
            <Title level={3} className='coin-details-heading'>{coinDetails.name} Value Statistics</Title>
            <p>An overview showing the statistics of {coinDetails.name}, such as the current price, the rank, and trading volume.</p>
          </Col>
          {stats.map(({ icon, title, value }) => (
            <Col className="coin-stats" key={title}>
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">Other Stats Info</Title>
            <p>An overview showing the general statistics of {coinDetails.name}, such as the total supply, circulating supply etc.</p>
          </Col>
          {genericStats.map(({ icon, title, value }) => (
            <Col className="coin-stats" key={title}>
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
      <Radio.Group
        style={{float:'right'}}
        options={time}
        onChange={e=>(setDays(e.target.value))}
        value={days}
        optionType="button"
        buttonStyle="solid"
      />
      <br/>
      <Linechart coinHistory={marketChart} coinPrice={coinDetails.market_data.current_price.usd} coinName={coinDetails.name}/>

    </Col>
    
  )
}

export default CoinDetails