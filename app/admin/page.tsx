"use client"

import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Loader2 } from "lucide-react"
import { getAllVerificationRequests, verifyDoctor } from "@/actions/admin.actions"
import { toast } from "sonner"

interface VerificationRequest {
  id: string
  name: string
  email: string
  education: string
  speciality: string
  qualification?: string | null
  clinicAddress: string | null
  contactNo: string
  createdAt: Date
}

const AdminHome = () => {
  const [requests, setRequests] = useState<VerificationRequest[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState<VerificationRequest | null>(null)
  const [verifying, setVerifying] = useState(false)

  useEffect(() => {
    fetchRequests()
  }, [])

  const fetchRequests = async () => {
    setLoading(true)
    try {
      const res = await getAllVerificationRequests()
      setRequests(res)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleVerify = async (id: string) => {
    setVerifying(true)
    try {
      const res = await verifyDoctor(id)
      console.log(res)
      if(res){
              toast.success(res.message)
              fetchRequests()
              setSelectedRequest(null)

    }
    } catch (err) {
        toast.error(`${err}`)
      console.error(err)
    } finally {
      setVerifying(false)
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Verification Requests</h1>

      {loading ? (
        <div className="flex justify-center">
          <Loader2 className="animate-spin w-8 h-8" />
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Speciality</TableHead>
              <TableHead>Education</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((req) => (
              <TableRow key={req.id}>
                <TableCell>{req.name}</TableCell>
                <TableCell>{req.email}</TableCell>
                <TableCell>{req.speciality}</TableCell>
                <TableCell>{req.education}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline">
                        Verify
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Verify Doctor</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-2 my-4">
                        <p><strong>Name:</strong> {req.name}</p>
                        <p><strong>Email:</strong> {req.email}</p>
                        <p><strong>Speciality:</strong> {req.speciality}</p>
                        <p><strong>Education:</strong> {req.education}</p>
                        <p><strong>Qualification:</strong> {req.qualification || "N/A"}</p>
                        <p><strong>Clinic Address:</strong> {req.clinicAddress}</p>
                        <p><strong>Contact:</strong> {req.contactNo}</p>
                      </div>
                      <DialogFooter>
                        <Button
                          disabled={verifying}
                          onClick={() => handleVerify(req.id)}
                        >
                          {verifying ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : null}
                          Verify Doctor
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}

export default AdminHome