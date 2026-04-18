"use client";

import React, { useEffect, useState } from "react";
import { checkVerificationStatus } from "@/actions/doctor.actions";
import { Loader2, CheckCircle, Clock, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const VerifyDoctor = () => {
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState<boolean | null>(null);
  const [statusMessage, setStatusMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const status = await checkVerificationStatus();

        setVerified(status.verified ?? false);

        if (status.verified) {
          setStatusMessage("Your account has been verified successfully!");
          setTimeout(() => {
            router.push("/doctor");
          }, 2500);
        } else {
          setStatusMessage("Your verification is under review. We'll notify you once it's complete.");
        }
      } catch (err) {
        console.error(err);
        setVerified(false);
        setStatusMessage("Something went wrong. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 animate-spin text-cyan-600 mx-auto" />
          <p className="mt-6 text-lg font-medium text-zinc-700">Checking verification status...</p>
          <p className="text-sm text-zinc-500 mt-2">Please wait a moment</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-lg border ">
        <CardContent className="pt-12 pb-10 px-10 text-center">
          {verified ? (
            <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
          ) : (
            <div className="mx-auto w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center">
              <Clock className="w-12 h-12 text-amber-600" />
            </div>
          )}
          <h1 className="mt-8 text-3xl font-semibold text-zinc-900">
            {verified ? "Verification Successful" : "Verification Under Review"}
          </h1>
          <p className="mt-4 text-zinc-600 leading-relaxed text-[17px]">
            {statusMessage}
          </p>
          {verified && (
            <div className="mt-10 flex items-center justify-center gap-2 text-green-600 text-sm font-medium">
              Redirecting to Doctor Dashboard
              <ArrowRight className="w-4 h-4 animate-pulse" />
            </div>
          )}
          {!verified && (
            <div className="mt-10 space-y-6">
              <div className="text-sm text-zinc-500">
                You will receive an email notification once your account is verified.
              </div>

              <Button 
                variant="outline" 
                onClick={() => window.location.reload()}
                className="w-full py-6 text-base"
              >
                Refresh Status
              </Button>
              <p className="text-xs text-zinc-400">
                Usually takes 1–2 business days
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyDoctor;