import { useState, useEffect } from 'react'
import { format, isAfter, isBefore, setHours, setMinutes } from 'date-fns'
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
  const [startDate, setStartDate] = useState<Date>(initialStartDate || new Date())
  const [endDate, setEndDate] = useState<Date>(initialEndDate || new Date())
  const [startTime, setStartTime] = useState(format(startDate, 'HH:mm'))
  const [endTime, setEndTime] = useState(format(endDate, 'HH:mm'))

  useEffect(() => {
    if (initialStartDate) setStartDate(initialStartDate)
    if (initialEndDate) setEndDate(initialEndDate)
  }, [initialStartDate, initialEndDate])

  const updateDateTime = (date: Date, time: string): Date => {
    const [hours, minutes] = time.split(':').map(Number)
    return setMinutes(setHours(date, hours), minutes)
  }

  const handleStartDateSelect = (date: Date | undefined) => {
    if (!date) return
    const newStartDate = updateDateTime(date, startTime)
    setStartDate(newStartDate)
    if (isAfter(newStartDate, endDate)) {
      setEndDate(newStartDate)
      onRangeChange(newStartDate, newStartDate)
    } else {
      onRangeChange(newStartDate, endDate)
    }
  }

  const handleEndDateSelect = (date: Date | undefined) => {
    if (!date) return
    const newEndDate = updateDateTime(date, endTime)
    setEndDate(newEndDate)
    if (isBefore(newEndDate, startDate)) {
      setStartDate(newEndDate)
      onRangeChange(newEndDate, newEndDate)
    } else {
      onRangeChange(startDate, newEndDate)
    }
  }

  const handleTimeChange = (value: string, isStart: boolean) => {
    const date = isStart ? startDate : endDate
    const newDate = updateDateTime(date, value)

    if (isStart) {
      setStartTime(value)
      setStartDate(newDate)
      if (isAfter(newDate, endDate)) {
        setEndDate(newDate)
        onRangeChange(newDate, newDate)
      } else {
        onRangeChange(newDate, endDate)
      }
    } else {
      setEndTime(value)
      setEndDate(newDate)
      if (isBefore(newDate, startDate)) {
        setStartDate(newDate)
        onRangeChange(newDate, newDate)
      } else {
        onRangeChange(startDate, newDate)
      }
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <Label htmlFor="start-date">Start Date and Time</Label>
        <div className="flex space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">{format(startDate, 'PP')}</Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={startDate} onSelect={handleStartDateSelect} initialFocus />
            </PopoverContent>
          </Popover>
          <Input
            id="start-time"
            type="time"
            value={startTime}
            onChange={(e) => handleTimeChange(e.target.value, true)}
          />
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <Label htmlFor="end-date">End Date and Time</Label>
        <div className="flex space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">{format(endDate, 'PP')}</Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={endDate} onSelect={handleEndDateSelect} initialFocus />
            </PopoverContent>
          </Popover>
          <Input
            id="end-time"
            type="time"
            value={endTime}
            onChange={(e) => handleTimeChange(e.target.value, false)}
          />
        </div>
      </div>
    </div>
  )
}