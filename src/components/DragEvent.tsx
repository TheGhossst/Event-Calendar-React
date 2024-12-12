import { useDrag } from 'react-dnd'
import { Event } from '../types/event'

interface DraggableEventProps {
    event: Event
}

export function DraggableEvent({ event }: DraggableEventProps) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'EVENT',
        item: { event },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }))

    return (
        <div
            ref={drag}
            className={`text-xs bg-blue-500 text-white rounded px-1 my-1 truncate cursor-move ${isDragging ? 'opacity-50' : ''
                }`}
        >
            {event.name}
        </div>
    )
}