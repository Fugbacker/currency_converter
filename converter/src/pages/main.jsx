import React, {Fragment, useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon} from '@heroicons/react/solid'
import axios from 'axios'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


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

  console.log('MAINRATES', mainCurrency)
  const clear = () => {
    setAmount('')
  }

  const onChange = (e) => {
    setAmount(() => e.target.value.replace(/[^.\d]/g,"").replace( /^([^\.]*\.)|\./g, '$1' ))
  }

  useEffect(() => {
    const url = `https://api.exchangerate.host/latest?&base=${selectedOne}`
    console.log('URL', url)
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
                maxlength="12"
                placeholder="Enter amount"
              />
            </div>
            <div className="flex-1">
              <Listbox value={selectedOne} onChange={setSelectedOne}>
                {({ open }) => (
                  <>
                    <Listbox.Label className="font-bold text-sm mb-3 block" htmlFor="text">{from}</Listbox.Label>
                    <div className="mt-1 relative">
                      <Listbox.Button className="focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 w-full border-2 rounded-sm min-h-50 pl-3 pr-10 py-2">
                        <span className="flex items-center">
                          {/* <img src={selectedOne.avatar} alt="" className="flex-shrink-0 h-6 w-6 rounded-full" /> */}
                          <span className="ml-3 block truncate">{selectedOne}</span>
                        </span>
                      </Listbox.Button>
                      <Transition
                        show={open}
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                          {currency.map((it, index) => (
                            <Listbox.Option
                              key={it}
                              className={({ active }) =>
                                classNames(
                                  active ? 'text-white bg-orange-500' : 'text-gray-900',
                                  'cursor-default select-none relative py-2 pl-3 pr-9'
                                )
                              }
                              value={it}
                            >
                              {({ selected, active }) => (
                                <>
                                  <div className="flex items-center">
                                    {/* <img src={person.avatar} alt="" className="flex-shrink-0 h-6 w-6 rounded-full" /> */}
                                    <span
                                      className={classNames(selectedOne ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                    >
                                      {it}
                                    </span>
                                  </div>

                                  {selected ? (
                                    <span
                                      className={classNames(
                                        active ? 'text-white' : 'text-orange-500',
                                        'absolute inset-y-0 right-0 flex items-center pr-4'
                                      )}
                                    >
                                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </>
                )}
              </Listbox>
            </div>
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
            <div className="flex-1">
              <Listbox value={selectedTwo} onChange={setSelectedTwo}>
                {({ open }) => (
                  <>
                    <Listbox.Label className="font-bold text-sm mb-3 block" htmlFor="text">{to}</Listbox.Label>
                    <div className="mt-1 relative">
                      <Listbox.Button className="focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 w-full border-2 rounded-sm min-h-50 pl-3 pr-10 py-2">
                        <span className="flex items-center">
                          {/* <img src={selectedTwo} alt="" className="flex-shrink-0 h-6 w-6 rounded-full" /> */}
                          <span className="ml-3 block truncate">{selectedTwo}</span>
                        </span>
                      </Listbox.Button>

                      <Transition
                        show={open}
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                          {currency.map((item, index) => (
                            <Listbox.Option
                              key={index}
                              className={({ active }) =>
                                classNames(
                                  active ? 'text-white bg-orange-500' : 'text-gray-900',
                                  'cursor-default select-none relative py-2 pl-3 pr-9'
                                )
                              }
                              value={item}
                            >
                              {({ selected, active }) => (
                                <>
                                  <div className="flex items-center">
                                    {/* <img src={item} alt="" className="flex-shrink-0 h-6 w-6 rounded-full" /> */}
                                    <span
                                      className={classNames(selectedTwo ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                    >
                                      {item}
                                    </span>
                                  </div>

                                  {selected ? (
                                    <span
                                      className={classNames(
                                        active ? 'text-white' : 'text-orange-500',
                                        'absolute inset-y-0 right-0 flex items-center pr-4'
                                      )}
                                    >
                                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </>
                )}
              </Listbox>
            </div>
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
