"use client"
import { useState, useEffect, useRef, FormEvent } from 'react'

import Result from './Result'
import type { DocumentData } from './api/route'

import { isValidUrl } from '@/helper'

export interface FetchTypes {
  type: string;
  data: DocumentData
}

export default function Home() {
  const [ canCopy, setCanCopy ] = useState<boolean>(true)
  const [ input, setIntput ] = useState<string>('')
  const [ data, setData ] = useState<FetchTypes|null>(null)
  const [ disableBtn, setDisableBtn ] = useState<boolean>(true)
  const inputRef = useRef<HTMLInputElement>(null)  

  useEffect(() => {
    if (input.length === 0) {
      setDisableBtn(true)
      return;
    }
    const valid = isValidUrl(input)
    if (inputRef.current) {
      if (valid) {
        inputRef.current.style.backgroundColor = "rgb(229, 231, 235)"
        disableBtn && setDisableBtn(false)
      } else {        
        inputRef.current.style.backgroundColor = "rgb(252, 165, 165)"
        !disableBtn && setDisableBtn(true)
      }
    }
      
  }, [input])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    
    try {
      setDisableBtn(true)
      const response = await fetch('/api/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',          
        },
        body: JSON.stringify({
          data: input
        })
      })
      if (!response.ok) {
        throw new Error('something went wrong')
      }
      const data = await response.json()
      setData({...data})
      setIntput('')
    } catch (error) {
      console.error('Error in fetching data', error)
    } finally {
      setDisableBtn(false)
      setCanCopy(true)
    }
    
  }

  return (
    <main className='container flex flex-col m-4'>
      <h1 className='text-2xl font-bold mx-auto mb-12'>URL SHORTENER</h1>
      <div className='mx-auto max-w-[500px] mb-10'>
        <form onSubmit={(e) =>handleSubmit(e)}>
        <label htmlFor="shorten"></label>
        <input 
          type="text" 
          name="shorten"
          placeholder="paste the URL here..." 
          value={input} 
          onChange={(e) => setIntput(e.currentTarget.value)}
          className='bg-gray-200 px-2 py-1 me-2 rounded-md shadow-md  focus:bg-gray-300 transition-all duration-200'
          ref={inputRef}
        />        
        <input type='submit' value="Create" disabled={disableBtn}
          className='bg-green-400 px-2 py-1 rounded-md shadow-md drop-shadow-md hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-50 cursor-pointer'
        />          
        
        </form>
        
      </div>
      <Result data={data} canCopy={canCopy} setCanCopy={setCanCopy}/>
    </main>
  )
}
