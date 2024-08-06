import React from 'react'
import { redirect } from 'next/navigation';

import { auth } from '../../../../auth';
import RegisterForm from './Form';
// import { RegisterForm } from './Form';

const page = async () => {
  const session = await auth()

  // if (session) {
  //   redirect("/");
  // }

  return (
    <section className='container flex items-center justify-center py-12'>
        <div className='w-[500px]'>
            <RegisterForm/>
        </div>
    </section>
  )
}

export default page