import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentScheduler = () => {
  const [mentors, setMentors] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [duration, setDuration] = useState(30);
  const [availableSlots, setAvailableSlots] = useState([]);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await axios.get('/api/mentors');
        setMentors(response.data);
      } catch (error) {
        console.error('Error fetching mentors:', error);
      }
    };
    fetchMentors();
  }, []);

  useEffect(() => {
    if (selectedMentor) {
      const fetchSlots = async () => {
        try {
          const response = await axios.get(`/api/slots?mentorId=${selectedMentor}&duration=${duration}`);
          setAvailableSlots(response.data);
        } catch (error) {
          console.error('Error fetching slots:', error);
        }
      };
      fetchSlots();
    }
  }, [selectedMentor, duration]);

  const handleSchedule = async (slot) => {
    try {
      await axios.post('/api/schedule', { mentorId: selectedMentor, duration, slot });
      // Handle successful scheduling (e.g., redirect to payment page)
    } catch (error) {
      console.error('Error scheduling:', error);
    }
  };

  return (
    <div>
      <h1>Student Scheduler</h1>
      <select onChange={(e) => setSelectedMentor(e.target.value)}>
        <option value="">Select Mentor</option>
        {mentors.map((mentor) => (
          <option key={mentor.id} value={mentor.id}>
            {mentor.name}
          </option>
        ))}
      </select>
      <select onChange={(e) => setDuration(Number(e.target.value))}>
        <option value={30}>30 mins</option>
        <option value={45}>45 mins</option>
        <option value={60}>60 mins</option>
      </select>
      <ul>
        {availableSlots.map((slot) => (
          <li key={slot}>
            {slot} <button onClick={() => handleSchedule(slot)}>Schedule</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentScheduler;
