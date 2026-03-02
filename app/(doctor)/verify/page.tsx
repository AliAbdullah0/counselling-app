"use client";

import React, { useEffect, useState } from "react";
import { checkVerificationStatus } from "@/actions/doctor.actions";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const VerifyDoctor = () => {
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState<boolean | null>(null);
  const router = useRouter();
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const status = await checkVerificationStatus();
        setVerified(true === status.verified ? true : false);
        if (status.verified) {
          setTimeout(() => {
            router.push("/doctor");
          }, 2000);
        }
      } catch (err) {
        console.error(err);
        setVerified(false);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[50vh] text-center text-lg font-medium">
      {verified ? (
        <div className="">Doctor Verified . Redirecting To Admin Panel</div>
      ) : (
        <div className="text-orange-600">Not Verified. Wait for Verification.</div>
      )}
    </div>
  );
};

export default VerifyDoctor;