// import { redirect } from 'next/navigation'

// const Page = () => {
//   // Disable public sign-up - only admin can create users
//   redirect('/sign-in')
// }

// export default Page

import AuthForm from '@/components/AuthForm'
import React from 'react'

const Page = () => {
  return <AuthForm type="sign-up"/>
}

export default Page