"use client";

import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type PatientContextType = {
  patient: any;
  loading: boolean;
  refreshPatient: () => Promise<void>;
};

const PatientContext = createContext<PatientContextType | null>(null);

export const PatientProvider = ({ children }: { children: ReactNode }) => {
  const [patient, setPatient] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchPatient = async () => {
    try {
      setLoading(true);

      const res = await axios.get("/api/patient/me");
      const json = res.data;
        console.log("Patient fetch response:", json);
      if (json.status === 200) {
        setPatient(json.data);
      } else {
        setPatient(null);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatient();
  }, []);

  return (
    <PatientContext.Provider
      value={{
        patient,
        loading,
        refreshPatient: fetchPatient,
      }}
    >
      {children}
    </PatientContext.Provider>
  );
};

export const usePatient = () => {
  const context = useContext(PatientContext);

  if (!context) {
    throw new Error("usePatient must be used inside PatientProvider");
  }

  return context;
};