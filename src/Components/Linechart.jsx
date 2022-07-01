import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import{Line} from 'react-chartjs-2';
import {Col, Typography, Row} from 'antd';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
function Linechart({coinHistory, coinPrice, coinName}) {
    const coinPriceArray = [];
    const coinTimestampArray = [];

    for (let i = 0; i < coinHistory?.prices?.length; i += 1) {
        coinPriceArray.push(coinHistory?.prices[i][1]);
    }

    for (let i = 0; i < coinHistory?.prices?.length; i += 1) {
        coinTimestampArray.push(new Date(coinHistory?.prices[i][0]).toLocaleDateString());
    }
    const data = {
        labels:coinTimestampArray,
        datasets: [
          {
            label: 'Price In USD',
            data: coinPriceArray,
            fill: false,
            backgroundColor: '#0071bd',
            borderColor: '#0071bd',
          },
        ],
      };
    
      const options = {
        responsive: true,
      };
    
      return (
        <>
          <Row className="chart-header">
            <Typography.Title level={2} className="chart-title">{coinName} Price Chart </Typography.Title>
            <Col className="price-container">
              
              <Typography.Title level={5} className="current-price">Current {coinName} Price: $ {coinPrice}</Typography.Title>
            </Col>
          </Row>
          <Line data={data} options={options} />
        </>
      )
}

export default Linechart