import './Form.css';
import passwordValidator from '../../helper/passwordValidator';
import emailValidator from '../../helper/emailValidator';
import phoneValidator from '../../helper/phoneValidator';
import Input from '../Input/Input';
import { useContext, useRef, useState } from 'react';
import { FormContext } from '../../providers/FormContext';


function Form() {
    const { formInput, setFormInput } = useContext(FormContext); // Ensure state updates correctly

    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const userNameRef = useRef(null);
    const phoneRef = useRef(null); // Ref for phone input

    const [step, setStep] = useState(1);
    const [formValid, setFormValid] = useState(true);

    const handleFormSubmit = (event) => {
        event.preventDefault();
        handleInvalidEmail();
        handleInvalidPassword();
        handleInvalidPhone(); // Trigger phone validation
        if (emailValidator(formInput.email) && passwordValidator(formInput.password) && phoneValidator(formInput.phone)) {
            setStep(4); // Show success step
        }
    };

    const handleInvalidEmail = () => {
        if (!emailValidator(formInput.email)) {
            emailRef.current.setInvalid();
            emailRef.current.shake();
            setFormValid(false);
        }
    };

    const handleInvalidPassword = () => {
        if (!passwordValidator(formInput.password)) {
            passwordRef.current.setInvalid();
            passwordRef.current.shake();
            setFormValid(false);
        }
    };

    const handleInvalidPhone = () => {
        if (!phoneValidator(formInput.phone)) {
            phoneRef.current.setInvalid();
            phoneRef.current.shake();
            setFormValid(false);
        }
    };

    const handleNextStep = () => {
        if (step === 1 && emailValidator(formInput.email) && passwordValidator(formInput.password)) {
            setStep(2);
        } else {
            handleInvalidEmail();
            handleInvalidPassword();
        }
    };

    const handlePhoneChange = (e) => {
        setFormInput({ ...formInput, phone: e.target.value }); // Update phone number
    };

    const handleUsernameChange = (e) => {
        setFormInput({ ...formInput, username: e.target.value }); // Update username
    };

    const handleLogout = () => {
        setFormInput({ email: '', password: '', username: '', phone: '' }); // Clear form input
        setStep(1); // Reset to the first step
        setFormValid(true);
    };

    if (step === 1) {
        return (
            <div className="form-container">
                <form onSubmit={handleFormSubmit} noValidate>
                    <h2>Sign Up</h2>
                    <div className="wrapper email-input-wrapper">
                        <Input 
                            id="email-input"
                            type="email"
                            label="email"
                            name={"email"}
                            ref={emailRef}
                            value={formInput.email} // Add value
                            key={1}
                            placeholder="Enter Valid Email Address"
                            checkOnBlur={handleInvalidEmail}
                        />
                    </div>
                    <div className="wrapper password-input-wrapper">
                        <Input 
                            id="password-input"
                            type="password"
                            label="password"
                            name={"password"}
                            ref={passwordRef}
                            value={formInput.password} // Add value
                            key={2}
                            placeholder="Enter Valid Password"
                            checkOnBlur={handleInvalidPassword}
                        />
                    </div>
                    <button type="button" onClick={handleNextStep} className="next-btn">Next</button>
                    {!formValid && <p className="error-message">Please correct the errors before proceeding.</p>}
                </form>
            </div>
        );
    } else if (step === 2) {
        return (
            <div className="form-container">
                <form noValidate>
                    <div className="wrapper username-input-wrapper">
                        <Input
                            id="username-input"
                            type="text"
                            label="username"
                            ref={userNameRef}
                            name={"username"}
                            value={formInput.username} // Add value
                            key={3}
                            placeholder="Enter your Username"
                            onChange={handleUsernameChange} // Handle username change
                        />
                    </div>
                    <button type="button" onClick={() => setStep(3)} className="next-btn">Next</button>
                    <button type="button" onClick={() => setStep(1)} className="prev-btn">Previous</button>
                </form>
            </div>
        );
    } else if (step === 3) {
        return (
            <div className="form-container">
                <form onSubmit={handleFormSubmit} noValidate>
                    <div className="wrapper phone-input-wrapper">
                        <Input 
                            id="phone-input"
                            type="number"
                            label="phone"
                            name="phone"
                            ref={phoneRef}
                            value={formInput.phone} // Add value
                            placeholder="Enter Phone Number"
                            key={4}
                            onChange={handlePhoneChange} // Handle phone number change
                            checkOnBlur={handleInvalidPhone}
                        />
                    </div>
                    <button type="button" onClick={handleFormSubmit} className="next-btn">Submit</button>
                    <button type="button" onClick={() => setStep(2)} className="prev-btn">Previous</button>
                </form>
            </div>
        );
    } else if (step === 4) {
        return (
            <div className="form-container">
                <h2 className="success-message">Success!</h2> {/* Styled success message */}
                <p>Thank you for signing up!</p> 
                <p> Here are your details:</p>
                <ul>
                    <li>Email: {formInput.email}</li>
                    <li>Username: {formInput.username}</li>
                    <li>Phone: {formInput.phone || 'Not provided'}</li> {/* Handle empty phone number */}
                </ul>
                <button type="button" onClick={handleLogout} className="logout-btn">Logout</button> {/* Logout button */}
            </div>
        );
    }
}

export default Form;
