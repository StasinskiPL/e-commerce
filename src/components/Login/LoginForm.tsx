import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { auth } from "../../firebase";
import { toogleLoginModal,connectUserWithDB } from "../../store/loginSlice";
import Loading from "../Loading";
import { LoginType } from "./LoginModal";

interface Props {
  text: string;
  type: LoginType;
}

const LoginForm: React.FC<Props> = ({ text, type }) => {
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const emailRef = useRef<HTMLInputElement>(null!);
  const passwordRef = useRef<HTMLInputElement>(null!);
  const history = useHistory();
  const dispatch = useDispatch();

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(false);
    setLoading(true);

    if (passwordRef.current.value.replaceAll(" ", "").length < 6) {
      setErrorMessage("Your password should contains at least 6 characters");
      setError(true);
      setLoading(false);
    } else {
      if (type === LoginType.registration) {
        auth.createUserWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value.replaceAll(" ", "")
          ).then((user) => {
            history.push("/account");
            if(user.user){
              dispatch(connectUserWithDB({id:user.user.uid}))
            }
            dispatch(toogleLoginModal());
          }).catch((err) => {
            if (err.code === "auth/email-already-in-use") {
              setErrorMessage("Email already in use");
              setError(true);
              setLoading(false);
            }
          });
      } else {
        auth.signInWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
          ).then(() => {
            history.push("/account");
            dispatch(toogleLoginModal());
          }).catch(() => {
            setErrorMessage("Wrong Email or Password");
            setError(true);
            setLoading(false);
          });
      }
    }
    emailRef.current.value = "";
    passwordRef.current.value = "";
  };

  let errorText = null;
  if (error) {
    errorText = (
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
      {errorText}
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
