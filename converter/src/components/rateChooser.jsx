import React, {Fragment, useState, useEffect} from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon} from '@heroicons/react/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const RateChooser = ({ selected, setSelected, curr, fromSide, toSide, uk}) => {
  const to = toSide
  const from = fromSide
  const currency = curr
  const selectedOne = selected
  const setSelectedOne = setSelected
  const unikey = uk

  return (
    <div className="flex-1">
    <Listbox value={selectedOne} onChange={setSelectedOne}>
      {({ open }) => (
        <>
          <Listbox.Label className="font-bold text-sm mb-3 block" htmlFor="text">{from}</Listbox.Label>
          <div className="mt-1 relative">
            <Listbox.Button className="focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 w-full border-2 rounded-sm min-h-50 pl-3 pr-10 py-2">
              <span className="flex items-center">
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
                    key={index}
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
  )
}

export default RateChooser
