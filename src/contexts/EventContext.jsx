import { createContext, useContext, useReducer, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'
import { message } from 'antd'
import { useLocalStorage } from '../hooks/useLocalStorage'

const EventContext = createContext()

const initialEvents = [
  {
    id: uuidv4(),
    title: 'Team Meeting',
    description: 'Weekly team sync and project updates',
    date: new Date().toISOString().split('T')[0],
    time: '10:00',
    location: 'Conference Room A',
    createdAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    title: 'Product Launch',
    description: 'Launch event for our new product line',
    date: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0], // 3 days from now
    time: '14:00',
    location: 'Main Auditorium',
    createdAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    title: 'Training Workshop',
    description: 'Skills development workshop for all employees',
    date: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0], // 7 days from now
    time: '09:00',
    location: 'Training Center',
    createdAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    title: 'Company Retreat',
    description: 'Annual company retreat and team building activities',
    date: new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0], // 2 days ago
    time: '08:00',
    location: 'Resort Center',
    createdAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    title: 'Client Presentation',
    description: 'Quarterly results presentation to key clients',
    date: new Date(Date.now() - 86400000 * 5).toISOString().split('T')[0], // 5 days ago
    time: '15:30',
    location: 'Boardroom',
    createdAt: new Date().toISOString()
  }
]

// Action types
const actionTypes = {
  SET_EVENTS: 'SET_EVENTS',
  ADD_EVENT: 'ADD_EVENT',
  UPDATE_EVENT: 'UPDATE_EVENT',
  DELETE_EVENT: 'DELETE_EVENT',
  SET_LOADING: 'SET_LOADING'
}

// Reducer function
const eventReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_EVENTS:
      return {
        ...state,
        events: action.payload,
        loading: false
      }
    case actionTypes.ADD_EVENT:
      return {
        ...state,
        events: [...state.events, action.payload],
        loading: false
      }
    case actionTypes.UPDATE_EVENT:
      return {
        ...state,
        events: state.events.map(event =>
          event.id === action.payload.id ? action.payload : event
        ),
        loading: false
      }
    case actionTypes.DELETE_EVENT:
      return {
        ...state,
        events: state.events.filter(event => event.id !== action.payload),
        loading: false
      }
    case actionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      }
    default:
      return state
  }
}

// Initial state
const initialState = {
  events: [],
  loading: false
}

export const EventProvider = ({ children }) => {
  const [state, dispatch] = useReducer(eventReducer, initialState)
  const [storedEvents, setStoredEvents] = useLocalStorage('events', initialEvents)

  // Load events from localStorage on component mount
  useEffect(() => {
    dispatch({ type: actionTypes.SET_EVENTS, payload: storedEvents })
  }, [storedEvents])

  // Save events to localStorage whenever events change
  useEffect(() => {
    if (state.events.length > 0) {
      setStoredEvents(state.events)
    }
  }, [state.events, setStoredEvents])

  // Action creators
  const addEvent = async (eventData) => {
    try {
      dispatch({ type: actionTypes.SET_LOADING, payload: true })

      const newEvent = {
        ...eventData,
        id: uuidv4(),
        createdAt: new Date().toISOString()
      }

      dispatch({ type: actionTypes.ADD_EVENT, payload: newEvent })
      message.success('Event added successfully!')
      return newEvent
    } catch (error) {
      message.error('Failed to add event')
      dispatch({ type: actionTypes.SET_LOADING, payload: false })
      throw error
    }
  }

  const updateEvent = async (eventId, eventData) => {
    try {
      dispatch({ type: actionTypes.SET_LOADING, payload: true })

      const updatedEvent = {
        ...eventData,
        id: eventId,
        updatedAt: new Date().toISOString()
      }

      dispatch({ type: actionTypes.UPDATE_EVENT, payload: updatedEvent })
      message.success('Event updated successfully!')
      return updatedEvent
    } catch (error) {
      message.error('Failed to update event')
      dispatch({ type: actionTypes.SET_LOADING, payload: false })
      throw error
    }
  }

  const deleteEvent = async (eventId) => {
    try {
      dispatch({ type: actionTypes.SET_LOADING, payload: true })

      dispatch({ type: actionTypes.DELETE_EVENT, payload: eventId })
      message.success('Event deleted successfully!')
    } catch (error) {
      message.error('Failed to delete event')
      dispatch({ type: actionTypes.SET_LOADING, payload: false })
      throw error
    }
  }

  const refreshEvents = async () => {
    try {
      dispatch({ type: actionTypes.SET_LOADING, payload: true })

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500))

      dispatch({ type: actionTypes.SET_EVENTS, payload: state.events })
      message.success('Events refreshed!')
    } catch (error) {
      message.error('Failed to refresh events')
      dispatch({ type: actionTypes.SET_LOADING, payload: false })
    }
  }

  const value = {
    events: state.events,
    loading: state.loading,
    addEvent,
    updateEvent,
    deleteEvent,
    refreshEvents
  }

  return (
    <EventContext.Provider value={value}>
      {children}
    </EventContext.Provider>
  )
}

export const useEvents = () => {
  const context = useContext(EventContext)
  if (!context) {
    throw new Error('useEvents must be used within an EventProvider')
  }
  return context
}