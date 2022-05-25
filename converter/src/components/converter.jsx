import React, {Fragment, useState, useEffect} from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import axios from 'axios'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


function Converter() {
  const [currency, setCurrency] = useState([])
  const [selectedOne, setSelectedOne] = useState('USD')
  console.log('selectedOne', selectedOne)
  const [selectedTwo, setSelectedTwo] = useState('EUR')
  const [fromCurrency, setFromCurrency] = useState('')
  const [amount, setAmount] = useState('')
  const [exchangeRate, setExchangeRate] = useState('')
  const [result, setResult] = useState('')
  console.log('exchangeRate', exchangeRate)

  const onChange = (e) => {
    setAmount(() => e.target.value)
  }


  useEffect(() => {
    const url = `https://api.exchangerate.host/latest?&base=${selectedOne}`
    console.log('URL', url)
    axios(url)
    .then(({ data }) => {
      setCurrency([data.base, ...Object.keys(data.rates)])
      setExchangeRate(data.rates[selectedTwo])
      const count = (Math.round(exchangeRate * amount * 100 ) / 100).toFixed(2)
      setResult(count)
    })


  }, [selectedTwo, selectedOne, amount])

  return (
    <section className="pb-14 pt-14 bg-white px-6 shadow">
      <h1 className="text-black text 2x1 mb-10 font-semibold">Currency converter</h1>
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
              placeholder="Enter amount"
            />
          </div>
          <div className="flex-1">
            <Listbox value={selectedOne} onChange={setSelectedOne}>
              {({ open }) => (
                <>
                  <Listbox.Label className="font-bold text-sm mb-3 block" htmlFor="text">Assigned to</Listbox.Label>
                  <div className="mt-1 relative">
                    <Listbox.Button className="focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 w-full border-2 rounded-sm min-h-50 pl-3 pr-10 py-2">
                      <span className="flex items-center">
                        {/* <img src={selectedOne.avatar} alt="" className="flex-shrink-0 h-6 w-6 rounded-full" /> */}
                        <span className="ml-3 block truncate">{selectedOne}</span>
                      </span>
                      <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
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
          <div className=""
            onClick={() => {
              setSelectedTwo(selectedOne)
              setSelectedOne(selectedTwo)
              const count = (Math.round(exchangeRate * amount * 100 ) / 100).toFixed(2)
              setResult(() => count)
            }}
          >
            <div className="border-2 border-blue-100 rounded-full p-4 cursor-pointer hover:border-orange-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox=" 0 0 17 17"
                aria-hidden="true"
                className="w-4 h-4 text-orange-500 miscellany__StylesIconSwap-sc-1r08bla-1 fZJuOo"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M12.319,5.792L8.836,2.328C8.589,2.08,8.269,2.295,8.269,2.573v1.534C8.115,4.091,7.937,4.084,7.783,4.084c-2.592,0-4.7,2.097-4.7,4.676c0,1.749,0.968,3.337,2.528,4.146c0.352,0.194,0.651-0.257,0.424-0.529c-0.415-0.492-0.643-1.118-0.643-1.762c0-1.514,1.261-2.747,2.787-2.747c0.029,0,0.06,0,0.09,0.002v1.632c0,0.335,0.378,0.435,0.568,0.245l3.483-3.464C12.455,6.147,12.455,5.928,12.319,5.792 M8.938,8.67V7.554c0-0.411-0.528-0.377-0.781-0.377c-1.906,0-3.457,1.542-3.457,3.438c0,0.271,0.033,0.542,0.097,0.805C4.149,10.7,3.775,9.762,3.775,8.76c0-2.197,1.798-3.985,4.008-3.985c0.251,0,0.501,0.023,0.744,0.069c0.212,0.039,0.412-0.124,0.412-0.34v-1.1l2.646,2.633L8.938,8.67z M14.389,7.107c-0.34-0.18-0.662,0.244-0.424,0.529c0.416,0.493,0.644,1.118,0.644,1.762c0,1.515-1.272,2.747-2.798,2.747c-0.029,0-0.061,0-0.089-0.002v-1.631c0-0.354-0.382-0.419-0.558-0.246l-3.482,3.465c-0.136,0.136-0.136,0.355,0,0.49l3.482,3.465c0.189,0.186,0.568,0.096,0.568-0.245v-1.533c0.153,0.016,0.331,0.022,0.484,0.022c2.592,0,4.7-2.098,4.7-4.677C16.917,9.506,15.948,7.917,14.389,7.107 M12.217,15.238c-0.251,0-0.501-0.022-0.743-0.069c-0.212-0.039-0.411,0.125-0.411,0.341v1.101l-2.646-2.634l2.646-2.633v1.116c0,0.174,0.126,0.318,0.295,0.343c0.158,0.024,0.318,0.034,0.486,0.034c1.905,0,3.456-1.542,3.456-3.438c0-0.271-0.032-0.541-0.097-0.804c0.648,0.719,1.022,1.659,1.022,2.66C16.226,13.451,14.428,15.238,12.217,15.238"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
          <div className="flex-1">
            <Listbox value={selectedTwo} onChange={setSelectedTwo}>
              {({ open }) => (
                <>
                  <Listbox.Label className="font-bold text-sm mb-3 block" htmlFor="text">Assigned to</Listbox.Label>
                  <div className="mt-1 relative">
                    <Listbox.Button className="focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 w-full border-2 rounded-sm min-h-50 pl-3 pr-10 py-2">
                      <span className="flex items-center">
                        {/* <img src={selectedTwo} alt="" className="flex-shrink-0 h-6 w-6 rounded-full" /> */}
                        <span className="ml-3 block truncate">{selectedTwo}</span>
                      </span>
                      <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
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
          const count = (Math.round(exchangeRate * amount * 100 ) / 100).toFixed(2)
          setResult(count)
        }}
        >
        Convert
      </button>
      {result &&
      <div className="font-bold text-3xl ">
        {amount && `${result} ${selectedTwo}`}
      </div>}
      </div>
    </section>
  )
}

export default Converter
