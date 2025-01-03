import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Sidebar from './components/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './pages/Dashboard';
import StaffDetails from './pages/Staff';
import Members from './pages/Members';
import BookingDetails from './pages/Bookings';
import MemberDetails from './components/dashboard/MemberDetails';
import YearlyQuaterlyDetails from './components/dashboard/YearlyQuaterlyDetails';
import ActiveMembers from './components/dashboard/ActiveInactive';
import MemberAttendance from './components/dashboard/TodayAttendance';
import MemberPage from './components/dashboard/gender';
import TransactionComponent from './components/dashboard/TransactionComponent';
import Expense from './components/dashboard/Expense';
import FeePending from './components/dashboard/FeePending';
import MembershipFollowUp from './components/dashboard/MembershipFollowUp';
import MemberAPTDetails from './components/dashboard/MemberAPTDetails';
import ActivePT from './components/dashboard/ActivePT';
import ProfilePage from './components/Header1/ProfilePage';
import AddMember from './components/Header1/AddMember';
import AddTranscation from './components/Header1/AddTransaction';
import AddStaff from './components/Header1/AddStaff';
import AddLead from './components/Header1/AddLead';
import AbsentDetails from './components/dashboard/AbsentDetails';
import MembershipRenewal from './components/dashboard/Renewal';
import PTFeePending from './components/dashboard/PTFeeDetails';
import RenewalForm from './components/Header1/RenewalForm';
import Renewal from './components/Header1/Renewal';
import TaxCalculator from './components/Header1/TaxCalculator';
import SupplementBill from './components/Header1/SupplementBill';
import BillData from './components/Header1/AddBill';
import ExpenseData from './components/Header1/AddExpense';
import DietDetailsPage from './components/Header1/DietDetails';
import CurrentPackage from './components/Header1/CurrentPackage';
import AddPackage from './components/Header1/AddPackage';
import AddEvent from './components/Header1/AddEvent';
import AddOffer from './components/Header1/AddOffer';
import Events from './components/Header1/Event';
import Offers from './components/Header1/Offer';
import AddService from './components/Header1/AddService';import CurrentWorkouts from './components/Assign/WorkOut';
import AddWorkout from './components/Assign/addWorkOut';
import DietManagement from './components/Assign/diet';
import AddDiet from './components/Assign/addDiet';
import Login from './pages/login'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#F1F7F8',
    },
  },
});

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const loginStatus = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(!!loginStatus);
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="flex min-h-screen bg-[#F1F7F8]">
        {isLoggedIn ? (
            <>
          <Sidebar />
          <div className="flex-1">
            <Header />
            <main className="p-6">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/total-members" element={<MemberDetails />} />
                <Route path="/details/:members" element={<YearlyQuaterlyDetails />} />
                <Route path="/members/:status" element={<ActiveMembers />} />
                <Route path="/today/attendance" element={<MemberAttendance />} />
                <Route path="/member/:gender" element={<MemberPage />} />
                <Route path="/period/:gender/:period" element={<MemberPage />} />
                <Route path="/transaction/:period" element={<TransactionComponent />} />
                <Route path="/expense" element={<Expense />} />
                <Route path="/pending" element={<FeePending />} />
                <Route path="/followup" element={<MembershipFollowUp />} />
                <Route path="/apt" element={<MemberAPTDetails />} />
                <Route path="/apt/:status" element={<ActivePT />} />
                <Route path="/absent" element={<AbsentDetails />} />
                <Route path="/membership-renewal" element={<MembershipRenewal />} />
                <Route path="/pt/pending" element={<PTFeePending />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/addmember" element={<AddMember />} />
                <Route path="/transaction" element={<AddTranscation />} />
                <Route path="/addstaff" element={<AddStaff />} />
                <Route path="/addlead" element={<AddLead />} />
                <Route path="/renewal" element={<Renewal />} />
                <Route path="/renewalform" element={<RenewalForm />} />
                <Route path="/taxcalculator" element={<TaxCalculator />} />
                <Route path="/supplementbill" element={<SupplementBill />} />
                <Route path="/addbill" element={<BillData />} />
                <Route path="/addexpense" element={<ExpenseData />} />
                <Route path="/dietdetails" element={<DietDetailsPage />} />
                <Route path="/members" element={<Members />} />
                <Route path="/staff-members" element={<StaffDetails />} />
                <Route path="/bookings" element={<BookingDetails />} />
              <Route path="/currentpackage" element={<CurrentPackage />} />
              <Route path="/addpackage" element={<AddPackage />} />
              <Route path="/addevent" element={<AddEvent />} />
              <Route path="/addoffer" element={<AddOffer />} />
              <Route path="/offer" element={<Offers />} />
              <Route path="/event" element={<Events />} />
              <Route path="/service" element={<AddService />} />
              <Route path="/currentworkout" element={<CurrentWorkouts />} />
              <Route path="/addworkout" element={<AddWorkout />} />
                <Route path="/work-out" element={<CurrentWorkouts />} />
                <Route path="/add/work-out" element={<AddWorkout />} />
                <Route path="/diet" element={<DietManagement />} />
                <Route path="/add/diet" element={<AddDiet />} />
              </Routes>
            </main>
          </div>
          </>
          ) : (
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
            </Routes>
            )}
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
