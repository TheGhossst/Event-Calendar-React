import { Button } from './ui/button'
import { Event } from '../types/event'

interface EventListProps {
  events: Event[]
  onEditEvent: (event: Event) => void
}

export default function EventList({ events, onEditEvent }: EventListProps) {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-2">Events</h2>
      {events.length === 0 ? (
        <p>No events today.</p>
      ) : (
        <ul className="space-y-2">
          {events.map(event => (
            <li key={event.id} className="bg-white p-2 rounded shadow">
              <h3 className="font-bold">{event.name}</h3>
              <p className="text-sm">
                {new Date(event.startTime).toLocaleTimeString()} - {new Date(event.endTime).toLocaleTimeString()}
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

