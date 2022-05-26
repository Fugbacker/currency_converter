import React, {Fragment, useState, useEffect} from 'react'
import RateChooser from '../components/rateChooser'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Main() {
  const [currency, setCurrency] = useState([])
  const [selectedOne, setSelectedOne] = useState('USD')
  const [selectedTwo, setSelectedTwo] = useState('EUR')
  const [from, setFrom] = useState('From')
  const [to, setTo] = useState('To')
  const [amount, setAmount] = useState('')
  const [mainCurrency, setMainCurrency] = useState('USD')
  const [exchangeRate, setExchangeRate] = useState('')
  const [result, setResult] = useState('')

  const clear = () => {
    setAmount('')
  }

  const onChange = (e) => {
    setAmount(() => e.target.value.replace(/[^.\d]/g,"").replace( /^([^\.]*\.)|\./g, '$1' ))
  }

  // const uniqueKey = () => (+new Date() + Math.random())
  // const uniqueKey2 = () => (+new Date() +  Math.random())

  useEffect(() => {
    const url = `https://api.exchangerate.host/latest?&base=${selectedOne}`
    axios(url)
    .then(({ data }) => {
      setCurrency([data.base, ...Object.keys(data.rates)])
      setExchangeRate(data.rates[selectedTwo])
      const count = (Math.round(exchangeRate * amount * 100 ) / 100).toFixed(4)
      setResult(count)
    })
  }, [selectedTwo, selectedOne, amount, exchangeRate])

  useEffect(() => {
    setMainCurrency(selectedTwo)
  },[selectedTwo])

  useEffect(() => {
    setMainCurrency(selectedOne)
  },[selectedOne])

  return (
    <div className="max-w-4xl m-auto pb-6 p">
      <section className="pb-14 pt-14 bg-white px-6 shadow">
        <h1 className="text-black font-bold text-3xl mb-10 flex justify-center">Currency converter</h1>
        <form >
          <div className=" flex flex-row mb-6 gap-9 items-end">
            <div className="flex-1">
              <label className="font-bold text-sm mb-3 block" htmlFor="text">
                Amount
              </label>
              <input
                type="text"
                className="focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 w-full border-2 rounded-sm min-h-50 pl-3 pr-10 py-2"
                value={amount}
                onChange={onChange}
                size="lg"
                maxLength="12"
                placeholder="Enter amount"
              />
            </div>
            <RateChooser selected={selectedOne} setSelected={setSelectedOne} curr={currency} fromSide={from} toSide={to} />
            <div className="changeRateButton"
              onClick={() => {
                setSelectedTwo(selectedOne)
                setSelectedOne(selectedTwo)
                setFrom(to)
                setTo(from)
                const count = (Math.round(exchangeRate * amount * 100 ) / 100).toFixed(2)
                setResult(() => count)
              }}
            >
              <div className="imageButton"></div>
            </div>
            <RateChooser selected={selectedTwo} setSelected={setSelectedTwo} curr={currency} fromSide={to} toSide={from} />
          </div>
        </form>
        <div className="flex justify-between">
          <button
            className="cursor-pointer inline-flex justify-center py-3 px-5 border border-transparent shadow-sm text-md font-bold rounded-md
            text-white bg-gray-300"
            onClick={() => {
              clear()
            }}
            >
            Clear
          </button>
          {result &&
          <div className="font-bold text-3xl ">
            {amount && `${result} ${selectedTwo}`}
          </div>}
          {amount &&
            <Link to={`/${mainCurrency}`}>
              <button className="cursor-pointer inline-flex justify-center py-3 px-5 border border-transparent shadow-sm text-md font-bold rounded-md
                text-white bg-gray-300"
                >
                  View Rates list
              </button >
            </Link>}
        </div>
      </section>
    </div>
  )
}

export default Main
