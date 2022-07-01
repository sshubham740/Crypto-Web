import './App.css';
import {Routes, Route} from 'react-router-dom'
import Sidebar from './Components/Sidebar';
import Exchanges from './Components/Exchanges';
import CryptoCurrencies from './Components/CryptoCurrencies';
import News from './Components/News';
import Homepage from './Components/Homepage';
import CoinDetails from './Components/CoinDetails';
import { Layout, Space, Typography} from 'antd';

function App() {
  return (
    <div className="App">
      <div className='sidebar'>
        <Sidebar/>
      </div>

      <div className='main'>
        <Layout>
          <div className='routes'>
            <Routes>
              <Route exact path='/exchanges' element={<Exchanges/>}/>
              <Route exact path='/cryptocurrencies' element={<CryptoCurrencies/>}/>
              <Route exact path='/news' element={<News/>}/>
              <Route exact path='/' element={<Homepage/>}/>
              <Route exact path='/coin/:coinId' element={<CoinDetails/>}/>
            </Routes>
          </div>
          
        </Layout>
      

        <div className='footer' >
          <Typography.Title level={5} style={{color:'white', textAlign:'center'}}>
            CryptoWeb <br/> All rights reserved.
          </Typography.Title>
          <Space>

          </Space>
        </div>
      </div>
    </div>
  );
}

export default App;
