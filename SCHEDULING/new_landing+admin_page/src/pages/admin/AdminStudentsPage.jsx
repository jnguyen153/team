// src/pages/admin/AdminStudentsPage.jsx
import React, { useState, useEffect } from 'react';
import { fetchStudents, updateStudent } from '../../services/api';

export default function AdminStudentsPage() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    loadStudents();
  }, []);

  async function loadStudents() {
    try {
      const data = await fetchStudents();
      setStudents(data);
    } catch (err) {
      console.error('Error loading students', err);
    }
  }

  async function handleInternationalChange(studentId, value) {
    const isInternational = value === 'Yes';
    const currentStu = students.find(s => s.id === studentId);
    let newMaxHours = currentStu?.maxHours || 0;

    if (isInternational && newMaxHours > 20) {
      newMaxHours = 20;
    }

    try {
      await updateStudent(studentId, {
        isInternational,
        maxHours: newMaxHours,
      });
      setStudents(prev =>
        prev.map(s =>
          s.id === studentId
            ? { ...s, isInternational, maxHours: newMaxHours }
            : s
        )
      );
    } catch (err) {
      console.error('Error updating student', err);
    }
  }

  async function handleMaxHoursChange(studentId, newHours) {
    try {
      await updateStudent(studentId, { maxHours: Number(newHours) });
      setStudents(prev =>
        prev.map(s =>
          s.id === studentId ? { ...s, maxHours: Number(newHours) } : s
        )
      );
    } catch (err) {
      console.error('Error updating max hours', err);
    }
  }

  return (
    <div className="p-3">
      <h2>Manage Students</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>International?</th>
            <th>Max Hours</th>
            <th>iCal Uploaded?</th>
          </tr>
        </thead>
        <tbody>
          {students.map(stu => (
            <tr key={stu.id}>
              <td>{stu.name}</td>
              <td>
                <select
                  value={stu.isInternational ? 'Yes' : 'No'}
                  onChange={e =>
                    handleInternationalChange(stu.id, e.target.value)
                  }
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </td>
              <td>
                {/* If international, you could disable this, or allow override */}
                <input
                  type="number"
                  value={stu.maxHours || 0}
                  onChange={e =>
                    handleMaxHoursChange(stu.id, e.target.value)
                  }
                  disabled={stu.isInternational}
                />
              </td>
              <td>{stu.icalSubmitted ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
