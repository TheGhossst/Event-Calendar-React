import { Button } from './ui/button'
import { Event } from '../types/event'

interface CalendarGridProps {
  currentDate: Date
  events: Event[]
  onDateClick: (date: Date) => void
}

export default function CalendarGrid({ currentDate, events, onDateClick }: CalendarGridProps) {
  const getCalendarDays = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()

    const days: Date[] = []
    const startDay = firstDay.getDay()

    for (let i = 0; i < startDay; i++) {
      days.push(new Date(year, month, -startDay + i + 1))
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }

    const remainingDays = 42 - days.length
    for (let i = 1; i <= remainingDays; i++) {
      days.push(new Date(year, month + 1, i))
    }

    return days
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth()
  }

  const getEventsForDate = (date: Date) => {
    return events.filter(event => new Date(event.startTime).toDateString() === date.toDateString())
  }

  const calendarDays = getCalendarDays(currentDate)

  return (
    <div className="grid grid-cols-7 gap-1">
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
        <div key={day} className="text-center font-bold p-2">{day}</div>
      ))}
      {calendarDays.map((day, index) => (
        <Button
          key={index}
          onClick={() => onDateClick(day)}
          variant="outline"
          className={`h-24 ${
            isToday(day) ? 'bg-blue-100 hover:bg-blue-200' : ''
          } ${
            !isCurrentMonth(day) ? 'text-gray-400' : ''
          } ${
            day.getDay() === 0 || day.getDay() === 6 ? 'bg-gray-100' : ''
          }`}
        >
          <div className="flex flex-col h-full w-full">
            <span className="text-sm">{day.getDate()}</span>
            <div className="flex-grow overflow-y-auto">
              {getEventsForDate(day).map(event => (
                <div key={event.id} className="text-xs bg-blue-500 text-white rounded px-1 my-1 truncate">
                  {event.name}
                </div>
              ))}
            </div>
          </div>
        </Button>
      ))}
    </div>
  )
}

