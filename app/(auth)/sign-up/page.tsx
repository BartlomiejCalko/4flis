import { redirect } from 'next/navigation'

const Page = () => {
  // Disable public sign-up - only admin can create users
  redirect('/sign-in')
}

export default Page