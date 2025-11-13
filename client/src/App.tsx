import { useState } from "react";
import ProjectWrapper from "./pages/project/ProjectWrapper";
import SignUpWrapper from "./pages/Sign up/SignUpWrapper";
import { VendorDashboard } from "./features/vendor/pages/VendorDashboard";
import { StandardDashboard } from "./features/standard/pages/StandardDashboard";
import { CorporateDashboard } from "./features/corporate/pages/CorporateDashboard";
import { AdminDashboard } from "./features/admin/pages/AdminDashboard";
import "./pages/Sign up/styles/globals.css";
import "./pages/project/styles/globals.css";

type Screen = "role-selection" | "login" | "sign-up-form" | "otp-verification" | "success" | "dashboard";
type Role = "user" | "vendor" | "corporate" | "admin";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("role-selection");
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
    setCurrentScreen("login");
  };

  const handleLoginSuccess = () => {
    setCurrentScreen("dashboard");
  };

  const handleNavigateToSignUp = () => {
    setCurrentScreen("sign-up-form");
  };

  const handleBackToLogin = () => {
    setCurrentScreen("login");
  };

  const handleSignUpComplete = () => {
    setCurrentScreen("dashboard");
  };

  const renderDashboard = () => {
    switch (selectedRole) {
      case "vendor":
        return <VendorDashboard />;
      case "user":
        return <StandardDashboard />;
      case "corporate":
        return <CorporateDashboard />;
      case "admin":
        return <AdminDashboard />;
      default:
        return <StandardDashboard />;
    }
  };

  return (
    <div className="min-h-screen">
      {currentScreen === "role-selection" && (
        <SignUpWrapper 
          onRoleSelect={handleRoleSelect}
          currentStep="role-selection"
        />
      )}

      {currentScreen === "login" && selectedRole && (
        <ProjectWrapper 
          selectedRole={selectedRole}
          onLoginSuccess={handleLoginSuccess}
          onNavigateToSignUp={handleNavigateToSignUp}
        />
      )}

      {(currentScreen === "sign-up-form" || currentScreen === "otp-verification" || currentScreen === "success") && selectedRole && (
        <SignUpWrapper 
          selectedRole={selectedRole}
          onSignUpComplete={handleSignUpComplete}
          onBackToLogin={handleBackToLogin}
          currentStep={currentScreen}
        />
      )}

      {currentScreen === "dashboard" && renderDashboard()}
    </div>
  );
}