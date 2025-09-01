import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'

const Success = () => {
  const location = useLocation()
  
  useEffect(() => {
    const processOnlinePayment = async () => {
      const urlParams = new URLSearchParams(window.location.search)
      const sessionId = urlParams.get('session_id')
      
      console.log('Success page - Session ID:', sessionId)
      console.log('Full URL:', window.location.href)
      
      if (sessionId) {
        try {
          console.log('Calling processOnlineOrder API with sessionId:', sessionId)
          const response = await Axios({
            ...SummaryApi.processOnlineOrder,
            data: { sessionId }
          })
          console.log('Process order response:', response.data)
          
          if (response.data.success) {
            console.log('Order processed successfully!')
          } else {
            console.error('Order processing failed:', response.data.message)
          }
        } catch (error) {
          console.error('Error processing online order:', error)
          console.error('Error details:', error.response?.data)
        }
      } else {
        console.log('No session_id found in URL parameters')
      }
    }
    
    processOnlinePayment()
  }, [])
    
  console.log("location:", location)  
  return (
    <div className='m-2 w-full max-w-md bg-green-200 p-4 py-5 rounded mx-auto flex flex-col justify-center items-center gap-5'>
        <p className='text-green-800 font-bold text-lg text-center'>{Boolean(location?.state?.text) ? location?.state?.text : "Payment" } Successfully</p>
        <Link to="/" className="border border-green-900 text-green-900 hover:bg-green-900 hover:text-white transition-all px-4 py-1">Go To Home</Link>
    </div>
  )
}

export default Success
