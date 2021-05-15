import Head from 'next/head'

import {useEffect, useState} from 'react'
import styled from 'styled-components'
import {axiosCryptoClientTel, axiosCryptoClientUSDT, axiosCurrClient} from './api/client'
import {LoadingIcon} from '../components/LoadingIcon'

const Wrapper = styled.div`
  background: url(/castle.jpg);
  width: 100vw;
  height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 5% 10%;
 
`

const Column = styled.div`
  display:flex;
  flex-direction:column;
`

const Row = styled.div`
  display: flex;
  span{
    margin:0 10px;
  }
`
const Profit = styled.span`
  color: ${props => props.isProfit? 'green': 'red'}
`

const Body = styled.div`
  background: white;
  padding: 2%;
  width: fit-content;
  min-width: 400px;
  border-radius: 15px;
  @media screen and (max-width: 600px) {
    min-width: 250px;
  }
`

export default function Home() {
  const [cad,setCad] = useState(0)
  const [us,setUs] = useState(0)
  const [tel,setTel] = useState(0)
  const [teth, setTeth] = useState(0)
  const [ready, setReady] = useState(false)
  const fetchData =async () => {
    try {
      const tels = await axiosCryptoClientTel.get()
      const usdt = await axiosCryptoClientUSDT.get()
      setTel(tels.data.data.quote.USD.price)
      setTeth(usdt.data.data.quote.USD.price)
      const currency = await axiosCurrClient.get()
      setCad(currency.data.USD_CAD)
      setUs(currency.data.CAD_USD)
    } catch (error) {
      console.log(error.response)
    }
  }

  useEffect(()=> {
    fetchData()
  },[])

  useEffect(()=> {
    if(cad && us && teth && tel){
      setReady(true)
    }
  },[tel, teth, us, cad])

  
  const originaInvestment = 1000
  const originalUSInvestment = 793.65
  const telcoinAmount = 9355
  const tethAmount = 400.65
  
  const isProfit =(((telcoinAmount * tel) + (tethAmount * teth))).toFixed(2) > originalUSInvestment
  const profitText = isProfit? "Up": "Down"
  const percent = (((1 - ((((telcoinAmount * tel) + (tethAmount * teth)))) / originalUSInvestment).toFixed(2)) * 100).toFixed(2)


  return (
    <Wrapper >
      <Head>
        <title>Grannys Investments</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Grannys Investments</h1>
      <Body>
     {!ready &&  <LoadingIcon/> }
    
      {ready &&
      <>
      <h3>Orginial Investment: </h3>
       <Column>
          <span>CAD: ${originaInvestment}</span>
          <span>USD: ${originalUSInvestment} - conversion from CAD + deposit fees taken</span>
       </Column>

       <h3>Current Portfolio: </h3>
       <Column>
          <Row>Telcoin: <span> price: {tel.toFixed(3)}</span>  <span> amount: {telcoinAmount}</span> <span>value: ${(telcoinAmount * tel).toFixed(2)}</span></Row>
          <Row>Tether:  <span> price: {teth.toFixed(2)}</span> <span>  amount: {tethAmount}</span> <span>value: ${(tethAmount * teth).toFixed(2)}</span></Row>
       </Column>

       <h3>Current Value:  </h3>
       <h4>Your investment is <Profit isProfit={isProfit}>{profitText} </Profit>{percent}%</h4>
       <Column>
          <Row>CAD:${(((telcoinAmount * tel) + (tethAmount * teth)) * cad ).toFixed(2)}</Row>
          <Row>USD:${(((telcoinAmount * tel) + (tethAmount * teth))).toFixed(2) }</Row>
       </Column>
       </>}
       </Body>
    </Wrapper>
  )
}
