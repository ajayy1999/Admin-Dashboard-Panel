import { isDateToday, isDateFuture, isDatePast, sortEventsByDateTime } from './dateUtils'

// Categorize events into today, future, and past
export const categorizeEvents = (events) => {
  const todayEvents = []
  const futureEvents = []
  const pastEvents = []

  events.forEach(event => {
    if (isDateToday(event.date)) {
      todayEvents.push(event)
    } else if (isDateFuture(event.date)) {
      futureEvents.push(event)
    } else if (isDatePast(event.date)) {
      pastEvents.push(event)
    }
  })

  return {
    today: sortEventsByDateTime(todayEvents, 'asc'),
    future: sortEventsByDateTime(futureEvents, 'asc'),
    past: sortEventsByDateTime(pastEvents, 'desc')
  }
}

// Get events for a specific category with limit
export const getEventsForCategory = (events, category, limit = 3) => {
  const categorized = categorizeEvents(events)
  const categoryEvents = categorized[category] || []

  // If limit is specified and we have more events than limit, return limited set
  if (limit && categoryEvents.length > limit) {
    return categoryEvents.slice(0, limit)
  }

  return categoryEvents
}

// Get total count of events in each category
export const getEventCounts = (events) => {
  const categorized = categorizeEvents(events)

  return {
    today: categorized.today.length,
    future: categorized.future.length,
    past: categorized.past.length,
    total: events.length
  }
}

// Search events by title or description
export const searchEvents = (events, searchTerm) => {
  if (!searchTerm) return events

  const term = searchTerm.toLowerCase()
  return events.filter(event =>
    event.title.toLowerCase().includes(term) ||
    event.description.toLowerCase().includes(term) ||
    event.location.toLowerCase().includes(term)
  )
}

// Filter events by date range
export const filterEventsByDateRange = (events, startDate, endDate) => {
  if (!startDate && !endDate) return events

  return events.filter(event => {
    const eventDate = new Date(event.date)

    if (startDate && endDate) {
      return eventDate >= new Date(startDate) && eventDate <= new Date(endDate)
    } else if (startDate) {
      return eventDate >= new Date(startDate)
    } else if (endDate) {
      return eventDate <= new Date(endDate)
    }

    return true
  })
}

// Validate event data
export const validateEvent = (eventData) => {
  const errors = {}

  if (!eventData.title || eventData.title.trim() === '') {
    errors.title = 'Title is required'
  }

  if (!eventData.date) {
    errors.date = 'Date is required'
  }

  if (!eventData.time) {
    errors.time = 'Time is required'
  }

  if (!eventData.location || eventData.location.trim() === '') {
    errors.location = 'Location is required'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

// Generate event summary
export const generateEventSummary = (events) => {
  const counts = getEventCounts(events)
  const upcomingEvents = getEventsForCategory(events, 'future', 5)

  return {
    ...counts,
    upcomingEvents,
    hasEventsToday: counts.today > 0,
    nextEvent: upcomingEvents.length > 0 ? upcomingEvents[0] : null
  }
}