"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Mail } from "lucide-react";
import BrandMark from "@/components/shared/BrandMark";
export default function ForgotPasswordPage(){const [sent,setSent]=useState(false);return <div className="auth-simple-wrap"><form className="auth-panel auth-simple" onSubmit={(e)=>{e.preventDefault();setSent(true)}}><Link href="/" className="auth-logo"><BrandMark/></Link><h2>Forgot Password?</h2><p>Enter your email address and we'll send password reset instructions.</p>{sent&&<div className="form-notice">Password reset flow will be connected to the backend. No email has been sent in this preview.</div>}<div className="auth-field"><label>Email Address</label><div><Mail/><input type="email" required placeholder="your@email.com"/></div></div><button className="button button-primary auth-submit">Send Reset Link <ArrowRight size={16}/></button><div className="auth-register"><Link href="/login">Back to Sign In</Link></div></form></div>}
