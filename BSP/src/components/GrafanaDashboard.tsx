// components/GrafanaDashboard.js
import React from 'react';

const GrafanaDashboard = ({ dashboardUrl, height = '600px' }:{dashboardUrl:string,height?:string}) => {
  const url=process.env.NEXT_PUBLIC_GRAFANA_URL !
  return (
    <iframe
      src={url}
      width="100%"
      height="100%"
      frameBorder="0"
      className='border-solid border-2 border-dc3  rounded-md'
    ></iframe>
  );
};

export default GrafanaDashboard;