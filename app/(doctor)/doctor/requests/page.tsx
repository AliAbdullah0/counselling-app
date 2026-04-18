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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { User, Mail, Phone, Calendar, CheckCircle, Clock } from "lucide-react";
import { toast } from "sonner";

import { getCurrentDoctorRequests, acceptContactRequest } from "@/actions/request.actions";


type ContactRequest = {
  id: string;
  message: string;
  createdAt: string;
  patient: {
    id: string;
    name: string;
    email: string;
    contactNo?: string | null;
    age?: string | null;
  };
};

const DoctorRequestsPage = () => {
  const [requests, setRequests] = useState<ContactRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [acceptingId, setAcceptingId] = useState<string | null>(null);

  const fetchRequests = async () => {
    try {
      const data = await getCurrentDoctorRequests();
      const formattedData = data.map((req) => ({
        ...req,
        createdAt: req.createdAt instanceof Date 
          ? req.createdAt.toISOString() 
          : req.createdAt,
      }));
      setRequests(formattedData);
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (requestId: string) => {
    setAcceptingId(requestId);
    try {
      await acceptContactRequest(requestId);
      toast.success("Request accepted successfully!");
      
      const updatedRequests = requests.filter(req => req.id !== requestId);
      setRequests(updatedRequests);
    } catch (error: any) {
      toast.error(error.message || "Failed to accept request");
    } finally {
      setAcceptingId(null);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-10 px-6">
        <div className="mb-8">
          <Skeleton className="h-10 w-96" />
        </div>
        <Card>
          <CardContent className="p-8">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-20 w-full mb-4" />
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Contact Requests</h1>
          <p className="text-gray-600 mt-2">Review and accept new patient connection requests</p>
        </div>
        <Badge variant="outline" className="px-4 py-2 text-sm">
          Pending: {requests.length}
        </Badge>
      </div>

      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Pending Requests
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12"></TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Message</TableHead>
                <TableHead className="text-right">Requested On</TableHead>
                <TableHead className="text-right w-40">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-20 text-gray-500">
                    No pending contact requests at the moment.
                  </TableCell>
                </TableRow>
              ) : (
                requests.map((req) => (
                  <TableRow key={req.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="w-9 h-9 bg-cyan-100 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-cyan-600" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-gray-900">{req.patient.name}</p>
                        <p className="text-sm text-gray-500">{req.patient.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {req.patient.contactNo ? (
                        <div className="flex items-center gap-2 text-gray-600">
                          <Phone className="h-4 w-4" />
                          {req.patient.contactNo}
                        </div>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {req.patient.age ? `${req.patient.age} years` : "—"}
                    </TableCell>
                    <TableCell>
                      <p className="text-sm text-gray-700 line-clamp-2 max-w-md">
                        {req.message}
                      </p>
                    </TableCell>
                    <TableCell className="text-right text-gray-500 text-sm">
                      {new Date(req.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        onClick={() => handleAccept(req.id)}
                        disabled={acceptingId === req.id}
                        className="bg-green-600 hover:bg-green-700 rounded-xl"
                        size="sm"
                      >
                        {acceptingId === req.id ? (
                          <>Processing...</>
                        ) : (
                          <>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Accept
                          </>
                        )}
                      </Button>
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

export default DoctorRequestsPage;