import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Slider } from "@/components/ui/slider"
import { XIcon } from "lucide-react"
import React, { useState, useEffect } from "react"

type Props = {
  open: boolean
  close: (value: boolean) => void
  initialPrice: [number, number]
  onApply: (price: [number, number]) => void
}

const MIN_PRICE = 0
const MAX_PRICE = 500000

const PriceFilter = ({ close, open, initialPrice, onApply }: Props) => {
  const [price, setPrice] = useState<[number, number]>(initialPrice)

  useEffect(() => {
    setPrice(initialPrice)
  }, [initialPrice])

  const handleApply = () => {
    onApply(price)
  }

  const handleClear = () => {
    setPrice([MIN_PRICE, MAX_PRICE])
    onApply([MIN_PRICE, MAX_PRICE])
  }

  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogTrigger asChild>
        <button className="hidden">Open</button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[540px] rounded-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold">
              Filter by Price
            </DialogTitle>

            <button onClick={() => close(false)} className="cursor-pointer w-[50px] border-[1px] hover:bg-gray-100 border-gray-200 flex justify-center items-center rounded-full h-[50px]">
              <XIcon size={24} />
            </button>
          </div>
          <DialogDescription>
            Select a minimum and maximum price range for events.
          </DialogDescription>
        </DialogHeader>

        {/* PRICE RANGE DISPLAY */}
        <div className="flex justify-between text-[20px] font-semibold text-gray-700">
          <span>₦{price[0].toLocaleString()}</span>
          <span>₦{price[1].toLocaleString()}</span>
        </div>

        {/* SLIDER */}
        <Slider
          value={price}
          onValueChange={(value) => setPrice(value as [number, number])}
          min={MIN_PRICE}
          max={MAX_PRICE}
          step={5000}
          className="mt-4"
        />

        {/* INPUTS */}
        <div className="flex items-center gap-4 mt-4">
          <div className="w-full p-3 rounded-xl border border-gray-200">
            <p className="text-xs text-gray-500 mb-1">Minimum</p>
            <input
              type="number"
              value={price[0]}
              onChange={(e) => {
                const val = Number(e.target.value)
                if (val >= MIN_PRICE && val <= price[1]) {
                  setPrice([val, price[1]])
                }
              }}
              className="w-full text-lg font-bold outline-none"
              min={MIN_PRICE}
              max={price[1]}
            />
          </div>

          <div className="w-full p-3 rounded-xl border border-gray-200">
            <p className="text-xs text-gray-500 mb-1">Maximum</p>
            <input
              type="number"
              value={price[1]}
              onChange={(e) => {
                const val = Number(e.target.value)
                if (val <= MAX_PRICE && val >= price[0]) {
                  setPrice([price[0], val])
                }
              }}
              className="w-full text-lg font-bold outline-none"
              min={price[0]}
              max={MAX_PRICE}
            />
          </div>
        </div>

        {/* QUICK PRESETS */}
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-2">Quick Select:</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setPrice([0, 10000])}
              className="px-4 cursor-pointer py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition"
            >
              Under ₦10k
            </button>
            <button
              onClick={() => setPrice([10000, 50000])}
              className="px-4 py-2 cursor-pointer bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition"
            >
              ₦10k - ₦50k
            </button>
            <button
              onClick={() => setPrice([50000, 100000])}
              className="px-4 py-2 cursor-pointer bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition"
            >
              ₦50k - ₦100k
            </button>
            <button
              onClick={() => setPrice([100000, MAX_PRICE])}
              className="px-4 py-2 cursor-pointer bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition"
            >
              Above ₦100k
            </button>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-between mt-4">
          <button
            className="text-[16px] cursor-pointer font-medium text-gray-500 hover:text-black transition"
            onClick={handleClear}
          >
            Clear
          </button>

          <button
            onClick={handleApply}
            className="px-8 py-3 cursor-pointer rounded-xl bg-black text-white text-[16px] font-semibold hover:bg-gray-900 transition"
          >
            Apply
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PriceFilter