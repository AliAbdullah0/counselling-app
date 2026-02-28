import React from 'react'

const AuthLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='flex w-full h-screen'>
        <div className='w-full flex items-center justify-center h-full'>{children}</div>
    </div>
  )
}

export default AuthLayout