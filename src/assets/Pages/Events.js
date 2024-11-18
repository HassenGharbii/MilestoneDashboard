import React, { useEffect, useState } from 'react';
import axios from 'axios';

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [eventTypes, setEventTypes] = useState([]); // State to hold event types
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  // Fetch events data
  const fetchEvents = async () => {
    if (!token) {
      console.log('No token found in localStorage.');
      return;
    }

    console.log('Fetching events...'); // Debug log

    try {
      const response = await axios.get('http://localhost:5000/api/events', {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log('API response:', response.data); // Log the API response

      if (Array.isArray(response.data)) {
        setEvents(response.data);
      } else {
        setError('Unexpected response format for events.');
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      setError('Failed to load events data.');
    }
  };

  // Fetch event types from /api/eventTypes
  const fetchEventTypes = async () => {
    if (!token) {
      console.log('No token found in localStorage.');
      return;
    }

    console.log('Fetching event types...'); // Debug log

    try {
      const response = await axios.get('http://localhost:5000/api/eventTypes', {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log('Event Types API response:', response.data); // Log the response from /api/eventTypes

      // Assuming the response is an array of event types
      if (Array.isArray(response.data)) {
        setEventTypes(response.data);
      } else {
        setError('Unexpected response format for event types.');
      }
    } catch (error) {
      console.error('Error fetching event types:', error);
      setError('Failed to load event types data.');
    }
  };

  // Call the APIs to fetch data on mount
  useEffect(() => {
    fetchEvents();
    fetchEventTypes(); // Fetch event types as well
  }, [token]);

  // Log the events and event types after fetching them
  useEffect(() => {
    if (events.length > 0) {
      // Log the total number of events
      console.log(`Total events fetched: ${events.length}`);

      // Log each event
      events.forEach(event => {
        console.log('Event:', event);
        console.log('Event Type:', event.type); // Log the event type (assuming `type` is the correct property)
      });
    }
  }, [events]);

  useEffect(() => {
    if (eventTypes.length > 0) {
      // Log all the event types fetched from the /api/eventTypes endpoint
      console.log('Event Types:', eventTypes);
    }
  }, [eventTypes]);

  return (
    <div>
      <h1>Events</h1>
      {error && <div style={{ color: 'red' }}>{error}</div>}

      <div>
        {events.length === 0 ? (
          <p>No events found.</p>
        ) : (
          events
            .filter(event => event.name && event.name.toLowerCase().includes(searchQuery.toLowerCase())) // Ensure 'event.name' exists
            .map(event => (
              <div key={event.id}>
                <h3>{event.name}</h3>
                <p>{event.description}</p>
                <p><strong>Event Type:</strong> {event.type}</p> {/* Display event type */}
              </div>
            ))
        )}
      </div>

      <div>
        <h2>Event Types</h2>
        {eventTypes.length === 0 ? (
          <p>No event types found.</p>
        ) : (
          <ul>
            {eventTypes.map((type, index) => (
              <li key={index}>{type}</li> // Assuming event type is just a string
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default EventsPage;
