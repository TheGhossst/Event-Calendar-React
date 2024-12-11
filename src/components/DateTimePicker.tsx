'use client'

import { useState, useEffect } from 'react'
import { format, parse, isAfter } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

interface DateTimePickerProps {
  onRangeChange: (start: Date, end: Date) => void
  initialStartDate?: Date
  initialEndDate?: Date
}

export function DateTimePicker({ onRangeChange, initialStartDate, initialEndDate }: DateTimePickerProps) {
  const [startDate, setStartDate] = useState<Date | undefined>(initialStartDate || new Date())
  const [endDate, setEndDate] = useState<Date | undefined>(initialEndDate || new Date())
  const [startTime, setStartTime] = useState(format(initialStartDate || new Date(), 'HH:mm'))
  const [endTime, setEndTime] = useState(format(initialEndDate || new Date(), 'HH:mm'))

  useEffect(() => {
    if (initialStartDate) setStartDate(initialStartDate)
    if (initialEndDate) setEndDate(initialEndDate)
  }, [initialStartDate, initialEndDate])

  const handleStartDateSelect = (date: Date | undefined) => {
    setStartDate(date)
    if (date && endDate && isAfter(date, endDate)) {
      setEndDate(date)
    }
    updateRangeChange(date, endDate)
  }

  const handleEndDateSelect = (date: Date | undefined) => {
    if (date && startDate && isAfter(startDate, date)) {
      setEndDate(startDate)
    } else {
      setEndDate(date)
    }
    updateRangeChange(startDate, date)
  }

  const handleTimeChange = (value: string, setter: React.Dispatch<React.SetStateAction<string>>, isStart: boolean) => {
    setter(value)
    const date = isStart ? startDate : endDate
    if (date) {
      const newDate = parse(`${format(date, 'yyyy-MM-dd')} ${value}`, 'yyyy-MM-dd HH:mm', new Date())
      updateRangeChange(isStart ? newDate : startDate, isStart ? endDate : newDate)
    }
  }

  const updateRangeChange = (start: Date | undefined, end: Date | undefined) => {
    if (start && end) {
      const startWithTime = parse(`${format(start, 'yyyy-MM-dd')} ${startTime}`, 'yyyy-MM-dd HH:mm', new Date())
      const endWithTime = parse(`${format(end, 'yyyy-MM-dd')} ${endTime}`, 'yyyy-MM-dd HH:mm', new Date())
      onRangeChange(startWithTime, endWithTime)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <Label htmlFor="start-date">Start Date and Time</Label>
        <div className="flex space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">{startDate ? format(startDate, 'PP') : 'Pick a date'}</Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={startDate} onSelect={handleStartDateSelect} initialFocus />
            </PopoverContent>
          </Popover>
          <Input
            id="start-time"
            type="time"
            value={startTime}
            onChange={(e) => handleTimeChange(e.target.value, setStartTime, true)}
          />
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <Label htmlFor="end-date">End Date and Time</Label>
        <div className="flex space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">{endDate ? format(endDate, 'PP') : 'Pick a date'}</Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={endDate} onSelect={handleEndDateSelect} initialFocus />
            </PopoverContent>
          </Popover>
          <Input
            id="end-time"
            type="time"
            value={endTime}
            onChange={(e) => handleTimeChange(e.target.value, setEndTime, false)}
          />
        </div>
      </div>
    </div>
  )
}
