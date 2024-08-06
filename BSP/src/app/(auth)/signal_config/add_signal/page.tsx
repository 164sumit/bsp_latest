
"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
import { getRegionsForSensorId, getRegionsensors, getallregions } from "@/actions/region.action";
import {
  addSensorToRegions,
  loadSensors,
} from "@/actions/sensor.action";
import { useToast } from "@/components/ui/use-toast";

const ComboboxDemo = () => {

  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [value1, setValue1] = React.useState("");
  const [value2, setValue2] = React.useState("");
  interface Iregions {
    regionName: string
  }
  const [regions, setRegions] = React.useState<Iregions[]>([]);
  const [sensor_id, setSensor_id] = React.useState<string>("");
  const [sensor_id_tag, setSensor_id_tag] = React.useState<string>("");

  interface ISensors {
    Sensor_ID: string;
    Tagname: string;
  }
  const [sensors, setSensors] = React.useState<ISensors[]>([]);
  // const sensors=sensorsTagnames

  interface regionsensors {
    Sensor_ID: string;
    Tagname: string;
  }

  const [regionsensors, setRegionsensors] = React.useState<regionsensors[]>([]);
  interface ISensor {

    Sensor_ID: string;
    Tagname: string;

  }

  interface SensorRegion {
    _id: string,
    regionName?: string,
    workingStatus: boolean,
    id?: string,
    weight?: number
  }
  const [sensorregions, setSensorregions] = React.useState<SensorRegion[]>([]);
  interface Iselectedregions {
    [_id: string]: {
      workingStatus: boolean
      regionName?: string,
      weight?: number
    }
  }
  const [selsectedregions, setSelectedregions] = React.useState<Iselectedregions>({});
  React.useEffect(() => {
    const fun = async () => {

      await getallregions().then((res) => {
        if (res) {
          console.log(res);
          setRegions(JSON.parse(res))

        }
      })
      await loadSensors().then((res: any) => {
        if (res) {
          console.log(JSON.parse(res));
          setSensors(JSON.parse(res));

        }

      })
    }
    fun();
  }, [])

  React.useEffect(() => {
    const fun = async () => {
      await getRegionsensors(value).then((res) => {
        if (res) {
          const data = JSON.parse(res);
          console.log(data);
          setRegionsensors(data);
        }
      });
    };
    if (value) {

      fun();
    }
  }, [value]);



  React.useEffect(() => {
    const fun = async () => {
      await getRegionsForSensorId(sensor_id).then((res: any) => {
        if (res) {
          console.log(JSON.parse(res));
          setSensorregions(JSON.parse(res))

        }
      })

    };
    if (sensor_id != "") {

      fun();
    }
  }, [sensor_id]);

  return (
    <div className="flex h-full flex-col w-full content-center place-content-center place-items-center gap-4 p-3 border-solid border-2 border-dc3  rounded-md">
      <div >
        <h1>Select by sensor Tagname: </h1>
        <Popover open={open1} onOpenChange={setOpen1}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open1}
              className="w-[200px] justify-between overflow-hidden"
            >
              {value1
                ? sensors.find((sensor) => `${sensor.Sensor_ID} ${sensor.Tagname}` === value1)?.Tagname
                : " sensors..."}
              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search sensors..." className="h-9" />
              <CommandList>
                <CommandEmpty>No sensors found.</CommandEmpty>
                <CommandGroup>
                  {sensors && sensors?.map((sensor, index) => (
                    <CommandItem
                      key={index}
                      value={`${sensor.Sensor_ID} ${sensor.Tagname}`}
                      onSelect={(currentValue) => {
                        setValue1(currentValue === value1 ? value1 : currentValue);
                        setSensor_id(`${sensor.Sensor_ID}`)
                        setSensor_id_tag(`${sensor.Sensor_ID}_${sensor.Tagname}`)
                        
                        setOpen1(false);
                      }}
                    >
                      {`${sensor.Sensor_ID} ${sensor.Tagname}`}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          value1 === `${sensor.Sensor_ID} ${sensor.Tagname}` ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <div className="">
        <h1>Select by region: </h1>

        {/* <h1>Select by region: </h1> */}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              {value
                ? regions.find((region) => region.regionName === value)
                  ?.regionName
                : "regions..."}
              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search regions..." className="h-9" />
              <CommandList>
                <CommandEmpty>No regions found.</CommandEmpty>
                <CommandGroup>
                  {regions.map((region) => (
                    <CommandItem
                      key={region.regionName}
                      value={region.regionName}
                      onSelect={async (currentValue) => {
                        setValue(currentValue === value ? value : currentValue);
                        setOpen(false);
                      }}
                    >
                      {region.regionName}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          value === region.regionName
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        {regionsensors.length > 0 && (
          <div className="flex flex-col items-start mb-4 gap-1 w-full max-w-3xl overflow-auto">
            <h1>Select sensor from region:</h1>
            <Popover open={open2} onOpenChange={setOpen2}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open2}
                  className="w-[200px] justify-between overflow-hidden"
                >
                  {value
                    ? regionsensors.find((sensor) => `${sensor.Sensor_ID} ${sensor.Tagname}` === value2)
                      ?.Tagname
                    : "regions..."}
                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput
                    placeholder="Search regions..."
                    className="h-9"
                  />
                  <CommandList>
                    <CommandEmpty>No regions found.</CommandEmpty>
                    <CommandGroup>
                      {regionsensors.map((sensor, index) => (
                        <CommandItem
                          key={index}
                          value={`${sensor.Sensor_ID} ${sensor.Tagname}`}
                          onSelect={async (currentValue) => {
                            // hendleSelectregion();
                            setValue2(
                              currentValue === value2 ? "" : currentValue
                            );
                            // setSensor_id(sensor.Sensor_ID);
                        setSensor_id(`${sensor.Sensor_ID}`)
                        setSensor_id_tag(`${sensor.Sensor_ID}_${sensor.Tagname}`)

                            setOpen2(false);
                          }}
                        >
                          {`${sensor.Sensor_ID} ${sensor.Tagname}`}
                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4",
                              value === `${sensor.Sensor_ID} ${sensor.Tagname}`
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        )}
      </div>
      {sensor_id&&<div className="flex flex-row w-full gap-4 ">

        <div className="max-h-[50vh] basis-1/2 overflow-auto">

          <table className="table w-full rounded-lg border ">
            <caption className="caption-top">
              Select the region
            </caption>
            <thead >
              <tr className="bg-[#AF8F6F] text-gray-100 font-semibold sticky top-0">
                <th className="px-4 py-2">Sr. No.</th>
                <th className="px-4 py-2">Region Name</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {sensorregions && // Check if regions exist before accessing
                sensorregions.map(
                  (region, index) =>
                    !region.workingStatus && (
                      <tr key={region._id} className="border-b">
                        <td className="px-4 py-2">{index + 1}</td>
                        <td className="px-4 py-2">{region.regionName}</td>
                        <td className="px-4 py-2">
                          <Button
                            className="bg-[#AF8F6F] hover:bg-dc3 "
                            onClick={() => {
                              console.log(selsectedregions);
                              setSensorregions((prevRegions) =>
                                prevRegions.map((region1) =>
                                  region1.regionName === region.regionName
                                    ? { ...region1, workingStatus: true }
                                    : region1
                                )
                              )
                              setSelectedregions((prevSelectedRegions) => ({
                                ...prevSelectedRegions,
                                [region._id]: {
                                  workingStatus: true,
                                  regionName: region.regionName,
                                  weight: region?.weight
                                },
                              }));
                            }}
                          >
                            Add to region
                          </Button>
                        </td>
                      </tr>
                    )
                )}
            </tbody>
          </table>
        </div>
        <div className="max-h-[50vh]  basis-1/2 overflow-auto">

          <table className="table w-full  rounded-lg border ">
            <caption className="caption-top">
              Selected list
            </caption>
            <thead>
              <tr className="bg-[#AF8F6F] text-gray-100 font-semibold sticky top-0">
                <th className="px-4 py-2">Sr. No.</th>
                <th className="px-4 py-2">Region Name</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {selsectedregions && // Check if regions exist before accessing
                Object.entries(selsectedregions).map(
                  ([_id], index) =>
                    selsectedregions[_id].workingStatus && (
                      <tr key={_id} className="border-b">
                        <td className="px-4 py-2">{index + 1}</td>
                        <td className="px-4 py-2">{selsectedregions[_id]?.regionName}</td>
                        <td className="px-4 py-2">
                          <Button
                            className="bg-[#AF8F6F] hover:bg-dc3 "
                            onClick={() => {
                              console.log(sensorregions);
                              setSensorregions((prevRegions) =>
                                prevRegions.map((region1) =>
                                  region1.regionName === selsectedregions[_id]?.regionName
                                    ? { ...region1, workingStatus: false }
                                    : region1
                                )
                              )
                              setSelectedregions((prevSelectedRegions) => ({
                                ...prevSelectedRegions,
                                [_id]: {
                                  workingStatus: false,
                                  regionName: selsectedregions[_id]?.regionName,
                                  weight:selsectedregions[_id]?.weight
                                },
                              }));
                            }}
                          >
                            Remove from list
                          </Button>
                        </td>
                      </tr>
                    )
                )}
            </tbody>
          </table>
        </div>
      </div>}




      {sensor_id&&<Button
        className="bg-[#AF8F6F] hover:bg-dc3  mt-3"
              disabled={!sensor_id}
        onClick={async () => {
          if (sensor_id) {
            await addSensorToRegions(selsectedregions,sensor_id_tag).then(
              (res) => {
                console.log(res);
                toast({
                  description: res.message,
                });
                setSelectedregions({});
              }
            );
          }
        }}
      >
        Apply changes
      </Button>}



    </div>
  )
};

export default ComboboxDemo;