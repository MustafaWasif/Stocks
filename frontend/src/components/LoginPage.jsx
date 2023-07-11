import { useNavigate } from "react-router-dom";



function LoginPage(){
    const navigate = useNavigate();

    const handleSignInClick = () => {
        navigate("/mystore");
    }

    return(

        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="text-center">
                <h1>Car Inventory</h1>
                <div className="my-3">
                    <button className="btn btn-lg btn-primary" onClick={handleSignInClick}>Click To Sign In</button>
                </div>
            </div>
        </div>
        
    );
}

export default LoginPage;
