import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Layout from "../components/layout/Layout";
import Analysis from "../pages/dashboard/Analysis";
import AuthLayout from "../components/layout/AuthLayout";
import Signin from "../pages/auth/Signin";
import Signup from "../pages/auth/Signup";
import ForgotPassword from "../pages/auth/ForgotPassword";
import TwoStep from "../pages/auth/TwoStep";
import Lockscreen from "../pages/auth/Lockscreen";
import Maintenance from "../pages/auth/Maintenance";
import PageNotFound from "../pages/auth/PageNotFound";
import Test from "../pages/Test";
import PrivateRoute from "./PrivateRoute";
import AcademicYearListPage from "../pages/academicYear/AcademicYearListPage";
import CampusGroupManagement from "../pages/campusGroup/CampusGroupManagement";

export default function Routers() {
  const RouterContent = () => {
    const pageUrl = useLocation().pathname;
    // const subdomain = window.location.hostname.split(".")[0]; // Extract "admin"
    // const subdomain2 = window.location.href.split('//')[1].split('.')[0]
    // console.log("🚀 ~ RouterContent ~ subdomain2:", subdomain2)

    // console.log("🚀 ~ RouterContent ~ subdomain:", subdomain);
    useEffect(() => {
      const pageClass = pageUrl.substring(1).replace(/\//g, "-");
      document.body.classList.add(pageClass ? pageClass : "dashboard");
      return () => {
        document.body.classList.remove(pageClass ? pageClass : "dashboard");
      };
    }, [pageUrl]);

    return (
      <Routes>
        {/* Public Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/auth-signin" element={<Signin />} />
          <Route path="/auth-signup" element={<Signup />} />
          <Route path="/auth-forgot-password" element={<ForgotPassword />} />
          <Route path="/auth-two-step" element={<TwoStep />} />
          <Route path="/auth-lockscreen" element={<Lockscreen />} />
          <Route path="/auth-maintenance" element={<Maintenance />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>

        {/* Private Routes (Protected) */}
        {/* <Route element={<PrivateRoute />}> */}
        <Route element={<Layout />}>
          <Route path="/" element={<Analysis />} />
          <Route path="/test" element={<Test />} />
          <Route path="/academicYears" element={<AcademicYearListPage />} />
          <Route path="/schools" element={<CampusGroupManagement />} />
          {/* </Route> */}
        </Route>
      </Routes>
    );
  };

  return (
    <BrowserRouter>
      <RouterContent />
    </BrowserRouter>
  );
}