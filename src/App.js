import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";

import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import AuthContext from "./store/auth-context";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        {!authCtx.isLoggedIn && (
          // This works because Route is actually a component that helps us with
          // routing
          <Route path="/auth-page" element={<AuthPage />} />
        )}
        {authCtx.isLoggedIn && (
          <Route path="/user-profile" element={<UserProfile />} />
        )}
        {/* This is the an alternative to the above */}
        {/* <Route path="/user-profile" element={authCtx.isLoggedIn ? <UserProfile /> : <Navigate to="/" />}  /> */}

        <Route path="/*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
}

export default App;

// All API keys have been removed