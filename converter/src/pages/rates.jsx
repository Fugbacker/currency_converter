import React, {Fragment, useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


const Rates = () => {
  const { rates } = useParams()
  const [selectedOne, setSelectedOne] = useState(rates)
  const [currency, setCurrency] = useState([])
  const [listRates, setListRates] = useState([])

  useEffect(() => {
    const url = `https://api.exchangerate.host/latest?&base=${selectedOne}`
    console.log('URL', url)
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
          <div className="">
            <Listbox value={selectedOne} onChange={setSelectedOne}>
              {({ open }) => (
                <>
                  <Listbox.Label className="font-bold text-sm mb-3 block" htmlFor="text">Choose currency</Listbox.Label>
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
