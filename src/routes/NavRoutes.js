import React from "react";
import Home from "../home/Home.js"
import LoginForm from "../user/LoginForm.js"
import SignupForm from "../user/SignupForm.js"
import ProfileForm from "../user/ProfileForm.js"
import { Routes, Route, Navigate } from "react-router-dom";

function NavRoutes({ signup, login }) {
    /**
     *          <Route path="/companies" element={<Companies />} />
                <Route path="/companies/:handle" element={<CompanyDetail />} />
                <Route path="/jobs" element={<Jobs />} />
     */
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <PrivateRoute path="/companies" />
                <PrivateRoute path="/companies/:handle" />
                <PrivateRoute path="/jobs" />
                <Route path="/login" element={<LoginForm login={login}/>} />
                <Route path="/signup" element={<SignupForm signup={signup}/>} />
                <PrivateRoute path="/profile" element={<ProfileForm />}/>
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            
        </div>
    );
};

export default NavRoutes;