import React from 'react'
import { useHistory } from 'react-router-dom'
import { auth } from '../firebase';

const Account = () => {
    const history = useHistory();

    const logOutHandler = ()=>{
        auth.signOut()
        history.push("/");
    }
    return (
        <section className="account">
            <div className="account-inner">
                <div className="account__header">
                    <button className="account__header-btn" onClick={logOutHandler}>
                        Log out
                    </button>

                </div>
            </div>
        </section>
    )
}

export default Account
