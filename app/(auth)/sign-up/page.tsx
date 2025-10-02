import { redirect } from 'next/navigation'
import React from 'react'

const Page = () => {
  // Disable public sign-up - only admin can create users
  redirect('/sign-in')
}

export default Page