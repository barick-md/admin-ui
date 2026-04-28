import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='min-h-screen bg-neutral-800 flex flex-col items-center justify-center text-center'>
        <div className='flex items-center justify-center space-x-8 mb-12'>
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="w-24 h-24" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="w-24 h-24 animate-spin" alt="React logo" />
          </a>
        </div>
        <h1 className='text-white text-6xl font-bold'>Vite + React</h1>
        <h3 className='text-white mb-16 font-poppins'>Barick Muhammad Dziellan</h3>
        <div className="text-sm space-y-6 mb-8">
          <button onClick={() => setCount((count) => count + 1)} className='bg-neutral-900 text-white py-2 px-6 rounded-lg text-lg'>
            count is {count}
          </button>
          <p className='text-neutral-400'>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
        </div>
        <p className="text-primary">
          Lorem ipsum dolor sit, amet consectetur
          adipisicing elit. Illum perferendis dolores provident debitis,
          necessitatibus ullam, quibusdam dolore cumque velit, molestias
          recusandae exercitationem pariatur. Quas ullam aliquid ea. Repellat,
          exercitationem similique!
        </p>
      </div> 
    </>
  )
}

export default App
