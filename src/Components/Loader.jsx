import React from 'react'
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
const antIcon = (
  <LoadingOutlined
  style={{
    fontSize: 24,
  }}
    spin
  />
);

function Loader() {
  return (
    <div className='loader'>
        <Spin indicator={antIcon}/>
    </div>
    
  )
}

export default Loader