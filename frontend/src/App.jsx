import React from "react";
import { Navigate, Route, Routes } from "react-router";
import HomePage from "./pages/Homepage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NotificationsPage from "./pages/NotificationsPage.jsx";
import CallPage from "./pages/CallPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import OnBoardingPage from "./pages/OnBoardingPage.jsx";

import { Toaster } from "react-hot-toast";
import useAuthUser from "./hooks/useAuthUser.js";
import PageLoader from "./components/PageLoader.jsx";
const App = () => {
  
  const {isLoading,authUser} = useAuthUser()
  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;
  // console.log(authUser);
  
  if(isLoading) return <PageLoader />
 
  return (
    <div className="h-screen" data-theme="night">
      <Routes>
        <Route path="/" element={isAuthenticated && isOnboarded ? <HomePage /> :(
          <Navigate to={isAuthenticated? "/onboarding":"/login"}/>
        )} />
        <Route path="/signup" element={!isAuthenticated? <SignUpPage />: <Navigate to={isOnboarded? "/":"/onboarding"}/>} />
        <Route path="/login" element={!isAuthenticated? <LoginPage />: <Navigate to={isOnboarded? "/":"/onboarding"}/>} />
        <Route path="/notifications" element={isAuthenticated?<NotificationsPage />: <Navigate to='/login'/>} />
        <Route path="/call" element={isAuthenticated?<CallPage />: <Navigate to='/login'/>} />
        <Route path="/chat" element={isAuthenticated?<ChatPage />: <Navigate to='/login'/>} />
        <Route path="/onboarding" element={isAuthenticated? (
          isOnboarded ? <Navigate to='/'/> : <OnBoardingPage />
        ): <Navigate to='/login'/>} />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
