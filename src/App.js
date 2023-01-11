import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { useState } from "react";
export default function App() {
  const [currentForm, setCurrentForm] = useState("login");

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };
  return (
    <>
      <div className="App">
        {currentForm === "login" ? (
          <Login onFormSwitch={toggleForm} />
        ) : (
          <Register onFormSwitch={toggleForm} />
        )}
      </div>
    </>
  );
}
