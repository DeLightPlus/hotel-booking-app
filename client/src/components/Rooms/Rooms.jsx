import { useDispatch, useSelector } from "react-redux";
import RoomShowcase from "./RoomShowcase";

const Rooms = () => {

    const user = useSelector((state) => state.auth.user);
    const userData = useSelector((state) => state.auth.userData);   

    const dispatch = useDispatch();
    const rooms_all = useSelector((state) => state.rooms.rooms_all);

    return (  
        <div className="rooms">            
            <div className='showcase-container'> 
              
                <div className="showcase">                    
                    <br />    
                </div>
                        
                <RoomShowcase page="rooms" />     
            </div>  
        </div>
    );
}
 
export default Rooms;
