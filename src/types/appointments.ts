// Types for the Patient Appointments application

export interface Appointment {
  idPerson: number;
  name: string;
  doctor: string;
  conclusion: string;
}

export interface UserData {
  idPerson: number;
  data: Appointment[];
}