import React, { useState } from "react";
export const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showUser, setShowUser] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    setShowUser(false);
    if (validateEmail(email)) {
      setShowUser(true);
      setError("");
      return;
    } else {
      setError("Email is not valid");
    }
    return false;
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setError("Form Reset! Enter your Details Again");
    setShowUser(false);
  };
  const disableAlert = () => {
    if (error !== "") {
      setTimeout(() => {
        setError("");
      }, 3000);
    }
    if (showUser === true) {
      setTimeout(() => {
        setShowUser(false);
      }, 3000);
    }
  };
  return (
    <>
      {showUser && (
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          {email}
        </div>
      )}
      {error && (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          {error}
        </div>
      )}
      <div className="auth-form-container">
        <h2>Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Username/Email</label>
          <input
            value={email}
            type="email"
            name="email"
            id="email"
            data-testid="email"
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
            placeholder="Enter your Email Id"
          />
          <br />

          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            id="password"
            placeholder="*********"
          />

          <button
            onClick={disableAlert()}
            className="my-2 btn bg-light"
            id="btn"
            type="submit"
          >
            Login
          </button>
          <button
            className="link-btn"
            onClick={() => props.onFormSwitch("register")}
          >
            Don't have any account?, Click here to Register
          </button>
        </form>
        <button
          onClick={() => {
            resetForm();
            disableAlert();
          }}
          className="my-2 btn bg-light"
          id="btn"
          data-testid="reset"
        >
          Reset Form
        </button>
      </div>
    </>
  );
};

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  if (regex.test(email)) {
    return true;
  } else {
    return false;
  }
};
