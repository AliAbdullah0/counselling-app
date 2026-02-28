import { checkVerificationStatus } from '@/actions/doctor.actions'
import { redirect } from 'next/navigation'
import React from 'react'

const VerifyDoctor = async () => {
    const status = await checkVerificationStatus()
    console.log(
        "verified:",
        status.verified)
  return (
    <div>{
        status.verified ? <div>Doctor Verified</div> : <div>Not Verified Wait for Verification.</div>
    }</div>
  )
}

export default VerifyDoctor