import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toogleLoginModal } from "../../store/loginSlice";
import { RootState } from "../../store/store";
import { FaTimes } from "react-icons/fa";
import LoginForm from "./LoginForm";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LoginModalText,
  LoginType,
  loginText,
  registrationText,
} from "./loginData";

const LoginModal = () => {
  const { showLoginModal, isLogin } = useSelector(
    (state: RootState) => state.login
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
    if (showLoginModal) {
      if (isLogin) {
        history.push("/account");
      } else {
        document.body.style.overflow = "hidden";
      }
    } else {
      document.body.style.overflow = "initial";
    }
  }, [showLoginModal, history, isLogin]);

  const toggleType = () => {
    if (type === LoginType.login) {
      setType(LoginType.registration);
    } else {
      setType(LoginType.login);
    }
  };

  if (!showLoginModal || isLogin) {
    return null;
  }

  return (
    <motion.div
      className="login"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}>
      <motion.div
        className="login-wrapper"
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.3 }}>
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
