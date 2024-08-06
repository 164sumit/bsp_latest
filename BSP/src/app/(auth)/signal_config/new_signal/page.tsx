"use client";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { getallregions } from "@/actions/region.action";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addnewsensor } from "@/actions/sensor.action";

const SensorEntryPage: React.FC = () => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [sensorID, setSensorID] = useState("");
  const [tagname, setTagname] = useState("");
  const [value, setValue] = useState("");
  const [weight, setWeight] = useState(1);
  const [entries, setEntries] = useState<SensorEntry[]>([]);
  const [regions, setRegions] = useState<Iregions[]>([]);

  interface SensorEntry {
  
    regionName: string;
    weight: number;
  }

  interface Iregions {
    regionName: string;
  }
  const sortRegionsByName = (regions: Iregions[]) => {
    return regions.sort((a, b) => a.regionName.localeCompare(b.regionName));
  };
  const handleAddEntry = () => {
    if (value && weight) {
      const newEntry = {regionName: value, weight };
      setEntries([...entries, newEntry]);
      setRegions(regions.filter((r) => r.regionName !== value))
      // const sortedRegions = sortRegionsByName(regions);
      // setRegions(sortedRegions)
     
      setValue("");
      setWeight(1);
    }
  };

  const handleRemoveEntry = (index: number) => {
    const removedEntry = entries[index];
    const updatedEntries = entries.filter((_, i) => i !== index);
    setEntries(updatedEntries);
    setRegions([...regions, { regionName: removedEntry.regionName }]);
    // const sortedRegions = sortRegionsByName(regions);
    //   setRegions(sortedRegions)
  };

  React.useEffect(() => {
    const sortRegionsByName = (regions: Iregions[]) => {
      return regions.sort((a, b) => a.regionName.localeCompare(b.regionName));
    };
    const sortedRegions = sortRegionsByName(regions);
      setRegions(sortedRegions)
  }, [regions]);
  React.useEffect(() => {
    const fetchRegions = async () => {
      await getallregions().then((res) => {
        if (res) {
          const parsedRegions = JSON.parse(res);
          // const sortedRegions = sortRegionsByName(parsedRegions);
          setRegions(parsedRegions);
        }
      });
    };
    fetchRegions();
  }, []);

  return (
    <div className=" p-4 h-full flex flex-col justify-center w-full  place-items-center border-solid border-2 border-dc3  rounded-md">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Sensor ID
        </label>
        <Input
          type="text"
          value={sensorID}
          onChange={(e) => setSensorID(e.target.value)}
          className="mt-1 block w-[400px] rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Tagname
        </label>
        <Input
          type="text"
          value={tagname}
          onChange={(e) => setTagname(e.target.value)}
          className="mt-1 block w-[400px] rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div className="mb-4">
  <label className="block text-sm font-medium text-gray-700">Region</label>
  <Popover open={open} onOpenChange={setOpen}>
    <PopoverTrigger asChild>
      <Button
        variant="outline"
        role="combobox"
        aria-expanded={open}
        className="w-[400px]"
      >
        {value ? regions.find((region) => region.regionName === value)?.regionName : "Select region..."}
        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent className="p-0">
      <Command className="w-[400px]">
        <CommandInput placeholder="Search regions..." className="h-9" />
        <CommandList>
          <CommandEmpty>No regions found.</CommandEmpty>
          <CommandGroup>
            {regions.map((region) => (
              <CommandItem
                key={region.regionName}
                value={region.regionName}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? value : currentValue);
                  setOpen(false);
                  // setRegions(regions.filter((r) => r.regionName !== currentValue));
                }}
              >
                {region.regionName}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === region.regionName ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
  <label className="block text-sm font-medium text-gray-700">Weight</label>
  <Select
    onValueChange={(e) => setWeight(Number(e))}
    value={String(weight)}
  >
    <SelectTrigger className="w-full">
      <SelectValue placeholder="Select a Weight" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Weights</SelectLabel>
        {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
          <SelectItem key={num} value={String(num)}>
            {num}
          </SelectItem>
        ))}
      </SelectGroup>
    </SelectContent>
  </Select>
</div>
      <div className="mb-4">
      </div>
      <div className="mb-4">
        <Button
          onClick={handleAddEntry}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add
        </Button>
      </div>
      {entries.length>0&&<table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-[#AF8F6F] text-gray-100 font-semibold sticky top-0">
            <th className="w-1/4 px-4 py-2">Sr. No</th>
            
            <th className="w-1/4 px-4 py-2">Region</th>
            <th className="w-1/4 px-4 py-2">Weight</th>
            <th className="w-1/4 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr key={index} className="text-center border-b">
              <td className="px-4 py-2">{index + 1}</td>
              
              <td className="px-4 py-2">{entry.regionName}</td>
              <td className="px-4 py-2">{entry.weight}</td>
              <td className="px-4 py-2">
                <Button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleRemoveEntry(index)}
                >
                  Remove from list
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>}
      {entries.length>0&&
      <Button
      className="bg-[#AF8F6F] hover:bg-dc3  mt-3"
      disabled={!sensorID || !tagname}
       onClick={async()=>{
         await addnewsensor({Sensor_ID:sensorID,Tagname:tagname,entries}).then((res)=>{
           console.log(res);
           toast({
             description:res.message
           })
           
         })
        
        
      }}>Add Sensor</Button>}
    </div>
  );
};

export default SensorEntryPage;
