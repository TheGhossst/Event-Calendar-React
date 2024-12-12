import { useState, useEffect } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import CalendarGrid from './CalendarGrid'
import EventModal from './EventModal'
import EventList from './EventList'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { ChevronLeft, ChevronRight, Download } from 'lucide-react'
import { Event } from '../types/event'

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [events, setEvents] = useState<Event[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [filterKeyword, setFilterKeyword] = useState('')

  useEffect(() => {
    const storedEvents = localStorage.getItem('events')
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events))
  }, [events])

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const handleDateClick = (date: Date) => {
    setSelectedDate(date)
    setSelectedEvent(null)
    setIsModalOpen(true)
  }

  const handleAddEvent = (newEvent: Event) => {
    setEvents([...events, newEvent])
    setIsModalOpen(false)
  }

  const handleEditEvent = (updatedEvent: Event) => {
    setEvents(events.map(event => event.id === updatedEvent.id ? updatedEvent : event))
    setIsModalOpen(false)
  }

  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter(event => event.id !== eventId))
    setIsModalOpen(false)
  }

  const handleEventReschedule = (event: Event, newDate: Date) => {
    const oldStartDate = new Date(event.startTime)
    const oldEndDate = new Date(event.endTime)
    const timeDiff = newDate.getTime() - oldStartDate.setHours(0, 0, 0, 0)

    const updatedEvent: Event = {
      ...event,
      startTime: new Date(oldStartDate.getTime() + timeDiff).toISOString(),
      endTime: new Date(oldEndDate.getTime() + timeDiff).toISOString(),
    }

    setEvents(prevEvents => prevEvents.map(e => e.id === event.id ? updatedEvent : e))
  }

  const handleExportEvents = () => {
    const eventsToExport = events.filter(event => {
      const eventDate = new Date(event.startTime)
      return eventDate.getMonth() === currentDate.getMonth() && eventDate.getFullYear() === currentDate.getFullYear()
    })

    const dataStr = JSON.stringify(eventsToExport, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)
    const exportFileDefaultName = `events_${currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}.json`

    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  const filteredEvents = events.filter(event =>
    event.name.toLowerCase().includes(filterKeyword.toLowerCase()) ||
    event.description?.toLowerCase().includes(filterKeyword.toLowerCase())
  )

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">
            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </h1>
          <div className="flex items-center space-x-2">
            <Button onClick={handlePrevMonth} variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button onClick={handleNextMonth} variant="outline" size="icon">
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button onClick={handleExportEvents} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Events
            </Button>
          </div>
        </div>
        <Input
          type="text"
          placeholder="Filter events..."
          value={filterKeyword}
          onChange={(e) => setFilterKeyword(e.target.value)}
          className="my-6"
        />
        <CalendarGrid
          currentDate={currentDate}
          events={filteredEvents}
          onDateClick={handleDateClick}
          onEventReschedule={handleEventReschedule}
        />
        {selectedDate && (
          <EventModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onAddEvent={handleAddEvent}
            onEditEvent={handleEditEvent}
            onDeleteEvent={handleDeleteEvent}
            selectedDate={selectedDate}
            selectedEvent={selectedEvent}
            events={events}
          />
        )}
        <EventList
          events={filteredEvents.filter(event =>
            new Date(event.startTime).toDateString() === selectedDate?.toDateString()
          )}
          onEditEvent={(event) => {
            setSelectedEvent(event)
            setIsModalOpen(true)
          }}
        />
      </div>
    </DndProvider>
  )
}