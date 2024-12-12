import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Alert, AlertDescription } from './ui/alert'
import { DateTimePicker } from './DateTimePicker'
import { Event } from '../types/event'
import { isAfter, isBefore } from 'date-fns'

interface EventModalProps {
  isOpen: boolean
  onClose: () => void
  onAddEvent: (event: Event) => void
  onEditEvent: (event: Event) => void
  onDeleteEvent: (eventId: string) => void
  selectedDate: Date
  selectedEvent: Event | null
  events: Event[]
}

export default function EventModal({
  isOpen,
  onClose,
  onAddEvent,
  onEditEvent,
  onDeleteEvent,
  selectedDate,
  selectedEvent,
  events
}: EventModalProps) {
  const [name, setName] = useState('')
  const [startTime, setStartTime] = useState<Date>(new Date())
  const [endTime, setEndTime] = useState<Date>(new Date())
  const [description, setDescription] = useState('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (selectedEvent) {
      setName(selectedEvent.name)
      setStartTime(new Date(selectedEvent.startTime))
      setEndTime(new Date(selectedEvent.endTime))
      setDescription(selectedEvent.description || '')
    } else {
      const defaultStart = new Date(selectedDate)
      defaultStart.setHours(9, 0, 0, 0)
      setName('')
      setStartTime(defaultStart)
      setEndTime(new Date(defaultStart.getTime() + 60 * 60 * 1000))
      setDescription('')
    }
    setError(null)
  }, [selectedEvent, selectedDate])

  const checkOverlap = (newStart: Date, newEnd: Date) => {
    return events.some(event => {
      if (selectedEvent && event.id === selectedEvent.id) return false
      const eventStart = new Date(event.startTime)
      const eventEnd = new Date(event.endTime)
      return (
        (isBefore(newStart, eventEnd) && isAfter(newEnd, eventStart)) ||
        (isBefore(eventStart, newEnd) && isAfter(eventEnd, newStart))
      )
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (isAfter(startTime, endTime)) {
      setError('End time must be after start time')
      return
    }

    if (checkOverlap(startTime, endTime)) {
      setError('This event overlaps with an existing event')
      return
    }

    const event: Event = {
      id: selectedEvent ? selectedEvent.id : Date.now().toString(),
      name,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      description
    }
    if (selectedEvent) {
      onEditEvent(event)
    } else {
      onAddEvent(event)
    }
    onClose()
  }

  const handleDelete = () => {
    if (selectedEvent) {
      onDeleteEvent(selectedEvent.id)
    }
  }

  const handleDateTimeChange = (start: Date, end: Date) => {
    setStartTime(start)
    setEndTime(end)
    setError(null)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{selectedEvent ? 'Edit Event' : 'Add Event'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Event Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <DateTimePicker
            onRangeChange={handleDateTimeChange}
            initialStartDate={startTime}
            initialEndDate={endTime}
          />
          <Textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="flex justify-between">
            <Button type="submit">{selectedEvent ? 'Update' : 'Add'}</Button>
            {selectedEvent && (
              <Button type="button" variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}