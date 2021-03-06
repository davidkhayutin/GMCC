import Head from 'next/head'

import {useEffect, useState} from 'react'
import styled from 'styled-components'
import {axiosCryptoClientTel, axiosCryptoClientUSDT, axiosCurrClient} from './api/client'
import {LoadingIcon} from '../components/LoadingIcon'

import {telFunc, usdtFunc, currencyFunc} from './api/route'
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

const Amount = styled.span`
  font-weight: bolder
`

export default function Home({telcoin, tether, canada, united}) {
  const [cad,setCad] = useState(canada)
  const [us,setUs] = useState(united)
  const [tel,setTel] = useState(telcoin)
  const [teth, setTeth] = useState(tether)
  const [ready, setReady] = useState(false)

  
  useEffect(()=> {
    if(cad && us && teth && tel){
      setReady(true)
    }
  },[tel, teth, us, cad])

  
  const originaInvestment = 1000
  const originalUSInvestment = 793.65
  const telcoinAmount = 19881
  const tethAmount = 400
  
  const isProfit =((telcoinAmount * tel)).toFixed(2) > originalUSInvestment
  const profitText = isProfit? "Up": "Down"
  const percentPlus = ((1 - (originalUSInvestment/(telcoinAmount * tel))) * 100).toFixed(2)
  const percent = isProfit? percentPlus: ((1 - ((telcoinAmount * tel) / originalUSInvestment)) * 100).toFixed(2)

  console.log(percentPlus)
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
          {/* <Row>Tether:  <span> price: {teth.toFixed(2)}</span> <span>  amount: {tethAmount}</span> <span>value: ${(tethAmount * teth).toFixed(2)}</span></Row> */}
       </Column>

       <h3>Current Value:  </h3>
       <h4>Your investment is <Profit isProfit={isProfit}>{profitText} </Profit>{percent}%</h4>
       <Column>
          <Row>CAD: <Amount>${(((telcoinAmount * tel) ) * cad ).toFixed(2)}</Amount></Row>
          <Row>USD:<Amount>${(telcoinAmount * tel ).toFixed(2)}</Amount></Row>

       </Column>
       </>}
       </Body>
    </Wrapper>
  )
}


Home.getInitialProps = async (ctx) => {

  try {
    const tels = await telFunc()
    const usdt = await usdtFunc()
    const currency = await currencyFunc()
    return { telcoin : tels.data.data.quote.USD.price, tether: usdt.data.data.quote.USD.price,canada:currency.data.USD_CAD , united: currency.data.CAD_USD}

  } catch (error) {
      console.log(error)
  }

}