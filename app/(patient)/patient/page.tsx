"use client"

import axios from "axios";

const PatientPage = () => {
  const fetchPatients = async () => {
    try {
      const res = await axios("/api/patients");
      setPatients(res.data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>PatientPage</div>
  )
}

export default PatientPage