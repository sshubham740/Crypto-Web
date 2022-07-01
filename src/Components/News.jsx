import React, {useState} from 'react'
import {Select, Typography ,Row, Col, Avatar, Card} from 'antd'
import moment from 'moment';
import {useGetCryptoNewsQuery, useGetCryptoCoinsQuery} from '../services/index'
import Loader from './Loader';
const {Text, Title} = Typography;
const {Option}=Select

function News({simplified}) {
  const count=simplified?6:24
  const [search,setSearch]=useState('Cryptocurrency');
  const {data: cryptoNews, isFetching}=useGetCryptoNewsQuery({search, count});
  const {data}=useGetCryptoCoinsQuery(100);
  
  if(isFetching) return <Loader/>;
  return (
    <Row gutter={[24,24]}>
      {!simplified && (
        <Col span={24}>
          <Select 
            showSearch 
            className='select-news' 
            placeholder='Select a coin to get news for...' 
            optionFilterProp='children'
            onChange={(value)=>setSearch(value)}
            filterOption={(input,option)=>option.children.toLowerCase().indexOf(input.toLowerCase())}
            >
            <Option value="Cryptocurrency">All Cryptos</Option>
            {data.map((coin)=>(<Option key={coin.name} value={coin.name}>{coin.name}</Option>))}
          </Select>
        </Col>
      )}
      {cryptoNews.value.map((news,i)=>(
        <Col xs={24} sm={12} lg={8} key={i}>
        
          <Card
            className='news-card' 
            hoverable
          >
            <a href={news.url} target='_blank' rel='noreferrer'>
              <div className='news-image-container'>
                <Title className='news-title' level={4}>{news.name}</Title>
                <img style={{maxWidth:'200px', maxHeight: '100px'}}src={news?.image?.thumbnail?.contentUrl} alt="news" />
              </div>
              <p>{news.description>100?`${news.description.substring(0,100)}...`:news.description}</p>
              <div className='provider-container'>
                <div>
                  <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl} alt='provider'/>
                  <Text className='provider-name'>{news.provider[0]?.name}</Text>
                </div>
                <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
              </div>
            </a>  
          </Card>
        
        </Col>
      ))}

    </Row>
  )
}

export default News