import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Analysis from '../pages/dashboard/Analysis';
import MyWallet from '../pages/dashboard/MyWallet';
import SmartIot from '../pages/dashboard/SmartIot';
import AuthLayout from '../components/layout/AuthLayout';
import Signin from '../pages/auth/Signin';
import Signup from '../pages/auth/Signup';
import ForgotPassword from '../pages/auth/ForgotPassword';
import TwoStep from '../pages/auth/TwoStep';
import Lockscreen from '../pages/auth/Lockscreen';
import Maintenance from '../pages/auth/Maintenance';
import PageNotFound from '../pages/auth/PageNotFound';
import Calendar from '../pages/app/Calendar';
import TuiCalendar from '../pages/app/TuiCalendar';
import Email from '../pages/app/email/Email';
import EmailDetail from '../pages/app/email/EmailDetail';
import EmailCompose from '../pages/app/email/EmailCompose';
import Chat from '../pages/app/Chat';
import Campaign from '../pages/app/campaign/Campaign';
import Social from '../pages/app/social/Social';
import FileManager from '../pages/app/fileManager/FileManager';
import Todo from '../pages/app/Todo';
import Contact from '../pages/app/contact/Contact';
import Task from '../pages/app/task/Task';
import ProjectList from '../pages/app/project/projectList/ProjectList';
import ProjectDetail from '../pages/app/project/projectDetail/ProjectDetail';
import MyProfile from '../pages/page/myProfile/MyProfile';
import Bookmark from '../pages/page/Bookmark';
import Timeline from '../pages/page/Timeline';
import ImageGallery from '../pages/page/ImageGallery';
import Pricing from '../pages/page/Pricing';
import TeamBorad from '../pages/page/TeamBorad';
import SupportTicket from '../pages/page/SupportTicket';
import Faq from '../pages/page/Faq';
import SearchPage from '../pages/page/SearchPage';
import Footers from '../pages/page/Footers';
import Setting from '../pages/account/Setting';
import Invoice from '../pages/account/Invoice';
import Billing from '../pages/account/Billing';
import CreateInvoice from '../pages/account/CreateInvoice';
import Modals from '../pages/Modals';
import Overview from '../pages/documentation/Overview';
import DevSetup from '../pages/documentation/DevSetup';
import FileStructure from '../pages/documentation/FileStructure';
import References from '../pages/documentation/References';
import HelperClass from '../pages/documentation/HelperClass';
import ChangeLog from '../pages/documentation/ChangeLog';
import Widget from '../pages/Widget';

export default function Routers() {

  const RouterContent = () => {
    const pageUrl = useLocation().pathname;

    useEffect(() => {
      const pageClass = pageUrl.substring(1).replace(/\//g, '-');
      document.body.classList.add(pageClass ? pageClass : 'dashboard');
      return () => {
        document.body.classList.remove(pageClass ? pageClass : 'dashboard');
      };
    }, [pageUrl]);

    return (
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Analysis />} />
          <Route path="/index-wallet" element={<MyWallet />} />
          <Route path="/index-iot" element={<SmartIot />} />
          <Route path="/app-calendar" element={<Calendar />} />
          <Route path="/app-calendar-tui" element={<TuiCalendar />} />
          <Route path="/app-email" element={<Email />} />
          <Route path="/app-email-detail" element={<EmailDetail />} />
          <Route path="/app-email-compose" element={<EmailCompose />} />
          <Route path="/app-chat" element={<Chat />} />
          <Route path="/app-campaign" element={<Campaign />} />
          <Route path="/app-social" element={<Social />} />
          <Route path="/app-file-manager" element={<FileManager />} />
          <Route path="/app-todo" element={<Todo />} />
          <Route path="/app-contact" element={<Contact />} />
          <Route path="/app-task" element={<Task />} />
          <Route path="/app-project" element={<ProjectList />} />
          <Route path="/app-project-detail" element={<ProjectDetail />} />
          <Route path="/page-my-profile" element={<MyProfile />} />
          <Route path="/page-bookmark" element={<Bookmark />} />
          <Route path="/page-timeline" element={<Timeline />} />
          <Route path="/page-image-gallery" element={<ImageGallery />} />
          <Route path="/page-pricing" element={<Pricing />} />
          <Route path="/page-team-board" element={<TeamBorad />} />
          <Route path="/page-support-ticket" element={<SupportTicket />} />
          <Route path="/page-faq" element={<Faq />} />
          <Route path="/page-search" element={<SearchPage />} />
          <Route path="/page-footer" element={<Footers />} />
          <Route path="/account-setting" element={<Setting />} />
          <Route path="/account-invoice" element={<Invoice />} />
          <Route path="/account-billing" element={<Billing />} />
          <Route path="/account-create-invoice" element={<CreateInvoice />} />
          <Route path="/modals" element={<Modals />} />
          <Route path="/doc-overview" element={<Overview />} />
          <Route path="/doc-setup" element={<DevSetup />} />
          <Route path="/doc-structure" element={<FileStructure />} />
          <Route path="/doc-references" element={<References />} />
          <Route path="/doc-helperclass" element={<HelperClass />} />
          <Route path="/doc-changelog" element={<ChangeLog />} />
          <Route path="/widget" element={<Widget />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/auth-signin" element={<Signin />} />
          <Route path="/auth-signup" element={<Signup />} />
          <Route path="/auth-forgot-password" element={<ForgotPassword />} />
          <Route path="/auth-two-step" element={<TwoStep />} />
          <Route path="/auth-lockscreen" element={<Lockscreen />} />
          <Route path="/auth-maintenance" element={<Maintenance />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    );
  }

  return (
    // <BrowserRouter basename={process.env.PUBLIC_URL}>
    <BrowserRouter >
      <RouterContent />
    </BrowserRouter>
  );
}