import React from "react"
import {Link} from "react-router-dom";

const Verification = () => {
    // const [verificationCode, setVerificationCode] = useState(undefined)

    // // const handleChange = (evt) => {
    // //     setVerificationCode(evt.target.value)
    // // }

    // // const handleSubmit = (evt) => {
    // //     if (verificationCode === "coffeerocks") {
    // //         return (<Redirect to="/registerowner" />)
    // //     }

    // // }

    return (
        <React.Fragment>
            <div className="verificationCode">
                <form className="Form1">
                    <label className="label">Verification Code
                    <hr></hr>
                    <div className="control">
                            <input className="input" type="password" placeholder="Enter code from email" name="verificationCode" id="verificationCode"  required />
                        </div>
                    </label>
                    <Link className="button"to="/registerowner">Submit</Link>
                    <div>Meant to register as User?</div>
                <Link className="button" to="/register">Click Here!</Link>
                </form>
                </div>  
        </React.Fragment>)
}
export default Verification 