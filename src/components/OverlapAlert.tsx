import { Alert, AlertDescription, AlertTitle } from './ui/alert'
import { Button } from './ui/button'
import { X } from 'lucide-react'

interface OverlapAlertProps {
    onConfirm: () => void
    onCancel: () => void
}

export function OverlapAlert({ onConfirm, onCancel }: OverlapAlertProps) {
    return (
        <Alert variant="destructive" className="fixed top-4 right-4 w-96 z-50">
            <AlertTitle className="flex items-center justify-between">
                Event Overlap Detected
                <Button variant="ghost" size="sm" onClick={onCancel}>
                    <X className="h-4 w-4" />
                </Button>
            </AlertTitle>
            <AlertDescription>
                <p className="mb-4">The event you're trying to move overlaps with an existing event on this day.</p>
                <div className="flex justify-end space-x-2">
                    <Button variant="outline" size="sm" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button variant="destructive" size="sm" onClick={onConfirm}>
                        Move Anyway
                    </Button>
                </div>
            </AlertDescription>
        </Alert>
    )
}