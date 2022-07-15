import React from 'react'
import FormCreate from './components/FormCreate'
import Header from './components/Header'

function App() {
  return (
    <>
      <Header/>
      <br/>
      <div className='container'>
      <FormCreate/>
      </div>
    </>
  )
}

export default App