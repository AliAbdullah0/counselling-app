"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Mail, MapPin, MessageCircle, User, Search, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

import { sendContactRequest } from "@/actions/request.actions";
import axios from "axios";
import { usePatient } from "@/context/Patient";

type Doctor = {
  id: string;
  name: string;
  qualification: string;
  speciality: string;
  clinicAddress: string;
  whatsappNumber: string;
  buisnessEmail: string;
  verified: boolean;
};

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [formData, setFormData] = useState({ name: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const { patient } = usePatient();

  const fetchDoctors = async () => {
    try {
      const res = await axios.get("/api/doctors");
      setDoctors(res.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      toast.error("Failed to load doctors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const filteredDoctors = useMemo(() => {
    if (!searchQuery.trim()) return doctors;

    const query = searchQuery.toLowerCase().trim();
    return doctors.filter((doctor) =>
      doctor.name.toLowerCase().includes(query) ||
      doctor.speciality.toLowerCase().includes(query)
    );
  }, [doctors, searchQuery]);

  const openWhatsApp = (doctor: Doctor) => {
    const message = `Hello Dr. ${doctor.name}, I would like to connect with you regarding mental health support.`;
    const whatsappUrl = `https://wa.me/${doctor.whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleEmailContact = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setFormData({ name: "", message: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDoctor || !formData.message.trim()) return;

    setSubmitting(true);

    try {
      const patientId = patient?.id;
      await sendContactRequest({
        patientId,
        doctorId: selectedDoctor.id,
        message: formData.message.trim(),
      });

      toast.success("Contact request sent successfully!");
      setTimeout(() => {
        setSelectedDoctor(null);
        setFormData({ name: "", message: "" });
      }, 1200);

    } catch (error: any) {
      toast.error(error.message || "Failed to send contact request");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto py-12 px-4">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900">Our Doctors</h1>
          <p className="text-lg text-gray-600 mt-3">Connect with experienced mental health professionals</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader className="pb-5">
                <div className="flex justify-between items-start">
                  <div className="space-y-3">
                    <Skeleton className="h-7 w-52" />
                    <div className="flex gap-3">
                      <Skeleton className="h-5 w-24 rounded-full" />
                      <Skeleton className="h-5 w-28" />
                    </div>
                  </div>
                  <Skeleton className="h-12 w-12 rounded-full" />
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-5">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
                <div className="flex gap-3 pt-4">
                  <Skeleton className="h-11 flex-1 rounded-xl" />
                  <Skeleton className="h-11 flex-1 rounded-xl" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900">Our Doctors</h1>
        <p className="text-lg text-gray-600 mt-3 max-w-md mx-auto">
          Connect with experienced and qualified mental health professionals
        </p>
      </div>

      <div className="mb-12 max-w-xl mx-auto relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search doctors by name or speciality..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-11 py-6 text-base border-gray-200 focus:border-cyan-500 rounded-full"
          />
        </div>
        {searchQuery && (
          <p className="text-sm text-gray-500 mt-3 text-center">
            Showing {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? "s" : ""}
          </p>
        )}
      </div>

      {filteredDoctors.length === 0 && (
        <div className="text-center py-20">
          <p className="text-xl text-gray-500">No doctors found matching your search.</p>
          <Button
            variant="outline"
            onClick={() => setSearchQuery("")}
            className="mt-6 rounded-full"
          >
            Clear Search
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((doctor) => (
          <Card
            key={doctor.id}
            className="bg-white overflow-hidden hover:bg-gray-50 transition-all duration-300 h-full flex flex-col"
          >
            <CardHeader className="pb-5">
              <div className="flex justify-between items-start">
                <div className="space-y-3 flex-1 pr-4">
                  <CardTitle className="text-xl font-semibold text-gray-900 tracking-tight leading-tight">
                    {doctor.name}
                  </CardTitle>

                  <div className="flex items-center gap-3 flex-wrap">
                    <Badge
                      variant={doctor.verified ? "default" : "secondary"}
                      className="text-xs font-medium px-3 py-1 rounded-full"
                    >
                      {doctor.verified ? "✓ Verified" : "Unverified"}
                    </Badge>
                    <span className="text-cyan-600 font-medium text-sm">
                      {doctor.speciality}
                    </span>
                  </div>
                </div>

                <User className="h-12 w-12 text-gray-100 flex-shrink-0" />
              </div>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col">
              <div className="space-y-5 text-sm text-gray-700 flex-1">
                <div className="flex items-start gap-3">
                  <span className="font-medium min-w-[100px] text-gray-500">Qualification</span>
                  <span className="leading-relaxed">{doctor.qualification}</span>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 mt-0.5 text-gray-400 flex-shrink-0" />
                  <span className="leading-relaxed">{doctor.clinicAddress}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-8 mt-auto border-t border-gray-100">
                <Button
                  onClick={() => openWhatsApp(doctor)}
                  className="flex-1 bg-[#0c963e] hover:bg-[#20ba5a] text-white font-medium py-3 rounded-xl transition-all active:scale-[0.985]"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  WhatsApp
                </Button>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      onClick={() => handleEmailContact(doctor)}
                      variant="outline"
                      className="flex-1 py-3 border-gray-200 hover:bg-gray-50 hover:border-gray-300 rounded-xl font-medium transition-all active:scale-[0.985]"
                    >
                      <Mail className="mr-2 h-5 w-5" />
                      Contact Request
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="sm:max-w-md rounded-3xl">
                    <DialogHeader>
                      <DialogTitle>Connect with Dr. {selectedDoctor?.name}</DialogTitle>
                      <DialogDescription>
                        Send a contact request. The doctor will review and respond.
                      </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-6 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-700">Your Full Name</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Enter your full name"
                          className="rounded-2xl"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-gray-700">Message</Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Introduce yourself and tell the doctor how they can help you..."
                          rows={5}
                          className="rounded-2xl resize-y"
                          required
                        />
                      </div>

                      <div className="flex gap-3 pt-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setSelectedDoctor(null)}
                          className="flex-1 rounded-2xl"
                          disabled={submitting}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          disabled={submitting}
                          className="flex-1 rounded-2xl"
                        >
                          {submitting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Sending...
                            </>
                          ) : (
                            "Send Request"
                          )}
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DoctorsPage;