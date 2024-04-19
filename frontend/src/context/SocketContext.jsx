import {createContext, useState, useEffect,  useContext} from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider = ({children}) =>{
    const [socket, setSocket] = useState(null);
    const[onlineUsers, setOnlineUsers] = useState([]);
    const {authUser} = useAuthContext();

    useEffect(() => {
        if(authUser) {
            const socket = io("https://chat-app-koj0.onrender.com",{
                query: {
                    userId: authUser._id,
                }
            })

            setSocket(socket);
            // io.emit() is used to send events to all the connected clients 

            socket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
            });


            return () => socket.close();
        } else {
            if(socket) {
                socket.close();
                setSocket(null);
            }
        }
    },[authUser]);
    return (
        <SocketContext.Provider value={{socket, onlineUsers}}>
            {children}
        </SocketContext.Provider>
    )
}