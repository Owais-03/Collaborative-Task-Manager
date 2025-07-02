import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function UserProtected({children}:any) {
 const {user} = useSelector((store: { auth: { user: null } }) => store.auth);

    const navigate = useNavigate();

    useEffect(()=>{
        if(user == null){
            navigate("/");
        }
    },[]);

    return (
        <>
        {children}
        </>
    )
}

export default UserProtected