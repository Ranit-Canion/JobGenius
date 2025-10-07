import { createContext, useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import useGetUser from "../features/auth/getCurrentUser";
const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = function ({ children }) {
  const [socket, setSocket] = useState();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { user } = useGetUser();

  useEffect(
    function () {
      if (user) {
        const socket = io("http://localhost:5000", {
          query: {
            userId: user._id,
          },
        });
        setSocket(socket);

        socket.on("getOnlineUsers", (users) => {
          setOnlineUsers(users);
        });

        return () => socket.close();
      } else {
        if (socket) {
          setSocket(null);
          socket.close();
        }
      }
    },
    [user?._id]
  );

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
