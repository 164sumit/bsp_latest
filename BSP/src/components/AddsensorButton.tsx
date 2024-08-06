// "use client"
// import React from 'react'
// import { Button } from './ui/button'
// import { SensorWeights, addSensorToRegions, deleteSensorFromRegions, downloadJsonfile, downloadRegionwisePicklefile, getSensorData, modifyWeightOfSensors } from '@/actions/sensor.action'
// import { addRegionsToDatabase, findsensorbyRegion, getRegionsForSensorId, getRegionsensors } from '@/actions/region.action'


// const AddsensorButton = () => {
//   return (
//     <div>

//       <Button onClick={async () => {
//         console.log("getRegionsensors button clicked")
//         await getRegionsensors("CVAH_L1")
//       }}>getRegionsensors</Button>
//       <Button onClick={async () => {
//         console.log("downloadJsonfile button clicked")

//         await downloadJsonfile().then((data) => {
//           if (data) {
//             // const jsondata = JSON.parse(data.data)

//             const blob = new Blob([data.data], { type: 'application/json' });
//             const downloadUrl = URL.createObjectURL(blob);
//             const downloadLink = document.createElement('a');
//             downloadLink.href = downloadUrl;
//             downloadLink.download = 'data.json';
//             document.body.appendChild(downloadLink);
//             downloadLink.click();
//             document.body.removeChild(downloadLink);

//           }
//         })

//       }}>downloadJsonfile</Button>
//       <Button onClick={async () => {
//         console.log("downloadRegionwisePicklefile button clicked")
//         await downloadRegionwisePicklefile().then((data)=>{
//           if (data) {
//             // const jsondata = JSON.parse(data.data)

//             const blob = new Blob([data.data], { type: 'application/json' });
//             const downloadUrl = URL.createObjectURL(blob);
//             const downloadLink = document.createElement('a');
//             downloadLink.href = downloadUrl;
//             downloadLink.download = 'regionwise_columns.json';
//             document.body.appendChild(downloadLink);
//             downloadLink.click();
//             document.body.removeChild(downloadLink);

//           }
//         })
//       }}>downloadRegionwisePicklefile</Button>
//       <Button onClick={async () => {
//         console.log("addSensorToRegions button clicked")
//         const arr = ["CVR_L1", "CVR_L2", "FURNACE EXIT"]
//         await addSensorToRegions("[12:44]", arr)
//       }}>addSensorToRegions</Button>
//       <Button onClick={async () => {
//         console.log("modifyWeightOfSensors button clicked")
//         // const arr=["CVR_L1","CVR_L2"]
//         const sensorWeights: SensorWeights = {
//           "12:44": {
//             weight: 4.5
//           },
//           "[9.226]": {
//             weight: 4.5
//           }
//         }

//         await modifyWeightOfSensors(sensorWeights)
//       }}>modifyWeightOfSensors</Button>
//       <Button onClick={async () => {
//         console.log("deleteSensorFromRegions button clicked")
//         const arr = ["CVR_L1", "CVR_L2"]
//         await deleteSensorFromRegions("[12:44]", arr)
//       }}>deleteSensorFromRegions</Button>
//       <Button onClick={async () => {
//         console.log("getSensorData button clicked")
//         // await addRegionsToDatabase()
//         // await Addregion()
//         await getSensorData("[9.226]").then((data) => {
//           if (data) {

//             console.log(JSON.parse(data))
//           }
//         }).catch((error) => {
//           console.log(error)
//         })
//       }}>getSensorData</Button>
//       {/* <Button onClick={async()=>{
//             console.log("get region button clicked")
//             await findsensorbyRegion()
//         }}>get region</Button> */}

//     </div>
//   )
// }

// export default AddsensorButton


"use client"
import React, { useState } from 'react'
import { Button } from './ui/button'
import { SensorWeights, addSensorToRegions, deleteSensorFromRegions, downloadJsonfile, downloadRegionwisePicklefile,  modifyWeightOfSensors } from '@/actions/sensor.action'
import { addRegionsToDatabase,  getRegionsForSensorId, getRegionsensors } from '@/actions/region.action'
import { getlogs } from '@/actions/logs.action'


const AddsensorButton = () => {
  const [logdata,setlogdata]=useState([]);
  return (
    <div>
    <Button onClick={async()=>{
      await getlogs().then((data:any)=>{
        if(data){

          setlogdata(data);
        }
        console.log(data)
      })
    }}>getlogs</Button>
    <h1>{JSON.stringify(logdata)}</h1>
    </div>
  )
}

export default AddsensorButton