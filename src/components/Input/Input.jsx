import { useContext, useEffect, useImperativeHandle, useRef, useState } from "react";
import React from "react";
import { FormContext } from "../../providers/FormContext";
import './Input.css';

function Input({type, id, checkOnBlur, placeholder, name}, ref){

    const [text, setText] = useState("");
    const {formInput, setFormInput} = useContext(FormContext);
    const [isValid, setIsValid]= useState(true);
    const[shake, setShake] = useState(false);

    // Introduce a local ref -> local to component.
    const localRef = useRef(null);

    useEffect(() => {
        setIsValid(true);
        setShake(false);
    }, [text]);


    useImperativeHandle(ref, () => {
        return{
            focus: () => localRef.current.focus(),
            setInvalid: () => setIsValid(false),
            shake: () => setShake(true),
        }
    }, []);

    return(
        <>
            <input
                className={`${(!isValid) ? "error-input" : ""} ${(shake) ? 'shake' : ""}`}
                type={type}
                id={id}
                ref={localRef}
                onBlur={checkOnBlur}
                placeholder={placeholder ? placeholder: ''}
                value={text}
                name={name}
                onChange={(event) => {
                        setText(event.target.value);
                        setFormInput({...formInput, [name]: event.target.value})
                    }}
            />
            
            <br/>
            <span>{!isValid
                    ? ` ${name} is invalid 
                        ${name == "email" ? "(example@example.com)" : ""}
                        ${name == "password" ? "(Example@10)": ""}
                        ${name == "phone" ? "(Enter valid 10 digit number)" : ""}`
                        : ""}
            </span>
        </>
    );
}

export default React.forwardRef(Input);
