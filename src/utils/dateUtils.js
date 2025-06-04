import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
import relativeTime from 'dayjs/plugin/relativeTime'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'

// Extend dayjs with plugins
dayjs.extend(isToday)
dayjs.extend(relativeTime)
dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)

// Get today's date in YYYY-MM-DD format
export const getTodayDate = () => {
  return dayjs().format('YYYY-MM-DD')
}

// Check if a date is today
export const isDateToday = (date) => {
  return dayjs(date).isToday()
}

// Check if a date is in the future
export const isDateFuture = (date) => {
  return dayjs(date).isAfter(dayjs(), 'day')
}

// Check if a date is in the past
export const isDatePast = (date) => {
  return dayjs(date).isBefore(dayjs(), 'day')
}

// Format date for display
export const formatDate = (date, format = 'MMMM D, YYYY') => {
  return dayjs(date).format(format)
}

// Format time for display
export const formatTime = (time) => {
  return dayjs(`2000-01-01 ${time}`).format('h:mm A')
}

// Get relative time (e.g., "2 days ago", "in 3 days")
export const getRelativeTime = (date) => {
  return dayjs(date).fromNow()
}

// Combine date and time for sorting
export const getDateTime = (date, time) => {
  return dayjs(`${date} ${time}`)
}

// Check if an event is happening now (within the current hour)
export const isEventNow = (date, time) => {
  const eventDateTime = dayjs(`${date} ${time}`)
  const now = dayjs()

  return eventDateTime.isSame(now, 'hour') && eventDateTime.isSame(now, 'day')
}

// Get days until/since event
export const getDaysUntilEvent = (date) => {
  const eventDate = dayjs(date)
  const today = dayjs()

  if (eventDate.isToday()) {
    return 0
  } else if (eventDate.isAfter(today)) {
    return eventDate.diff(today, 'day')
  } else {
    return -today.diff(eventDate, 'day')
  }
}

// Sort events by date and time
export const sortEventsByDateTime = (events, order = 'asc') => {
  return events.sort((a, b) => {
    const dateTimeA = getDateTime(a.date, a.time)
    const dateTimeB = getDateTime(b.date, b.time)

    if (order === 'desc') {
      return dateTimeB.diff(dateTimeA)
    }
    return dateTimeA.diff(dateTimeB)
  })
}

// Validate date format
export const isValidDate = (date) => {
  return dayjs(date).isValid()
}

// Validate time format
export const isValidTime = (time) => {
  return dayjs(`2000-01-01 ${time}`, 'YYYY-MM-DD HH:mm').isValid()
}