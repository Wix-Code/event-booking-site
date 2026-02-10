import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import React, { useState } from "react"
import { format } from "date-fns"
import { XIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

type Props = {
  open: boolean
  close: (value: boolean) => void
  onApply: (filter: string, dateRange?: DateRange) => void
}

const DateFilter = ({ close, open, onApply }: Props) => {
  const [selectedFilter, setSelectedFilter] = useState<string>("all")
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined)

  const quickFilters = [
    { id: "today", label: "Today" },
    { id: "tomorrow", label: "Tomorrow"},
    { id: "this-week", label: "This Week" },
    { id: "this-weekend", label: "This Weekend" },
    { id: "this-month", label: "This Month"},
  ]

  const handleQuickFilter = (filterId: string) => {
    setSelectedFilter(filterId)
    setDateRange(undefined)
  }

  const handleDateRangeSelect = (range: DateRange | undefined) => {
    if (range) {
      setDateRange(range)
      setSelectedFilter("custom")
    }
  }

  const handleApply = () => {
    onApply(selectedFilter, dateRange)
    close(false)
  }

  const handleClear = () => {
    setSelectedFilter("all")
    setDateRange(undefined)
    onApply("all")
  }

  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogTrigger asChild>
        <button className="hidden">Open</button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[640px] rounded-2xl max-h-[90vh] overflow-y-auto custom-scroll p-0">
        {/* STICKY HEADER */}
        <div className="sticky top-0 z-50 bg-white rounded-t-2xl border-b border-gray-100 p-6">
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-xl font-bold mb-1">
                Filter by Date
              </DialogTitle>
              <DialogDescription>
                Choose when you want to attend events.
              </DialogDescription>
            </div>
            <button 
              onClick={() => close(false)} 
              className="cursor-pointer w-10 h-10 border border-gray-200 hover:bg-gray-100 flex justify-center items-center rounded-full transition flex-shrink-0"
            >
              <XIcon size={20} />
            </button>
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-6 pt-4">
          {/* QUICK FILTERS */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Quick Select</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {quickFilters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => handleQuickFilter(filter.id)}
                  className={`flex items-center cursor-pointer text-center justify-center p-3 rounded-xl border-2 transition ${
                    selectedFilter === filter.id
                      ? "border-black bg-black text-white"
                      : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <p className="font-semibold text-sm">{filter.label}</p>
                </button>
              ))}
            </div>
          </div>

          {/* CUSTOM DATE RANGE PICKER */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Pick a Date Range</h3>
            <div className="border border-gray-200 rounded-xl p-4">
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={handleDateRangeSelect}
                disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                numberOfMonths={2}
                className="rounded-md"
              />
              {dateRange?.from && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Selected Date Range:</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-bold text-gray-900">
                      {format(dateRange.from, "MMM dd, yyyy")}
                    </p>
                    {dateRange.to && (
                      <>
                        <span className="text-gray-500">→</span>
                        <p className="font-bold text-gray-900">
                          {format(dateRange.to, "MMM dd, yyyy")}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* STICKY FOOTER */}
        <div className="sticky bottom-0 z-50 bg-white rounded-b-2xl border-t border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <button
              className="text-base cursor-pointer font-medium text-gray-500 hover:text-black transition"
              onClick={handleClear}
            >
              Clear
            </button>

            <button
              onClick={handleApply}
              className="px-8 py-3 rounded-xl cursor-pointer bg-black text-white text-base font-semibold hover:bg-gray-900 transition"
            >
              Apply
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DateFilter