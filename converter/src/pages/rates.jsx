import React, {Fragment, useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'
import RateChooser from '../components/rateChooser'

const Rates = () => {
  const { rates } = useParams()
  const [selectedOne, setSelectedOne] = useState(rates)
  const [currency, setCurrency] = useState([])
  const [listRates, setListRates] = useState([])

  useEffect(() => {
    const url = `https://api.exchangerate.host/latest?&base=${selectedOne}`
    axios(url)
    .then(({ data }) => {
      setCurrency([...Object.keys(data.rates)])
      setListRates(Object.entries(data.rates))
    })
  }, [selectedOne])

  return (
    <div className="max-w-4xl m-auto pb-6 p">
    <section className="pb-14 pt-14 bg-white px-6 shadow">
      <h1 className="text-black font-bold text-3xl mb-10">Rates {selectedOne} to other currency</h1>
      <form >
        <div className=" flex flex-row mb-6 gap-9 items-end">
        <RateChooser selected={selectedOne} setSelected={setSelectedOne} curr={currency}/>
        </div>
      </form>
      <div className="flex justify-between">
        <Link to="/">
          <button className="cursor-pointer inline-flex justify-center py-3 px-5 border border-transparent shadow-sm text-md font-bold rounded-md
          text-white bg-gray-300"
          >
            Back to converter
        </button >
        </Link>
      </div>
      <div className='rateList'>
       {listRates && listRates.map((it, index) => {
         return (
          <div className="rate" key={index}>
            <div className="rateName">{it[0]}</div>
            <div className="rateValue">{it[1]}</div>
          </div>
         )
       })}
      </div>
    </section>
  </div>
  )
}

export default Rates
