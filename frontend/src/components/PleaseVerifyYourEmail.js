import { useEffect } from "react";
import { useHistory } from "react-router-dom";

export const PleaseVerifyEmailPage = () => {
    const history = useHistory();

    useEffect(() => {
        setTimeout(() => {
            history.push("/");
            }, 2000);
    }, [history]);

    return (
        <div className="content-container">; 
          <h1>Thanks for signing up with us !</h1>
            <p>Please verify your email address by clicking the link in the email we sent you.</p>
        </div>
    );  // end of return
}