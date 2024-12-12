import { Button } from './ui/button'
import { Event } from '../types/event'
import { format } from 'date-fns'

interface EventListProps {
  events: Event[]
  onEditEvent: (event: Event) => void
}

export default function EventList({ events, onEditEvent }: EventListProps) {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-2">Events</h2>
      {events.length === 0 ? (
        <p>No events for this day.</p>
      ) : (
        <ul className="space-y-2">
          {events.map(event => (
            <li key={event.id} className="bg-white p-2 rounded shadow">
              <h3 className="font-bold">{event.name}</h3>
              <p className="text-sm">
                {format(new Date(event.startTime), 'p')} - {format(new Date(event.endTime), 'p')}
              </p>
              {event.description && <p className="text-sm mt-1">{event.description}</p>}
              <Button onClick={() => onEditEvent(event)} variant="outline" size="sm" className="mt-2">
                Edit
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}