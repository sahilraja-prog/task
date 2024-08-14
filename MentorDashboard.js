import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MentorDashboard = () => {
  const [mentors, setMentors] = useState([]);

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

  return (
    <div>
      <h1>Mentor Dashboard</h1>
      {mentors.map((mentor) => (
        <div key={mentor.id}>
          <h2>{mentor.name}</h2>
          <p>Availability: {mentor.availability}</p>
          {/* Add additional mentor details and scheduling functionality here */}
        </div>
      ))}
    </div>
  );
};

export default MentorDashboard;
