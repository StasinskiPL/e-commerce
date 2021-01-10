import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase";
import { HiOutlineRefresh } from "react-icons/hi";
import axios from "axios";
import UserTransation from "../components/UserTransation";

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
  const [userTransation, setUserTransation] = useState<SingleTransation[] | null>(null);
  const [refresh, setRefresh] = useState<boolean>(false);
  const history = useHistory();

  const user = auth.currentUser;

  useEffect(() => {
    if (!user) {
      history.push("/");
    } else {
      axios
        .get("http://ds-ecommers.herokuapp.com/getuserstore", {
          params: {
            id: user.uid,
          },
        })
        .then((data) => {
          if(data.data.user){
            setUserTransation(data.data.user.transations);
          }else{
            setUserTransation([]);
          }
        });
    }
  }, [user, history, refresh]);

  const logOutHandler = () => {
    auth.signOut();
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
