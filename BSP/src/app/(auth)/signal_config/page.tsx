import React from 'react'

const SignalConfig = () => {
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Signal Management Application</h1>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Application Usage and Features</h2>
        <ul className="list-disc pl-6">
          <li className="mb-4">
            <h3 className="text-xl font-medium">1. Add New Signal</h3>
            <p>Use this feature to add a new signal into the database and its corresponding regions.</p>
          </li>
          <li className="mb-4">
            <h3 className="text-xl font-medium">2. Add Signal to Regions</h3>
            <p>Add a signal to a region if its working status is false.</p>
          </li>
          <li className="mb-4">
            <h3 className="text-xl font-medium">3. Remove Signal from Regions</h3>
            <p>Remove a signal from a region opposite of &quot;Add Signal to Regions.&quot;</p>
          </li>
          <li className="mb-4">
            <h3 className="text-xl font-medium">4. Modify Weight</h3>
            <p>Modify the weight of sensors in a region.</p>
          </li>
          <li className="mb-4">
            <h3 className="text-xl font-medium">5. Download Config</h3>
            <p>Download the configuration file used by ML models.</p>
          </li>
        </ul>
      </div>
      
      <div className=" p-4 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
        <p>To use this application, navigate through the menu options to access each feature. Make sure you have the necessary permissions to perform these operations.</p>
      </div>
    </div>
  );
}

export default SignalConfig