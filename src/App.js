import { Routes, Route } from "react-router-dom";
import Login from "./components/Authentication/Auth";
import Dashboard from "./components/Dashboard/Dashboard";
import Monitor from "./components/Dashboard/Monitor/Monitor";
import { AuthProvider } from "./components/context/AuthContext";
import ClinicStepper from "./components/ClinicStepper/ClinicStepper";
import UpdateSlots from "./components/ClinicStepper/UpdateSlots";
import DoctorDetails from "./components/DoctorDetails/DoctorDetails";
import Clinicscreen from "./components/Clinicscreen/Clinicscreen";
import ClinicTabs from "./components/Clinicscreen/ClinicTabs";
import PatientScreen from "./components/PatientScreen/PatientScreen";
import EditClinic from "./components/EditClinic/EditClinic";
import EditPatient from "./components/EditPatient/EditPatient";
import UpdateDashboardSlots from "./components/Clinicscreen/UpdateDashboardSlots";
import Prescriptions from "./components/Prescriptions/Prescriptions";
import CreateSlot from "./components/Clinicscreen/CreateSlot";
import CreateAppointment from "./components/CreateAppointment/CreateAppointment";
import LegalScreen from "./components/LegalScreen/LegalScreen";
import PrivateRoute from "./components/Authentication/PrivateRoute";
import PatientBills from "./components/Prescriptions/PatientBills";
import Analytics from "./components/Dashboard/Analytics/Analytics";
import Consultation from "./components/Consultation/Consultation";
import Finance from "./components/Dashboard/Finance/Finance";
import ChatList from "./components/ChatList/ChatList";
import ChatScreen from "./components/ChatScreen/ChatScreen";
import Homepage from "./components/Home/Homepage";
import MyAccounts from "./components/Dashboard/Finance/MyAccounts";
import EditAccount from "./components/Dashboard/Finance/EditAccount";
import Terms from "./components/Home/Terms/Terms";
import Policy from "./components/Home/Policy/Policy";
import AboutUs from "./components/Home/AboutUs/AboutUs";
import Pricing from "./components/Home/Pricing/Pricing";
import Help from "./components/Home/Help/Help";
import EditTemplate from "./components/Prescriptions/EditTemplate/EditTemplate";
import Authentication from "./components/Authentication";
import PersonalDetails from "./components/PersonalDetails/PersonalDetails";
import RegistraionNumberForm from "./components/Authentication/RegistraionNumberForm";
import ContactUs from "./components/Home/ContactUs/ContactUs";
import AppSnackbar from "./components/AppSnackBar/index.js";
import { AppContextProvider } from "./components/context/AppContext";
import SocketProvider from "./lib/SocketContext";
import PrescriptionPDF from "./components/Prescriptions/PrescriptionPDF/PrescriptionPDF";
import WebsiteGenerator from "./components/WebsiteGenerator/WebsiteGenerator";
import GettingStarted from "./components/WebsiteGenerator/GettingStarted/GettingStarted";
import WebGeneratorCompletedPage from "./components/WebsiteGenerator/WebGeneratorCompletedPage/WebGeneratorCompletedPage";
import Finalwebsite from "./components/WebsiteGenerator/Finalwebsite";
import WebGeneratorDashboard from "./components/WebsiteGenerator/WebGeneratorDashboard/WebGeneratorDashboard";
import ConsultatationzeroScreen from "./components/Consultation/ConsultatationzeroScreen/ConsultatationzeroScreen";

function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <AppContextProvider>
          <Routes>
            {/* Dashboard Routes */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            >
              <Route index element={<Monitor />} />
              <Route path="monitor" element={<Monitor />} />
              {/* <Route path="consultation" element={<Consultation />} /> */}
              <Route
                path="consultation"
                element={<ConsultatationzeroScreen />}
              />
              <Route path="finance" element={<Finance />} />
              <Route path="clinicscreen" element={<Clinicscreen />} />
              <Route path="patient" element={<PatientScreen />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="legal" element={<LegalScreen />} />
              <Route path="doctordetails" element={<DoctorDetails />} />
              <Route path="chatlist" element={<ChatList />} />
              <Route path="tabs" element={<ClinicTabs />} />
              <Route path="openaccounts" element={<MyAccounts />} />
              <Route path="editaccounts/:id" element={<EditAccount />} />
              <Route path="web" element={<WebsiteGenerator />} />
              <Route path="getStarted" element={<GettingStarted />} />
              <Route
                path="generatorCompletion"
                element={<WebGeneratorCompletedPage />}
              />
              <Route
                path="webgendashboard"
                element={<WebGeneratorDashboard />}
              />
            </Route>
            {/* Prescrition Routes */}
            <Route path="/" element={<Homepage />} />
            <Route path="/tandc" element={<Terms />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/privacy" element={<Policy />} />
            <Route
              path="/prescription/:id"
              element={
                <PrivateRoute>
                  <Prescriptions />
                </PrivateRoute>
              }
            />
            <Route
              path="/patientbills/:id"
              element={
                <PrivateRoute>
                  <PatientBills />
                </PrivateRoute>
              }
            />
            <Route
              path="/prescriptionpdf/:id"
              element={
                <PrivateRoute>
                  <PrescriptionPDF />
                </PrivateRoute>
              }
            />
            <Route
              path="/createappointment"
              element={<CreateAppointment />}
            ></Route>
            {/* Other Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/regno" element={<RegistraionNumberForm />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/help" element={<Help />} />
            <Route path="/clinicdetails" element={<ClinicStepper />} />
            <Route
              path="/addslots"
              element={
                <PrivateRoute>
                  <ClinicStepper step="2" />
                </PrivateRoute>
              }
            />
            <Route
              path="/editslots/:id"
              element={
                <PrivateRoute>
                  <UpdateSlots />
                </PrivateRoute>
              }
            />
            <Route
              path="/edittemplate/:id"
              element={
                <PrivateRoute>
                  <EditTemplate />
                </PrivateRoute>
              }
            />
            <Route
              path="/addnewclinic"
              element={
                <PrivateRoute>
                  <ClinicStepper step="1" />
                </PrivateRoute>
              }
            />
            <Route
              path="editclinic/:id"
              element={
                <PrivateRoute>
                  <EditClinic />
                </PrivateRoute>
              }
            />
            <Route
              path="editpatient/:id"
              element={
                <PrivateRoute>
                  <EditPatient />
                </PrivateRoute>
              }
            />
            <Route
              path="createslot/:id"
              element={
                <PrivateRoute>
                  <CreateSlot />
                </PrivateRoute>
              }
            />
            <Route
              path="updatedashboardslots/:clinicid/:slotid"
              element={
                <PrivateRoute>
                  <UpdateDashboardSlots />
                </PrivateRoute>
              }
            />
            <Route path="/doctor/:id" element={<Finalwebsite />} />
            <Route path="/chatscreen/:id" element={<ChatScreen />} />
            <Route path="/signup" element={<Authentication />} />
            <Route path="/personalDetails" element={<PersonalDetails />} />
            {/* test routes */}
            <Route path="/prescription" element={<Prescriptions />} />{" "}
            <Route path="/prescriptionpdf" element={<PrescriptionPDF />} />{" "}
            <Route path="/patientbills" element={<PatientBills />} />
          </Routes>
          <AppSnackbar />
        </AppContextProvider>
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;
