"use client"
import { downloadJsonfile, downloadRegionwisePicklefile } from '@/actions/sensor.action'
import { Button } from '@/components/ui/button'
import React from 'react'

const page = () => {
  return (
    <div className="flex h-full flex-col gap-3 justify-center items-center w-full border-solid border-2 border-dc3  rounded-md ">
      <Button
        className="bg-[#AF8F6F] hover:bg-dc3  text-white font-bold py-2 px-4 rounded-full shadow-md"
        onClick={async () => {
          console.log("downloadJsonfile button clicked");
  
          await downloadJsonfile().then((data) => {
            if (data) {
              // const jsondata = JSON.parse(data.data)
  
              const blob = new Blob([data], { type: 'application/json' });
              const downloadUrl = URL.createObjectURL(blob);
              const downloadLink = document.createElement('a');
              downloadLink.href = downloadUrl;
              downloadLink.download = 'data.json';
              document.body.appendChild(downloadLink);
              downloadLink.click();
              document.body.removeChild(downloadLink);
            }
          });
        }}
      >
        Download Json.file
      </Button>
      <Button
        className="bg-[#AF8F6F] hover:bg-dc3  text-white font-bold py-2 px-4 rounded-full shadow-md"
        onClick={async () => {
          console.log("downloadRegionwisePicklefile button clicked");
          await downloadRegionwisePicklefile().then((data) => {
            if (data) {
              // const jsondata = JSON.parse(data.data)
  
              const blob = new Blob([data], { type: 'application/json' });
              const downloadUrl = URL.createObjectURL(blob);
              const downloadLink = document.createElement('a');
              downloadLink.href = downloadUrl;
              downloadLink.download = 'regionwise_columns.json';
              document.body.appendChild(downloadLink);
              downloadLink.click();
              document.body.removeChild(downloadLink);
            }
          });
        }}
      >
        Download Regionwise Pickle.file
      </Button>
    </div>
  );
  
}

export default page