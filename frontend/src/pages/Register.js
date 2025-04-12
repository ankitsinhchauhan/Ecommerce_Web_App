import React, { useContext, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { postData } from "../api";
import { MyContext } from "../App";
import CircularProgress from "@mui/material/CircularProgress";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { firebaseApp } from "../firebase";

const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    password: "",
  });

  const context = useContext(MyContext);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(() => {
      return {
        ...formFields,
        [name]: value,
      };
    });
  };

  // fill the fields
  const valideValue = Object.values(formFields).every((el) => el);

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (formFields.name === "") {
      context.openAlertBox("error", "Please enter name");
      return false;
    }
    if (formFields.email === "") {
      context.openAlertBox("error", "Please enter email");
      return false;
    }
    if (formFields.password === "") {
      context.openAlertBox("error", "Please enter password");
      return false;
    }

    postData("/api/user/register", formFields).then((res) => {
      console.log(res);

      if (res?.error !== true) {
        setIsLoading(false);
        context.openAlertBox("success", res?.message);
        localStorage.setItem("userEmail", formFields.email);
        setFormFields({
          name: "",
          email: "",
          password: "",
        });

        navigate("/verify");
      } else {
        context.openAlertBox("error", res?.message);
        setIsLoading(false);
      }
    });
  };

  const authWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;

        const fields = {
          name: user.providerData[0].displayName,
          email: user.providerData[0].email,
          password: null,
          avatar: user.providerData[0].photoURL,
          mobile: user.providerData[0].phoneNumber,
          role: "USER",
        };

        postData("/api/user/authWithGoogle", fields).then((res) => {
          console.log(res);

          if (res?.error !== true) {
            setIsLoading(false);
            context.openAlertBox("success", res?.message);
            localStorage.setItem("userEmail", fields.email);

            localStorage.setItem("accesstoken", res?.data?.accesstoken);
            localStorage.setItem("refreshtoken", res?.data?.refreshtoken);

            context.setIsLogin(true); // set Login status to true

            navigate("/");
          } else {
            context.openAlertBox("error", res?.message);
            setIsLoading(false);
          }
        });

        console.log(user);
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <section className="section py-10">
      <div className="container">
        <div className="card shadow-md w-[400px] m-auto rounded-md bg-white p-7">
          <h3 className="text-center text-[35px] font-[400] text-black">
            REGISTER
          </h3>
          <form className="w-full mt-7" onSubmit={handleSubmit}>
            <div className="form-group w-full mb-5">
              <TextField
                type="text"
                id="text"
                label="Full Name"
                name="name"
                value={formFields.name}
                disabled={isLoading === true ? true : false}
                variant="outlined"
                className="w-full"
                onChange={onChangeInput}
              />
            </div>
            <div className="form-group w-full mb-5">
              <TextField
                type="email"
                id="email"
                label="Email Id"
                name="email"
                value={formFields.email}
                disabled={isLoading === true ? true : false}
                variant="outlined"
                className="w-full"
                onChange={onChangeInput}
              />
            </div>
            <div className="form-group w-full mb-5 relative">
              <TextField
                type={isPasswordShow === false ? "password" : "text"}
                id="password"
                label="Password"
                name="password"
                value={formFields.password}
                disabled={isLoading === true ? true : false}
                variant="outlined"
                className="w-full"
                onChange={onChangeInput}
              />
              <Button
                className="!absolute top-[10px] right-[10px] z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-black"
                onClick={() => {
                  setIsPasswordShow(!isPasswordShow);
                }}
              >
                {isPasswordShow === false ? (
                  <FaEye className="text-[20px] opacity-75" />
                ) : (
                  <FaEyeSlash className="text-[20px] opacity-75" />
                )}
              </Button>
            </div>

            <div className="flex items-center w-full mt-3 mb-3">
              <Button
                type="submit"
                disabled={!valideValue}
                className="btn-org btn-lg w-full flex gap-3"
              >
                {isLoading === true ? (
                  <CircularProgress color="inherit" />
                ) : (
                  "Register"
                )}
              </Button>
            </div>
            <p className="flex items-center gap-1">
              Already have an account?
              <Link
                to="/login"
                className="link text-[14px] font-[600] text-primary"
              >
                Login
              </Link>
            </p>
            <p className="text-center font-[500]">
              Or continue with social account
            </p>
            <Button
              className="flex gap-3 w-full !bg-[#f1f1f1] btn-lg !text-black"
              onClick={authWithGoogle}
            >
              <FcGoogle className="text-[20px]" /> SignUp with Google
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
