import React from 'react'
import { auth } from '../auth';
import Navbar from '@/components/Navbar';
import GrafanaDashboard from '@/components/GrafanaDashboard';

const page =async () => {
  const session = await auth();
  const grafanaUrl = process.env.NEXT_PUBLIC_GRAFANA_URL || 'http://localhost:3000';
  const dashboardUid = '14aa7d0dbe8c4ad5bf309aaa22d1216a';
  const dashboardUrl = `${grafanaUrl}/public-dashboards/${dashboardUid}?orgId=1&kiosk`;
  return (
    <>
    <section className="flex flex-col h-screen bg-dc2 px-1 py-1   " >
        <Navbar />
        <div className="h-full pt-1">
      {/* <h1>My Dashboard</h1> */}
      <GrafanaDashboard dashboardUrl={dashboardUrl} />
    </div>
     
    </section>
    </>
    // <Navbar/>
  )
}

export default page