"use client"
import { useState } from 'react'

import Result from './Result'
import type { DocumentData } from './api/route'

export default function Home() {
  const [ input, setIntput ] = useState<string>('')
  const [ data, setData ] = useState<DocumentData|null>(null)

  async function handleSubmit() {
    try {
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
    }
    
  }

  return (
    <main>
      <h1>URL shortener</h1>
      <div>
        <label htmlFor="shorten"></label>
        <input type="text" name="shorten" placeholder="paste the URL here..." value={input} onChange={(e) => setIntput(e.currentTarget.value)}/>        
        <button onClick={handleSubmit}>
          Create
        </button>
      </div>
      <Result data={data}/>
    </main>
  )
}
