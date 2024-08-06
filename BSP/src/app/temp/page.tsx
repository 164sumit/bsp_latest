// "use client"
import React from 'react'
import { auth } from '../../auth';
import MobileSidebar from '@/components/MobileSidebar';
import SensorDataTable from '@/components/SensorDataTable';
import SensorTable from '@/components/SensorTable';
// import { auth } from './auth';

const page =async () => {
  const session = await auth();
  return (
    // <MobileSidebar/>
    <>
    <SensorDataTable/>
    <>
    <h1>table 2nd</h1></>
    <SensorTable/>
    </>
  )
}

export default page