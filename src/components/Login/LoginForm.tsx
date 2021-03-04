import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import server from "../../api/server";
import {
  loginUser,
  registerUser,
  toogleLoginModal,
} from "../../store/loginSlice";
import { RootState } from "../../store/store";
import Loading from "../Ui/Loading";
import { LoginType } from "./loginData";

interface Props {
  text: string;
  type: LoginType;
}

const LoginForm: React.FC<Props> = ({ text, type }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const emailRef = useRef<HTMLInputElement>(null!);
  const passwordRef = useRef<HTMLInputElement>(null!);
  const history = useHistory();
  const { errorMessage, fetchLoginState } = useSelector(
    (state: RootState) => state.login
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (fetchLoginState === "fetched") {
      history.push("/account");
    } else if (fetchLoginState === "pending") {
      setLoading(true);
    } else if (fetchLoginState === "idle") {
      setLoading(false);
    }
  }, [fetchLoginState, history, dispatch]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (type === LoginType.login) {
      dispatch(
        loginUser({
          email: emailRef.current.value,
          password: passwordRef.current.value,
        })
      );
    } else {
      dispatch(
        registerUser({
          email: emailRef.current.value,
          password: passwordRef.current.value,
        })
      );
    }

    emailRef.current.value = "";
    passwordRef.current.value = "";
  };

  let errorComponent = null;
  if (errorMessage) {
    errorComponent = (
      <div className="login__body-error">
        <p>{errorMessage}</p>
      </div>
    );
  }

  if (loading) {
    return <Loading />;
  }
  return (
    <form className="login__body-form" onSubmit={(e) => submitHandler(e)}>
      {errorComponent}
      <label htmlFor="email">Email:</label>
      <input autoComplete="email" ref={emailRef} type="email" required />
      <label htmlFor="password">Password:</label>
      <input
        ref={passwordRef}
        type="password"
        autoComplete={`${type === LoginType.registration && "new-password"}`}
      />
      <button className="login__body-btn" type="submit">
        {text}
      </button>
    </form>
  );
};

export default LoginForm;
