"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { loginPatient } from "@/actions/user.actions";
import { loginDoctor } from "@/actions/doctor.actions";
import { adminLogin } from "@/actions/admin.actions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

export default function SignInPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [patientData, setPatientData] = useState({ email: "", password: "" });
  const [doctorData, setDoctorData] = useState({ email: "", password: "" });
  const [adminData, setAdminData] = useState({ username: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, type: "patient" | "doctor" | "admin") => {
    if (type === "patient") setPatientData({ ...patientData, [e.target.name]: e.target.value });
    else if (type === "doctor") setDoctorData({ ...doctorData, [e.target.name]: e.target.value });
    else setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (type: "patient" | "doctor" | "admin") => {
    setLoading(true);
    const form = new FormData();
    let data;

    switch (type) {
      case "patient":
        data = patientData;
        break;
      case "doctor":
        data = doctorData;
        break;
      case "admin":
        data = adminData;
        break;
    }

    Object.entries(data).forEach(([key, value]) => {
      if (value) form.append(key, value);
    });

    try {
      let response;
      if (type === "patient") response = await loginPatient(form);
      else if (type === "doctor") response = await loginDoctor(form);
      else response = await adminLogin(form);

      if (response.status === 200) {
        toast.success(response.message || "Login successful");
        router.push(type === "patient" ? "/patient" : type === "doctor" ? "/verify" : "/admin");
      } else {
        toast.error(response.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-muted/20 p-4">
      <Card className="md:w-[30%] w-[90%] rounded-xl border-none">
        <CardHeader className="pb-6 text-center">
          <CardTitle className="text-4xl font-bold">Login</CardTitle>
          <p className="text-muted-foreground text-lg mt-1">
            Access your patient, doctor, or admin account
          </p>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <Tabs defaultValue="patient" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6 border-b-0">
              <TabsTrigger value="patient" className="rounded-t-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
                Patient
              </TabsTrigger>
              <TabsTrigger value="doctor" className="rounded-t-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
                Doctor
              </TabsTrigger>
              <TabsTrigger value="admin" className="rounded-t-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
                Admin
              </TabsTrigger>
            </TabsList>

            <TabsContent value="patient">
              <form
                onSubmit={(e) => { e.preventDefault(); handleLogin("patient"); }}
                className="space-y-6"
              >
                <div className="space-y-1.5">
                  <Label>Email</Label>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={patientData.email}
                    onChange={(e) => handleChange(e, "patient")}
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Password</Label>
                  <Input
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={patientData.password}
                    onChange={(e) => handleChange(e, "patient")}
                    required
                  />
                </div>
                <Button type="submit" className="w-full flex items-center justify-center gap-2" disabled={loading}>
                  {loading && <Loader2 className="animate-spin w-4 h-4" />}
                  {loading ? "Logging in..." : "Login as Patient"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="doctor">
              <form
                onSubmit={(e) => { e.preventDefault(); handleLogin("doctor"); }}
                className="space-y-6"
              >
                <div className="space-y-1.5">
                  <Label>Email</Label>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={doctorData.email}
                    onChange={(e) => handleChange(e, "doctor")}
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Password</Label>
                  <Input
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={doctorData.password}
                    onChange={(e) => handleChange(e, "doctor")}
                    required
                  />
                </div>
                <Button type="submit" className="w-full flex items-center justify-center gap-2" disabled={loading}>
                  {loading && <Loader2 className="animate-spin w-4 h-4" />}
                  {loading ? "Logging in..." : "Login as Doctor"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="admin">
              <form
                onSubmit={(e) => { e.preventDefault(); handleLogin("admin"); }}
                className="space-y-6"
              >
                <div className="space-y-1.5">
                  <Label>Username</Label>
                  <Input
                    name="username"
                    type="text"
                    placeholder="Enter your username"
                    value={adminData.username}
                    onChange={(e) => handleChange(e, "admin")}
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Password</Label>
                  <Input
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={adminData.password}
                    onChange={(e) => handleChange(e, "admin")}
                    required
                  />
                </div>
                <Button type="submit" className="w-full flex items-center justify-center gap-2" disabled={loading}>
                  {loading && <Loader2 className="animate-spin w-4 h-4" />}
                  {loading ? "Logging in..." : "Login as Admin"}
                </Button>
                
              </form>
            </TabsContent>

          </Tabs>
          <p className="text-muted-foreground text-sm mt-4">
                  Don&apos;t have an account?{" "}
                  <Link href="/sign-up" className="underline underline-offset-4">
                    Sign Up
                  </Link>
                </p>
        </CardContent>
      </Card>
    </div>
  );
}