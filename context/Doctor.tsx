"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import type { Doctor } from "@/types/types";

type DoctorContextType = {
  doctor: Doctor | null;
  loading: boolean;
  refreshDoctor: () => Promise<void>;
};

const DoctorContext = createContext<DoctorContextType | null>(null);

export const DoctorProvider = ({ children }: { children: ReactNode }) => {
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDoctor = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/doctor/me");
      const json = await res.json();
        console.log("Doctor fetch response:", json);
      if (json.status === 200) {
        setDoctor(json.data);
      } else {
        setDoctor(null);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctor();
  }, []);

  return (
    <DoctorContext.Provider
      value={{
        doctor,
        loading,
        refreshDoctor: fetchDoctor,
      }}
    >
      {children}
    </DoctorContext.Provider>
  );
};

export const useDoctor = () => {
  const context = useContext(DoctorContext);

  if (!context) {
    throw new Error("useDoctor must be used inside DoctorProvider");
  }

  return context;
};