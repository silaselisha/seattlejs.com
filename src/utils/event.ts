import type { SJSEvent } from '@/data/types'

// "17:30" -> "5:30pm", "20:00" -> "8pm"
export function formatTime(time: string): string {
  const [hours, minutes] = time.split(':').map(Number)
  const suffix = hours >= 12 ? 'pm' : 'am'
  const hour12 = hours % 12 || 12
  return minutes
    ? `${hour12}:${String(minutes).padStart(2, '0')}${suffix}`
    : `${hour12}${suffix}`
}

// "5:30pm - 8:30pm", "5:30pm", or undefined when the event has no times
export function formatEventTime(
  event: Pick<SJSEvent, 'startTime' | 'endTime'>,
): string | undefined {
  const { startTime, endTime } = event
  if (startTime && endTime) {
    return `${formatTime(startTime)} - ${formatTime(endTime)}`
  }
  if (startTime) return formatTime(startTime)
  return undefined
}
