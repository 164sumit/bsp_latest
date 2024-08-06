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
import { getRegionsensors, getRegionsensors1, getallregions } from "@/actions/region.action";

import { regionsname, sensorsTagnames } from "@/constants";

import { useToast } from "@/components/ui/use-toast";
import { modifyWeightOfSensors } from "@/actions/sensor.action";
import PreviousMap from "postcss/lib/previous-map";
import { redirect, useRouter } from "next/navigation";
import { ISensor } from "@/lib/interfaces/sensor";

const ComboboxDemo = () => {
  const router = useRouter();

  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);

  const [value, setValue] = React.useState("");

   interface regionsensors  {
    _id: string;  // or use mongoose.Types.ObjectId if you prefer
    regionName: string;
    weight: number;
    workingStatus?: boolean;
    Sensor_ID: string;
    sensor?: ISensor;
    id?: string;
  }

  const [regionsensors, setRegionsensors] = React.useState<regionsensors[]>([]);
  interface SensorWeights {
    [_id: string]: { weight: number };
  }
  const [sensorWeights, setsensorWeights] = React.useState<SensorWeights>({});

  const sensors = sensorsTagnames;
  const regions = regionsname;
  const options: any = [];
  for (let i = 0; i < 10; i++) {
    options.push(
      <option key={i} value={i + 1}>
        {i + 1}
      </option>
    );
  }

  React.useEffect(() => {
    // console.log(regionsensors);
    const fun = async () => {
      await getRegionsensors1(value).then((res) => {
        // console.log(res);
        if (res) {
          const data = JSON.parse(res);
          console.log(data);
          setRegionsensors(data);
        }
      });
    };
    fun();
  }, [value]);
  const handleChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    Tagnames: string
  ) => {
    console.log(event.target.value, Tagnames);

    // onChange(event.target.value as string); // Type cast to string
  };
  React.useEffect(() => {
    console.log(sensorWeights);
  }, [sensorWeights]);

  return (
    <div className="flex h-full flex-col items-center w-full border-solid border-2 border-dc3  rounded-md ">
      {/* <div className="overflow-auto rounded-md shadow"> */}
      <div className="flex flex-row items-center gap-2 m-2">
        <h1>Select by region: </h1>
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
                        setValue(currentValue === value ? "" : currentValue);
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
      </div>
      <div className="max-h-[70vh]  overflow-auto">
        <table className=" text-left table-auto w-[60vw]">
        <thead>
      <tr className="bg-[#AF8F6F] text-gray-100 font-semibold sticky top-0"> {/* Added sticky top-0 */}
        <th className="px-4 py-2">Sr. No.</th>
        <th className="px-4 py-2">Sensor Tagname</th>
        <th className="px-4 py-2">Current Weight</th>
        <th className="px-4 py-2">New Weight</th>
      </tr>
    </thead>
          <tbody>
            {regionsensors.map((sensor, index) => (
              <tr key={sensor._id} className="border-b border-gray-800">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{sensor.sensor?.Tagname}</td>
                <td className="px-4 py-2">{sensor.weight}</td>
                <td className="px-4 py-2">
                  <select
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      console.log(e.target.value);
                      setsensorWeights((prev) => ({
                        ...prev,
                        [`${sensor._id}`]: {
                          weight: Number(e.target.value),
                        },
                      }));
                    }}
                    className="border rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    {options}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
      <Button
      className="bg-[#AF8F6F] hover:bg-dc3  mt-3"
          onClick={async () => {
            console.log(sensorWeights);
            
            await modifyWeightOfSensors(sensorWeights).then(async(res) => {
              console.log(res);
              if (res) {
                toast({
                  description: res.message,
                });
                await getRegionsensors1(value).then((res) => {
                  // console.log(res);
                  if (res) {
                    const data = JSON.parse(res);
                    console.log(data);
                    setRegionsensors(data);
                    setsensorWeights({});
                  }
                });
              }
              
              // router.refresh();

            });
          }}
        >
          Apply Changes
        </Button>


    </div>

    // </div>
  );
};
export default ComboboxDemo;
