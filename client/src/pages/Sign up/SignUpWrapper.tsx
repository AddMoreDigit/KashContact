import { useState, useEffect } from "react";
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
type Role = "user" | "vendor" | "corporate" | "admin";

interface SignUpWrapperProps {
  onRoleSelect?: (role: Role) => void;
  selectedRole?: Role;
  onSignUpComplete?: () => void;
  onBackToLogin?: () => void;
  currentStep?: Screen;
}

export default function SignUpWrapper({ 
  onRoleSelect, 
  selectedRole: initialRole,
  onSignUpComplete, 
  onBackToLogin,
  currentStep 
}: SignUpWrapperProps) {
  const [currentScreen, setCurrentScreen] = useState<Screen>(currentStep || "role-selection");
  const [selectedRole, setSelectedRole] = useState<Role | null>(initialRole || null);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    if (currentStep) {
      setCurrentScreen(currentStep);
    }
  }, [currentStep]);

  useEffect(() => {
    if (initialRole) {
      setSelectedRole(initialRole);
    }
  }, [initialRole]);

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
    if (onRoleSelect) {
      onRoleSelect(role);
    } else {
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
      if (onBackToLogin) {
        onBackToLogin();
      } else {
        setCurrentScreen("role-selection");
      }
    }
  };

  const handleExploreDashboard = () => {
    console.log("Navigating to dashboard...");
    if (onSignUpComplete) {
      onSignUpComplete();
    }
  };

  return (
    <div className="min-h-screen">
      {currentScreen === "role-selection" && (
        <RoleSelectionScreen onSelectRole={handleRoleSelect} />
      )}

      {currentScreen === "sign-up-form" && selectedRole && (
        <SignUpForm
          role={selectedRole}
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
