"use client"
import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, CalendarIcon, ChevronDown, MoreHorizontal } from "lucide-react"
import { saveAs } from 'file-saver'

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { fetchLogs, getlogs } from "@/actions/logs.action"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { ILog } from "@/lib/models/log.model"

export type LogEntry = {
    srNo?: number
    message: string
    timestamp: Date
    level?: string
    owner?: string
}

 const columns: ColumnDef<LogEntry>[] = [
    {
      accessorKey: "srNo",
      header: "Sr.No",
      cell: ({ row }) => <div>{row.getValue("srNo")}</div>,
    },
    {
      accessorKey: "message",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Message
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div>{row.getValue("message")}</div>,
    },
    {
      accessorKey: "owner",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Owner
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div>{row.getValue("owner")}</div>,
    },
    {
      accessorKey: "timestamp",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Timestamp
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div>{new Date(row.getValue("timestamp")).toLocaleString()}</div>,
    },
    
]

const DataTableDemo = () => {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [data, setData] = React.useState<LogEntry[]>([])
  const [logEntries, setLogEntries] = React.useState<LogEntry[]>([])
  const [selectedOwner, setSelectedOwner] = React.useState<string>('all')
  const [owners, setOwners] = React.useState<string[]>([])
  const [startDate, setStartDate] = React.useState<Date>()
  const [endDate, setEndDate] = React.useState<Date>()

  React.useEffect(() => {
    // Fetch logs when the component mounts or when the selected owner changes
    const fetchData = async () => {
      try {
        const res = await fetchLogs({ owner: selectedOwner, startDate, endDate });
        if(res){
          const logs:ILog[] =JSON.parse(res)

          const procesdata: LogEntry[] = logs.map((log, index) => ({
            srNo: index + 1,
            message: log.message,
            timestamp: log.timestamp,
            level: log.level,
            owner: log.meta.owner,
          }));
          const uniqueOwners = Array.from(new Set(procesdata.map(log => log.owner || 'default-owner')));
    setOwners(uniqueOwners);
  
          setLogEntries(procesdata)
  
          setData(procesdata);
        }
      } catch (error) {
        console.error('Error fetching logs:', error);
      }
    };

    fetchData();
  }, []);
  React.useEffect(() => {
    
    

    let filteredLogs = logEntries;
    if (selectedOwner !== 'all') {
      filteredLogs = filteredLogs.filter(log => log.owner === selectedOwner);
    }
    if (startDate) {
      filteredLogs = filteredLogs.filter(log => new Date(log.timestamp) >= startDate);
    }
    if (endDate) {
      const endFilterDate = new Date(endDate);
    endFilterDate.setHours(23, 59, 59, 999);
      filteredLogs = filteredLogs.filter(log => new Date(log.timestamp) <= endFilterDate);
    }
    setData(filteredLogs);
    
  }, [selectedOwner, startDate, endDate])
  

  const handleOwnerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOwner(event.target.value);
  };
  
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  const handleDownload = () => {
    const logContent = data.map(log => JSON.stringify({
      level: log.level,
      message: log.message,
      timestamp: log.timestamp,
      owner: log.owner,
    })).join('\n');

    const blob = new Blob([logContent], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'combined.log');
  }
  
  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter message..."
          value={(table.getColumn("message")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("message")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <select onChange={handleOwnerChange} value={selectedOwner} className="ml-4 p-2 border rounded">
          <option value="all">All Owners</option>
          {owners.map(owner => (
            <option key={owner} value={owner}>{owner}</option>
          ))}
        </select>
        <div className="ml-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[140px] justify-start text-left font-normal",
                  !startDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, "PPP") : <span>Start Date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="ml-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[140px] justify-start text-left font-normal",
                  !endDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, "PPP") : <span>End Date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="outline" className="ml-4" onClick={handleDownload}>
          Download Logs
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredRowModel().rows.length} row(s).
        </div>
        <div className="space-x-2">
          <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
export default DataTableDemo
