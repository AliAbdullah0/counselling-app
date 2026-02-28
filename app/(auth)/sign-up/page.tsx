"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { nanoid } from "nanoid";
import { toast } from "sonner";
import { Loader2, Dice5, ArrowLeft, ArrowRight } from "lucide-react";

import { createPatient } from "@/actions/user.actions";
import { createDoctor } from "@/actions/doctor.actions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ANIMALS = [
  "Lion",
  "Tiger",
  "Elephant",
  "Giraffe",
  "Zebra",
  "Kangaroo",
  "Panda",
  "Koala",
  "Penguin",
  "Dolphin",
  "Wolf",
  "Shark",
];

const generateUsername = () => {
  const word = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];
  return `anonymous-${word}-${nanoid(5)}`;
};

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [patientStep, setPatientStep] = useState(1);
  const [doctorStep, setDoctorStep] = useState(1);
  const [patientData, setPatientData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    contactNo: "",
    address: "",
  });
  const [doctorData, setDoctorData] = useState({
    name: "",
    email: "",
    password: "",
    qualification: "",
    speciality: "",
    clinicAddress: "",
    contactNo: "",
    whatsappNumber: "",
    buisnessEmail: "",
    education: "",
  });

  const handleRandomName = () => {
    const random = generateUsername();
    setPatientData({ ...patientData, name: random });
    toast.success("Random username generated!");
  };

  const handlePatientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPatientData({ ...patientData, [e.target.name]: e.target.value });
  };

  const handleDoctorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDoctorData({ ...doctorData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (type: "patient" | "doctor") => {
    setLoading(true);
    const data = type === "patient" ? patientData : doctorData;
    const form = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value) form.append(key, value);
    });

    const response =
      type === "patient" ? await createPatient(form) : await createDoctor(form);

    setLoading(false);

    if (response.status === 201) {
      toast.success(response.message);
      router.push(type === "patient" ? "/patient" : "/verify");
    } else {
      toast.error(response.message);
    }
  };

  const patientSteps = 3;
  const doctorSteps = 3;

  const getPatientRightText = (step: number) => {
    switch (step) {
      case 1:
        return "Choose a unique name for your account or generate a random anonymous username to get started quickly and securely.";
      case 2:
        return "Provide a valid email address and create a strong password to secure your account and enable easy login.";
      case 3:
        return "Share your age, contact number, and address to help us provide personalized healthcare services and communications.";
      default:
        return "";
    }
  };

  const getDoctorRightText = (step: number) => {
    switch (step) {
      case 1:
        return "Enter your full name, email, and a secure password to set up your professional account.";
      case 2:
        return "Detail your qualifications, speciality, and education to showcase your expertise to patients.";
      case 3:
        return "Provide your clinic address and contact details for easy patient outreach and scheduling.";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/20 p-4">
      <Card className="w-full max-w-4xl rounded-xl border-none">
        <CardHeader className="pb-6">
          <div className="flex flex-col items-center space-y-2">
            <div className="relative">
              <CardTitle className="text-4xl font-bold text-center tracking-wider bg-linear-to-r from-primary to-primary-foreground bg-clip-text">
                Create Account
              </CardTitle>
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 w-24 bg-linear-to-r from-primary to-primary-foreground rounded-full" />
            </div>
            <p className="text-center text-muted-foreground text-lg">
              Join our community for personalized healthcare
            </p>
          </div>
        </CardHeader>

        <CardContent className="px-8 pb-8">
          <Tabs defaultValue="patient" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 border-b-0">
              <TabsTrigger
                value="patient"
                className="rounded-t-lg data-[state=active]:bg-background data-[state=active]:shadow-sm"
              >
                Patient
              </TabsTrigger>
              <TabsTrigger
                value="doctor"
                className="rounded-t-lg data-[state=active]:bg-background data-[state=active]:shadow-sm"
              >
                Doctor
              </TabsTrigger>
            </TabsList>

            <TabsContent value="patient" className="mt-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (patientStep === patientSteps) handleSubmit("patient");
                }}
                className="space-y-6"
              >
                {/* Progress Bar */}
                <div className="flex mb-4">
                  {Array.from({ length: patientSteps }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 mx-1 rounded-full ${i + 1 <= patientStep ? "bg-primary" : "bg-muted"}`}
                    />
                  ))}
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-1 space-y-4">
                    {patientStep === 1 && (
                      <div className="space-y-1.5">
                        <Label className="text-sm font-medium">Name</Label>
                        <div className="flex gap-2">
                          <Input
                            name="name"
                            value={patientData.name}
                            onChange={handlePatientChange}
                            placeholder="Enter your name"
                            className="h-10"
                            required
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={handleRandomName}
                            className="h-10 w-10 p-0 flex items-center justify-center"
                          >
                            <Dice5 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}

                    {patientStep === 2 && (
                      <>
                        <div className="space-y-1.5">
                          <Label className="text-sm font-medium">Email</Label>
                          <Input
                            required
                            name="email"
                            type="email"
                            value={patientData.email}
                            onChange={handlePatientChange}
                            placeholder="Enter your email"
                            className="h-10"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-sm font-medium">
                            Password
                          </Label>
                          <Input
                            name="password"
                            type="password"
                            value={patientData.password}
                            onChange={handlePatientChange}
                            required
                            placeholder="Create a password"
                            className="h-10"
                          />
                        </div>
                      </>
                    )}

                    {patientStep === 3 && (
                      <>
                        <div className="space-y-1.5">
                          <Label className="text-sm font-medium">Age</Label>
                          <Input
                            name="age"
                            type="number"
                            value={patientData.age}
                            onChange={handlePatientChange}
                            placeholder="Enter your age"
                            required
                            className="h-10"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-sm font-medium">
                            Contact Number
                          </Label>
                          <Input
                            name="contactNo"
                            value={patientData.contactNo}
                            onChange={handlePatientChange}
                            required
                            placeholder="Enter your contact number"
                            className="h-10"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-sm font-medium">Address</Label>
                          <Input
                            name="address"
                            required
                            value={patientData.address}
                            onChange={handlePatientChange}
                            placeholder="Enter your address"
                            className="h-10"
                          />
                        </div>
                      </>
                    )}
                  </div>

                  <div className="flex-1 flex items-center">
                    <p className="text-muted-foreground text-sm md:text-base">
                      {getPatientRightText(patientStep)}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between mt-6">
                  {patientStep > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setPatientStep(patientStep - 1)}
                      className="flex items-center gap-2"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Previous
                    </Button>
                  )}
                  <Button
                    type={patientStep === patientSteps ? "submit" : "button"}
                    disabled={loading}
                    onClick={() => {
                      if (patientStep < patientSteps)
                        setPatientStep(patientStep + 1);
                    }}
                    className="ml-auto flex items-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Creating...
                      </>
                    ) : patientStep === patientSteps ? (
                      "Create Patient Account"
                    ) : (
                      <>
                        Next
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </TabsContent>
            <TabsContent value="doctor" className="mt-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (doctorStep === doctorSteps) handleSubmit("doctor");
                }}
                className="space-y-6"
              >
                <div className="flex mb-4">
                  {Array.from({ length: doctorSteps }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 mx-1 rounded-full ${i + 1 <= doctorStep ? "bg-primary" : "bg-muted"}`}
                    />
                  ))}
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-1 space-y-4">
                    {doctorStep === 1 && (
                      <>
                        <div className="space-y-1.5">
                          <Label className="text-sm font-medium">
                            Full Name
                          </Label>
                          <Input
                            name="name"
                            required
                            value={doctorData.name}
                            onChange={handleDoctorChange}
                            placeholder="Enter your full name"
                            className="h-10"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-sm font-medium">Email</Label>
                          <Input
                            name="email"
                            required
                            type="email"
                            value={doctorData.email}
                            onChange={handleDoctorChange}
                            placeholder="Enter your email"
                            className="h-10"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-sm font-medium">
                            Password
                          </Label>
                          <Input
                            name="password"
                            required
                            type="password"
                            value={doctorData.password}
                            onChange={handleDoctorChange}
                            placeholder="Create a password"
                            className="h-10"
                          />
                        </div>
                      </>
                    )}

                    {doctorStep === 2 && (
                      <>
                        <div className="space-y-1.5">
                          <Label className="text-sm font-medium">
                            Qualification
                          </Label>
                          <Input
                            name="qualification"
                            required
                            value={doctorData.qualification}
                            onChange={handleDoctorChange}
                            placeholder="Enter your qualification"
                            className="h-10"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-sm font-medium">
                            Speciality
                          </Label>
                          <Input
                            name="speciality"
                            required
                            value={doctorData.speciality}
                            onChange={handleDoctorChange}
                            placeholder="Enter your speciality"
                            className="h-10"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-sm font-medium">
                            Education
                          </Label>
                          <Input
                            name="education"
                            value={doctorData.education}
                            required
                            onChange={handleDoctorChange}
                            placeholder="Enter education details"
                            className="h-10"
                          />
                        </div>
                      </>
                    )}

                    {doctorStep === 3 && (
                      <>
                        <div className="space-y-1.5">
                          <Label className="text-sm font-medium">
                            Clinic Address
                          </Label>
                          <Input
                            name="clinicAddress"
                            value={doctorData.clinicAddress}
                            required
                            onChange={handleDoctorChange}
                            placeholder="Enter clinic address"
                            className="h-10"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-sm font-medium">
                            Contact Number
                          </Label>
                          <Input
                            name="contactNo"
                            value={doctorData.contactNo}
                            onChange={handleDoctorChange}
                            placeholder="Enter contact number"
                            className="h-10"
                            required
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-sm font-medium">
                            WhatsApp Number
                          </Label>
                          <Input
                            name="whatsappNumber"
                            value={doctorData.whatsappNumber}
                            onChange={handleDoctorChange}
                            placeholder="Enter WhatsApp number"
                            required
                            className="h-10"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-sm font-medium">
                            Business Email
                          </Label>
                          <Input
                            name="buisnessEmail"
                            value={doctorData.buisnessEmail}
                            required
                            onChange={handleDoctorChange}
                            placeholder="Enter business email"
                            className="h-10"
                          />
                        </div>
                      </>
                    )}
                  </div>

                  <div className="flex-1 flex items-center">
                    <p className="text-muted-foreground text-sm md:text-base">
                      {getDoctorRightText(doctorStep)}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between mt-6">
                  {doctorStep > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setDoctorStep(doctorStep - 1)}
                      className="flex items-center gap-2"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Previous
                    </Button>
                  )}
                  <Button
                    type={doctorStep === doctorSteps ? "submit" : "button"}
                    disabled={loading}
                    onClick={() => {
                      if (doctorStep < doctorSteps)
                        setDoctorStep(doctorStep + 1);
                    }}
                    className="ml-auto flex items-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Creating...
                      </>
                    ) : doctorStep === doctorSteps ? (
                      "Create Doctor Account"
                    ) : (
                      <>
                        Next
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
