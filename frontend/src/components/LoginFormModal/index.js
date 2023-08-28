import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const logInDemoUser = () => {
    setCredential("demouser");
    setPassword("demouser")
  };

  return (
    <div className='login-container'>
      <h1>Log In:</h1>
      <form onSubmit={handleSubmit}>
        <div className="label-input-container">
          <label>Username or Email:</label>
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </div>
        <div className="label-input-container">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errors.credential && (
          <div className="login-error">
          <p>{errors.credential}</p>
          </div>
        )}
        <div className="button-container">
        <button disabled={credential.length < 4 || password.length < 6} type="submit">Log In</button>
        <button onClick={logInDemoUser}> Log In as Demo User</button>
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;
