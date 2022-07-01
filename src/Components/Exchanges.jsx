import React from 'react';
import {Collapse, Col, Row, Typography, Avatar} from 'antd';
import HTMLReactParser from 'html-react-parser';
import { useGetCryptoExchangesQuery } from '../services'
import Loader from './Loader';
import millify from 'millify';

const{Panel}=Collapse;
const {Text, Title}= Typography;

function Exchanges() {
  const {data, isFetching}=useGetCryptoExchangesQuery()
  if(isFetching) return <Loader/>;
  
  return (
    <>
    <Title>Top Cryptocurrency Exchanges around the world</Title>
      <Row>
        <Col span={8}>Exchanges</Col>
        <Col span={8}>24h Trade Volume(BTC)</Col>
        <Col span={8}>Year Established</Col>
      </Row>
      <Row>
        {data?.map((exchange) => (
          <Col span={24}>
            <Collapse>
              <Panel
                key={exchange.id}
                showArrow={false}
                header={(
                  <Row key={exchange.id}>
                    <Col style={{width:'24.6vw'}}>
                      <Text><strong>{exchange.trust_score_rank}.</strong></Text>
                      <Avatar className="exchange-image" src={exchange.image} />
                      <Text><strong>{exchange.name}</strong></Text>
                    </Col>
                    <Col style={{width:'25.6vw'}}>{millify(exchange.trade_volume_24h_btc)} BTC</Col>
                    <Col style={{width:'16.7vw'}}>{exchange.year_established?exchange.year_established:'--'}</Col>
                  </Row>
                  )}
              >
                {HTMLReactParser(exchange.description || '')}
                 Visit <a href={exchange.url}>{exchange.url}</a> for more information
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Exchanges