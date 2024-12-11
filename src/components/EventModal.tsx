import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Alert, AlertDescription } from './ui/alert'
import { Event } from '../types/event'

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
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (selectedEvent) {
      setName(selectedEvent.name)
      setStartTime(selectedEvent.startTime)
      setEndTime(selectedEvent.endTime)
      setDescription(selectedEvent.description || '')
    } else {
      const defaultStart = new Date(selectedDate)
      defaultStart.setHours(9, 0, 0, 0)
      setName('')
      setStartTime(defaultStart.toISOString().slice(0, 16))
      setEndTime(new Date(defaultStart.getTime() + 60 * 60 * 1000).toISOString().slice(0, 16))
      setDescription('')
    }
    setError(null)
  }, [selectedEvent, selectedDate])

  const checkOverlap = (newStart: Date, newEnd: Date) => {
    return events.some(event => {
      if (selectedEvent && event.id === selectedEvent.id) return false
      const eventStart = new Date(event.startTime)
      const eventEnd = new Date(event.endTime)
      return (newStart < eventEnd && newEnd > eventStart)
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newStart = new Date(startTime)
    const newEnd = new Date(endTime)

    if (newStart >= newEnd) {
      setError('End time must be after start time')
      return
    }

    if (checkOverlap(newStart, newEnd)) {
      setError('This event overlaps with an existing event')
      return
    }

    const event: Event = {
      id: selectedEvent ? selectedEvent.id : Date.now().toString(),
      name,
      startTime,
      endTime,
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
          <Input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
          <Input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
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

