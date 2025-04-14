// src/pages/admin/AdminSchedulesPage.jsx
import React, { useState, useEffect } from 'react';
import { fetchSchedule, updateConstraints, generateSchedule } from '../../services/api';

export default function AdminSchedulesPage() {
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Additional constraints
  const [numberOfHours, setNumberOfHours] = useState(40);
  const [numberOfEmployees, setNumberOfEmployees] = useState(2);

  useEffect(() => {
    loadSchedule();
  }, []);

  async function loadSchedule() {
    try {
      setLoading(true);
      setError('');
      const data = await fetchSchedule(); // might return { timeBlocks: [...] }
      setSchedule(data);
    } catch (err) {
      setError('Error loading schedule');
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveConstraints() {
    // You might have an endpoint that saves coverage constraints or budget
    try {
      await updateConstraints({
        numberOfHours,
        numberOfEmployees
      });
      alert('Constraints updated');
    } catch (err) {
      console.error('Error saving constraints', err);
    }
  }

  async function handleGenerate() {
    try {
      setLoading(true);
      await generateSchedule(); // calls solver in your backend
      await loadSchedule(); // reload schedule
    } catch (err) {
      setError('Error generating schedule');
    } finally {
      setLoading(false);
    }
  }

  function handleExportCSV() {
    if (!schedule) return;
    // Build CSV from schedule data
    let csvContent = 'Time,Mon,Tue,Wed,Thu,Fri\n';
    schedule.timeBlocks.forEach(block => {
        csvContent += `${block.hour}:00,${block.monStudents.join(' & ')},${block.tueStudents.join(' & ')},${block.wedStudents.join(' & ')},...\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'final_schedule.csv';
    link.click();
  }

  return (
    <div className="p-3">
      <h2>Weekly Assignment Schedule</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading && <p>Loading...</p>}

      {/* Example constraints panel */}
      <div className="mb-3">
        <label>Number of Hours:</label>
        <input
          type="number"
          value={numberOfHours}
          onChange={e => setNumberOfHours(e.target.value)}
        />
        <label>Number of Employees:</label>
        <input
          type="number"
          value={numberOfEmployees}
          onChange={e => setNumberOfEmployees(e.target.value)}
        />
        <button onClick={handleSaveConstraints} className="btn btn-sm btn-secondary ms-2">
          Save Constraints
        </button>
        <button onClick={handleGenerate} className="btn btn-sm btn-primary ms-2">
          Generate Schedule
        </button>
        <button onClick={handleExportCSV} className="btn btn-sm btn-success ms-2">
          Export CSV
        </button>
      </div>

      {/* Show final schedule */}
      {!schedule ? (
        <p>No schedule yet.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Time</th>
              <th>Mon</th>
              <th>Tue</th>
              <th>Wed</th>
              <th>Thu</th>
              <th>Fri</th>
            </tr>
          </thead>
          <tbody>
            {schedule.timeBlocks.map(block => (
              <tr key={block.hour}>
                <td>{block.hour}:00</td>
                <td>{block.monStudents.join(', ')}</td>
                <td>{block.tueStudents.join(', ')}</td>
                <td>{block.wedStudents.join(', ')}</td>
                <td>{block.thuStudents.join(', ')}</td>
                <td>{block.friStudents.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
