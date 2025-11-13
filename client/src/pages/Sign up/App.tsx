import { useState } from "react";
import { RoleSelectionScreen } from "./components/RoleSelectionScreen";
import { OTPVerificationScreen } from "./components/OTPVerificationScreen";
import {
  SignUpForm,
  SignUpData,
} from "./components/SignUpForm";
import { SuccessScreen } from "./components/SuccessScreen";

type Screen =
  | "role-selection"
  | "otp-verification"
  | "sign-up-form"
  | "success";
type Role = "user" | "vendor" | "corporate";

export default function App() {
  const [currentScreen, setCurrentScreen] =
    useState<Screen>("role-selection");
  const [selectedRole, setSelectedRole] = useState<Role | null>(
    null,
  );
  const [userEmail, setUserEmail] = useState("");

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
    if (role === "vendor") {
      // For vendor, go to sign-up form first
      setCurrentScreen("sign-up-form");
    } else {
      // For user and corporate, might go to different flows
      setCurrentScreen("sign-up-form");
    }
  };

  const handleSignUp = (data: SignUpData) => {
    setUserEmail(data.businessEmail);
    setCurrentScreen("otp-verification");
  };

  const handleVerifyOTP = (otp: string) => {
    console.log("OTP verified:", otp);
    setCurrentScreen("success");
  };

  const handleBack = () => {
    if (currentScreen === "otp-verification") {
      setCurrentScreen("sign-up-form");
    } else if (currentScreen === "sign-up-form") {
      setCurrentScreen("role-selection");
    }
  };

  const handleExploreDashboard = () => {
    console.log("Navigating to dashboard...");
    // Add dashboard navigation logic here
  };

  return (
    <div className="min-h-screen">
      {currentScreen === "role-selection" && (
        <RoleSelectionScreen onSelectRole={handleRoleSelect} />
      )}

      {currentScreen === "sign-up-form" && (
        <SignUpForm
          onBack={handleBack}
          onSignUp={handleSignUp}
        />
      )}

      {currentScreen === "otp-verification" && (
        <OTPVerificationScreen
          onBack={handleBack}
          onVerify={handleVerifyOTP}
          email={userEmail}
        />
      )}

      {currentScreen === "success" && (
        <SuccessScreen
          onExploreDashboard={handleExploreDashboard}
        />
      )}
    </div>
  );
}