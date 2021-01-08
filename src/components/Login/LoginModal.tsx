import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toogleLoginModal } from "../../store/loginSlice";
import { RootState } from "../../store/store";
import { FaTimes } from "react-icons/fa";
import LoginForm from "./LoginForm";
import { auth } from "../../firebase";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion"

export enum LoginType {
  login,
  registration,
}

export interface LoginModalText {
  header: string;
  body: string;
  footer: {
    text: string;
    toggle: string;
  };
}

const loginText: LoginModalText = {
  header: "Sign In",
  body: "sign in",
  footer: {
    text: "Don't have an account?",
    toggle: "Sing Up",
  },
};
const registrationText: LoginModalText = {
  header: "Sign Up",
  body: "sign Up",
  footer: {
    text: "Have an account?",
    toggle: "Sing In",
  },
};

const LoginModal = () => {
  const showModal = useSelector(
    (state: RootState) => state.login.showLoginModal
  );
  const dispatch = useDispatch();
  const [type, setType] = useState<LoginType>(LoginType.login);
  const [text, setText] = useState<LoginModalText>(loginText);
  const history = useHistory();

  useEffect(() => {
    if (type === LoginType.login) {
      setText(loginText);
    } else {
      setText(registrationText);
    }
  }, [type]);

  useEffect(() => {
    if (showModal) {
      if (auth.currentUser) {
        history.push("/account");
      } else {
        document.body.style.overflow = "hidden";
      }
    } else {
      document.body.style.overflow = "initial";
    }
  }, [showModal, history]);

  const toggleType = () => {
    if (type === LoginType.login) {
      setType(LoginType.registration);
    } else {
      setType(LoginType.login);
    }
  };

  if (!showModal || auth.currentUser) {
    return null;
  }

  return (
    <motion.div className="login"
    initial={{opacity:0}}
    animate={{opacity:1}}
    >
      <motion.div className="login-wrapper"
      initial={{y:-70,opacity:0}}
      animate={{y:0,opacity:1}}
       transition={{ease:"easeInOut",duration:0.3}}>
        <div className="login-inner">
          {/* header */}
          <div className="login__header">
            <h1>{text.header}</h1>
            <button onClick={() => dispatch(toogleLoginModal())}>
              <FaTimes />
            </button>
          </div>
          {/* body */}
          <div className="login__body">
            <LoginForm text={text.body} type={type} />
          </div>
          {/* footer */}
          <div className="login__footer">
            <p className="login__footer-text">
              {text.footer.text}
              <span onClick={toggleType} className="login__footer-toggle">
                {text.footer.toggle}
              </span>
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LoginModal;
