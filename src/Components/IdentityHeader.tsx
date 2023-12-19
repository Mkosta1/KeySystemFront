import { useContext, useEffect, useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { JwtContext } from "../routes/Root";
import { IdentityService } from "../Services/IdentityService";
import jwt_decode from "jwt-decode";
import { IUserInfoProps } from "../dto/IUserInfoProps";

const IdentityHeader = () => {
    const { jwtResponse, setJwtResponse } = useContext(JwtContext);
    const navigate = useNavigate();
    const identityService = new IdentityService();

    const logout = () => {
        if (jwtResponse)
            identityService.logout(jwtResponse).then(response => {
                if (setJwtResponse)
                    setJwtResponse(null);
                navigate("/");
            });
    }

    if (jwtResponse) {
        let jwtObject: any = jwt_decode(jwtResponse.jwt);

        console.log(jwtObject);

        return (
            <>
                <li className="nav-item">
                    <Link to="" className="nav-link text-light">
                        <UserInfo jwtObject={jwtObject} />
                    </Link>
                </li>
                <li className="nav-item">
                    <a onClick={(e) => {
                        e.preventDefault();
                        logout();
                    }} className="nav-link text-light" href="#">Logout</a>
                </li>
            </>
        );
    }
    return (
        <>

            <li className="nav-item">
                <Link to="login" className="nav-link text-light">Login</Link>
            </li>
        </>
    );

}


const UserInfo = (props: IUserInfoProps) => {

    const { jwtResponse, setJwtResponse } = useContext(JwtContext);
    let jwtObject: any = jwt_decode(jwtResponse!.jwt);
    const UserId = (props: IUserInfoProps) => {
        return (
            props.jwtObject['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']
            //UserInfo(jwtObject={jwtObject})
        );
    }



    return (
        <>
            User:
           <b> {' ' + props.jwtObject['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname'] + ' '}
            {props.jwtObject['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname']+ ' '}</b>
        </>
    );
}

export default IdentityHeader;
