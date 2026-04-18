export type ContactRequest = {
  id: string;
  message: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  patientId: string;
  doctorId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Doctor = {
  id: string;
  name: string;
  email: string;
  password: string;
  qualification: string;
  clinicAddress: string;
  contactNo: string;
  whatsappNumber: string;
  buisnessEmail: string;
  education: string;
  verified: boolean;
  speciality: string;
  createdAt: Date;
  updatedAt: Date;

  patients: Patient[];
  contactRequests: ContactRequest[];
};


export type Patient = {
  id: string;
  name: string;
  email: string;
  password: string;
  contactNo?: string | null;
  age?: string | null;
  address: string;

  doctorId?: string | null;
  doctor?: Doctor | null;

  createdAt: Date;
  updatedAt: Date;
};