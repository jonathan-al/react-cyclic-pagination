import { useState } from 'react';
import type { UserData } from '../types';
import { usersData } from '../data/users';
import './App.css';

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentUser = usersData[currentIndex];
  const totalUsers = usersData.length;

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = Number(e.target.value);
    const index = usersData.findIndex((u: UserData) => u.idPerson === selectedId);
    setCurrentIndex(index);
  };

  const handlePrev = () => {
    // explanation: when reaching the start, it goes back to the end
    // if prev is 0, (0 - 1 + 6) % 6 = 5
    // if prev is 1, (1 - 1 + 6) % 6 = 0
    // if prev is 2, (2 - 1 + 6) % 6 = 1
    // if prev is 3, (3 - 1 + 6) % 6 = 2
    // if prev is 4, (4 - 1 + 6) % 6 = 3
    // if prev is 5, (5 - 1 + 6) % 6 = 4
    setCurrentIndex((prev) => (prev - 1 + totalUsers) % totalUsers);
  };

  const handleNext = () => {
    // explanation: when reaching the end, it goes back to the start
    // if prev is 5, (5 + 1) % 6 = 0
    // if prev is 4, (4 + 1) % 6 = 5
    // if prev is 3, (3 + 1) % 6 = 4
    // if prev is 2, (2 + 1) % 6 = 3
    // if prev is 1, (1 + 1) % 6 = 2
    // if prev is 0, (0 + 1) % 6 = 1
    setCurrentIndex((prev) => (prev + 1) % totalUsers);
  };

  return (
    <div>
      <h1>Patient Appointments</h1>

      <select value={currentUser.idPerson} onChange={handleSelectChange}>
        {usersData.map((user) => (
          <option key={user.idPerson} value={user.idPerson}>
            {user.data[0].name}
          </option>
        ))}
      </select>

      <div>
        <button onClick={handlePrev}>Prev</button>
        <button onClick={handleNext}>Next</button>
      </div>

      <h2>Appointments for {currentUser.data[0].name}</h2>
      <ul style={{ textAlign: 'left' }}>
        {currentUser.data.map((appointment) => (
          <li key={`${appointment.idPerson}-${appointment.doctor}`}>
            Doctor: {appointment.doctor} - Conclusion: {appointment.conclusion}
          </li>
        ))}
      </ul>
    </div>
  );
}