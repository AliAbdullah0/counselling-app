"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { User, Mail, Phone, Calendar, MapPin } from "lucide-react";

type Patient = {
  id: string;
  name: string;
  email: string;
  contactNo?: string;
  age?: string;
  address?: string;
  doctorId?: string;
  createdAt: string;
};

const PatientPage = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPatients = async () => {
    try {
      const res = await axios.get("/api/patients");
      console.log("Fetched patients:", res.data);
      setPatients(res.data.res);
    } catch (error) {
      console.error("Error fetching patients:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-10 px-6">
        <div className="mb-8">
          <Skeleton className="h-10 w-64" />
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Patients</h1>
          <p className="text-gray-600 mt-2">Manage and view all registered patients</p>
        </div>
        <Badge variant="outline" className="px-4 py-2 text-sm">
          Total: {patients.length}
        </Badge>
      </div>

      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="text-xl">All Patients</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12"></TableHead>
                <TableHead>Patient Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Assigned Doctor</TableHead>
                <TableHead className="text-right">Joined</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-20 text-gray-500">
                    No patients found
                  </TableCell>
                </TableRow>
              ) : (
                patients.map((patient) => (
                  <TableRow key={patient.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-gray-500" />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-gray-900">
                      {patient.name}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail className="h-4 w-4" />
                        {patient.email}
                      </div>
                    </TableCell>
                    <TableCell>
                      {patient.contactNo ? (
                        <div className="flex items-center gap-2 text-gray-600">
                          <Phone className="h-4 w-4" />
                          {patient.contactNo}
                        </div>
                      ) : (
                        <span className="text-gray-400 text-sm">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {patient.age ? (
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span>{patient.age} years</span>
                        </div>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </TableCell>
                    <TableCell className="max-w-xs truncate text-gray-600">
                      {patient.address || "—"}
                    </TableCell>
                    <TableCell>
                      {patient.doctorId ? (
                        <Badge variant="secondary" className="font-normal">
                          Assigned
                        </Badge>
                      ) : (
                        <span className="text-gray-400 text-sm">Not Assigned</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right text-gray-500 text-sm">
                      {new Date(patient.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientPage;