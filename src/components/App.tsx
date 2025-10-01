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

  // Prev y Next ahora son cíclicos
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalUsers) % totalUsers);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalUsers);
  };

  return (
    <div>
      <h1>Patient Appointments</h1>

      {/* Select de pacientes */}
      <select value={currentUser.idPerson} onChange={handleSelectChange}>
        {usersData.map((user) => (
          <option key={user.idPerson} value={user.idPerson}>
            {user.data[0].name}
          </option>
        ))}
      </select>

      {/* Botones de navegación */}
      <div>
        <button onClick={handlePrev}>Prev</button>
        <button onClick={handleNext}>Next</button>
      </div>

      {/* Mostrar citas */}
      <h2>Appointments for {currentUser.data[0].name}</h2>
      <ul>
        {currentUser.data.map((appointment) => (
          <li key={`${appointment.idPerson}-${appointment.doctor}`}>
            Doctor: {appointment.doctor} - Conclusion: {appointment.conclusion}
          </li>
        ))}
      </ul>
    </div>
  );
}