import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Col, Container, Form, Row } from "reactstrap";
import Helmet from "../../components/Helmet/Helmet";

import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, db } from "../../firebase.config";

import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import heroImg from "../.././assets/images/loginImg.png";
import Loading from "../../components/Loading/Loading";
import "../../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState("false");
  

  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

 
  

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setLoading(false);

      const user = userCredential.user;

      console.log(user);
      console.log("Successfully logged in");

      const userDoc = await getDoc(doc(db, "users", user.uid));
      const userRole = userDoc.data().role;
      console.log(userRole);
      // if (userRole === "admin") {
      //   // setIsAdmin(true);
      //   // setUserRole("admin");
      //   console.log(userRole);
      // } else {
      //   // setIsAdmin(false);
      //   // setUserRole("user");

      //   console.log(userRole);
      // }
      toast.success("Login Success")
      navigate("/home");
    } catch (error) {
      console.error(error.message);
      setLoading(false);
      // Display an error message to the user if the email or password is incorrect
      if (error.code === "auth/user-not-found") {
        toast.error("User not found");
      }
      else if (error.code === "auth/wrong-password") { 
        toast.error("Password is incorrect");

      }
    }
  };

  //Login with Google
  const provider = new GoogleAuthProvider();
  const logInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        toast.success("Login successfully")
        navigate("/home")
      }).catch((error) => {
        toast.error("Error while logging with Google")
        
      });
      
  }

  return (
    <Helmet title={"Signup"}>
      {isLoading === true && email && password && <Loading />}{" "}
      <section className="hero_section">
        <Container>
          <Row>
            <Col lg="7" md="7">
              <div className="hero_img">
                <img src={heroImg} alt="" />
              </div>
            </Col>
            <Col lg="5" md="5">
              <Form onSubmit={login}>
                <h1 style={{ marginTop: 15 }}>Log In</h1>

                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ marginTop: 18 }}
                  required
                />

                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Link to="/resetpassword" style={{ marginLeft: 310 }}>
                  Forgot Password?
                </Link>

                <button type="submit" className="button_login">
                  Log In
                </button>
                <p className="text-center">Or</p>
                <button className="gg_login" onClick={logInWithGoogle}>
                  <i
                    class="ri-google-fill"
                    style={{
                      fontSize: "21px",
                      display: "inline-block",
                      verticalAlign: "middle",
                      marginRight: "0.5em",
                    }}
                  ></i>
                  Log In with Google
                </button>

                <p>
                  Don't have an account?{" "}
                  <Link to="/signup" style={{ color: "blue" }}>
                    {" "}
                    Sign Up
                  </Link>
                </p>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Login;
