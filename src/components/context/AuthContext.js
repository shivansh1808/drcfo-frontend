import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { authentication } from "../../firebase";
import { useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import axios from "../../axios";
import { verifyMobileOTP } from "../../api/auth";
import { isValidToken } from "../../util";
import { getDoctor } from "../../api/doctor";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const localToken = localStorage.getItem("token");
  const [token, setToken] = useState(localToken || "");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});

  async function verifyMobilOtpWithBackend(phone, otp) {
    try {
      const authenticatedUser = await verifyMobileOTP(phone, otp);
      if (authenticatedUser?.token) {
        setToken(authenticatedUser.token);
        setIsAuthenticated(true); // updating state deirectly without checking if token has expired for immidiate effect
        return authenticatedUser;
      } else {
        throw new Error("Could not authenticate");
      }
    } catch (err) {
      console.log(err);
    }
  }

  function logout() {
    setToken("");
  }

  async function handleToken() {
    // console.log("handleToken", isValidToken(token), token);
    if (await isValidToken(token)) {
      localStorage.setItem("token", token);
      setIsAuthenticated(true);
      const doctorData = await getDoctor();
      if (doctorData) setUser(doctorData.data);
    } else {
      localStorage.removeItem("token");
      setIsAuthenticated(false);
    }
  }

  useEffect(() => {
    handleToken();
  }, [token]);

  //  verify user againt our backend
  async function AuthenticateWithBackend(idToken, result) {
    try {
      if (idToken) {
        const res = await axios
          .post("/auth/docter", {
            idToken: idToken,
          })
          .catch((err) => {
            console.log(err);
            return null;
          });
        if (res.data && res.status === 200) {
          const sessionToken = res.data.token;
          localStorage.setItem("token", sessionToken);
          // set user in context
          const user = result.user;
          setCurrentUser({
            user_name: user.displayName,
            user_email: user.email,
            user_uid: user.uid,
          });
          // navigate to dashboard
          navigate("/dashboard");
        }
      } else {
        console.log("idToken not found");
        logout();
      }
    } catch (error) {
      console.log(error);
      logout();
    }
  }

  // google oauth
  async function signInWithGoogle() {
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = result._tokenResponse.idToken;
      AuthenticateWithBackend(idToken, result);
    } catch (error) {
      logout();
      navigate("/login");
      console.log(error);
    }
  }

  // send otp
  async function signInWithPhone(number) {
    const recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      { size: "invisible" },
      auth
    );
    const result = await signInWithPhoneNumber(auth, number, recaptchaVerifier);
    if (result) {
      return result;
    } else {
      alert("Something went wrong, please try again later!");
    }
  }

  // verify otp
  async function signInWithOtp(result, otp) {
    try {
      const res = await result.confirm(otp);
      const idToken = res?._tokenResponse?.idToken;
      await AuthenticateWithBackend(idToken, res);

      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  useEffect(() => {
    const unsubscribe = authentication.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser({
          user_name: user._delegate.displayName,
          user_email: user._delegate.email,
          user_uid: user._delegate.uid,
          user_phone: user._delegate.phoneNumber,
        });
      }
      setLoading(false);
    });
    return () => {
      unsubscribe();
      setCurrentUser(null);
      setLoading(false);
    };
  }, []);

  const value = {
    currentUser,
    signInWithGoogle,
    signInWithPhone,
    signInWithOtp,
    isAuthenticated,
    verifyMobilOtpWithBackend,
    logout,
    user,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
