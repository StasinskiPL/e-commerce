import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { HiOutlineRefresh } from "react-icons/hi";
import UserTransation from "../components/Account/UserTransation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { logout, toogleLoginModal } from "../store/loginSlice";
import server from "../api/server";

export interface TransationProduct {
  name: string;
  id: string;
  total: number;
  amount: number;
}

export interface SingleTransation {
  products: TransationProduct[];
  date: string;
}

const Account = () => {
  const [userTransation, setUserTransation] = useState<
    SingleTransation[] | null
  >(null);
  const [refresh, setRefresh] = useState<boolean>(false);
  const { isLogin, showLoginModal } = useSelector(
    (state: RootState) => state.login
  );
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLogin) {
      history.push("/");
    } else {
      if (showLoginModal) {
        dispatch(toogleLoginModal());
      }
      server
        .get("/getuserstore", { withCredentials: true })
        .then(({ data }) => {
          if (data.user) {
            setUserTransation(data.user.transations);
          } else {
            setUserTransation([]);
          }
        })
        .catch((e) => console.log(e));
    }
  }, [isLogin, history, refresh, dispatch, showLoginModal]);

  const logOutHandler = () => {
    dispatch(logout());
    history.push("/");
  };
  return (
    <section className="account">
      <div className="account-inner">
        <div className="account__header">
          <button className="account__header-btn" onClick={logOutHandler}>
            Log out
          </button>
        </div>
        <div className="account__body">
          <div className="account__transations">
            <div className="account__transations-title">
              <h1>Your Purchase History</h1>
              <button onClick={() => setRefresh((e) => !e)}>
                <HiOutlineRefresh />
              </button>
            </div>
            {userTransation &&
              userTransation.map((trans, index) => (
                <UserTransation transation={trans} key={index} />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Account;
