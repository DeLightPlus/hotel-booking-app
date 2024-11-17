import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const GetStarted = () =>
{
    const navigate = useNavigate();
    return (
        <div className="getStarted">          
              <button className='getStarted-btn'
                onClick={()=> { navigate('/signup')}}> Get Started
              </button> 
              <div><small>Already have an account? </small><br/><Link to={'/signin'}>Signin</Link></div>
          </div>  
    )
}

export default GetStarted;