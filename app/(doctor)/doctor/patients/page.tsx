"use client";

import React, { useEffect, useState } from "react";
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
import { toast } from "sonner";

import { getAcceptedPatients } from "@/actions/request.actions";

type Patient = {
  id: string;
  name: string;
  email: string;
  contactNo?: string | null;
  age?: string | null;
  address?: string | null;
  createdAt: string;
  updatedAt: string;
};

const AcceptedPatientsPage = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAcceptedPatients = async () => {
    try {
      const data = await getAcceptedPatients();
      const formattedData = data.map((patient) => ({
        ...patient,
        createdAt: patient.createdAt instanceof Date 
          ? patient.createdAt.toISOString() 
          : patient.createdAt,
        updatedAt: patient.updatedAt instanceof Date 
          ? patient.updatedAt.toISOString() 
          : patient.updatedAt,
      }));
      setPatients(formattedData);
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to load accepted patients");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAcceptedPatients();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-10 px-6">
        <div className="mb-8">
          <Skeleton className="h-10 w-80" />
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
          <h1 className="text-4xl font-bold text-gray-900">Accepted Patients</h1>
          <p className="text-gray-600 mt-2">Patients whose contact requests you have accepted</p>
        </div>
        <Badge variant="outline" className="px-4 py-2 text-sm">
          Total: {patients.length}
        </Badge>
      </div>

      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="text-xl">Accepted Patients</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12"></TableHead>
                <TableHead>Patient Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Contact No.</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Address</TableHead>
                <TableHead className="text-right">Accepted On</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-20 text-gray-500">
                    You haven't accepted any patient requests yet.
                  </TableCell>
                </TableRow>
              ) : (
                patients.map((patient) => (
                  <TableRow key={patient.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="w-9 h-9 bg-emerald-100 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-emerald-600" />
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
                    <TableCell className="text-right text-gray-500 text-sm">
                      {new Date(patient.updatedAt).toLocaleDateString("en-US", {
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

export default AcceptedPatientsPage;