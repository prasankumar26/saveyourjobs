import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import {Register, Error, Landing, ProtectedRoute } from './pages';
import {
  AddJob,
  AllJobs,
  Profile,
  SharedLayout,
  Stats} from './pages/dashboard'

function App() {
  return (
    <BrowserRouter>
    <Routes>
   <Route path="/" element={
     // if there is no user  kick back to landing page protectedroute
     <ProtectedRoute>
       <SharedLayout />
     </ProtectedRoute>
   } > 
   <Route index element={<Stats/>} />
   <Route path="all-jobs" element={<AllJobs/>} />
   <Route path="add-job" element={<AddJob/>} />
   <Route path="profile" element={<Profile/>} />
   </Route>
   <Route path="/register" element={ <Register /> }></Route>
   <Route path="/landing" element={<Landing />}></Route>
   <Route path="*" element={<Error /> } />
   </Routes>
   </BrowserRouter>
  );
}

export default App;
