import { MouseEvent } from "react";
import { IRegisterData } from "../../dto/IRegisterData";
import React from "react";

interface IProps {
    values: IRegisterData;

    validationErrors: string[];

    handleChange: (target: EventTarget & HTMLInputElement ) => void;

    onSubmit: (event: MouseEvent) => void;

}

const RegisterFormView = (props: IProps) => {
    //values
    

    return (

        <form>
        <h2>Create a new account.</h2>
            <hr />

            <ul style={{'display': props.validationErrors.length == 0 ? 'none' : ''}}>
                <li>{props.validationErrors.length > 0 ? props.validationErrors[0] : ""}</li>
            </ul>

            <div className="form-floating mb-3">
                <input 
                onChange={(e) => props.handleChange(e.target)}
                className="form-control" autoComplete="username" aria-required="true" placeholder="name@example.com" type="email"
                 id="Input_Email" name="email" value={props.values.email} />
                <label htmlFor="Input_Email">Email</label>
            </div>
            <div className="form-floating mb-3">
                <input 
                onChange={(e) => props.handleChange(e.target)}
                className="form-control" autoComplete="new-password" aria-required="true" placeholder="password" type="password" 
                id="Input_Password" maxLength={100} name="password" value={props.values.password} />
                <label htmlFor="Input_Password">Password</label>
            </div>
            <div className="form-floating mb-3">
                <input 
                onChange={(e) => props.handleChange(e.target)}
                className="form-control" autoComplete="new-password" aria-required="true" placeholder="password" type="password" 
                 id="Input_ConfirmPassword" name="confirmPassword" value={props.values.confirmPassword}/>
                <label htmlFor="Input_ConfirmPassword">Confirm Password</label>
            </div>
            
            <div className="form-floating mb-3">
                <input 
                onChange={(e) => props.handleChange(e.target)}
                className="form-control" autoComplete="firstname" aria-required="true" placeholder="FirstName" type="text" 
                id="Input_FirstName" maxLength={128} name="firstName" value={props.values.firstName} />
                <label htmlFor="Input_FirstName">First name</label>
            </div>
            
            <div className="form-floating mb-3">
                <input 
                onChange={(e) => props.handleChange(e.target)}
                className="form-control" autoComplete="lastname" aria-required="true" placeholder="LastName" type="text" 
                id="Input_LastName" maxLength={128} name="lastName" value={props.values.lastName} />
                <label htmlFor="Input_LastName">Last name</label>
            </div>
            
            <button 
            onClick={(e) => props.onSubmit(e)}
            id="registerSubmit" className="w-100 btn btn-lg btn-primary">Register</button>
        </form>
    );
}

export default RegisterFormView;