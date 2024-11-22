import { useDispatch, useSelector } from "react-redux";

const Rooms = () => {

    const user = useSelector((state) => state.auth.user);
    const userData = useSelector((state) => state.auth.userData); 
    const adminUserData = useSelector((state) => state.auth.adminUserData);

    const dispatch = useDispatch();
    const rooms_all = useSelector((state) => state.rooms.rooms_all);

    return (  
        <div className="rooms">
            <h5>Rest LeBnB/Rooms</h5>
        </div>
    );
}
 
export default Rooms;
