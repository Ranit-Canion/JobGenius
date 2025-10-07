import notificationSound from "../../../../assets/sound/notification.mp3";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSocketContext } from "../../../../context/SocketContext";
import { useConversation } from "../../../../context/useConversation";

const useListenForMessages = () => {
  const { socket } = useSocketContext();
  const { selectedConversation } = useConversation();
  const queryClient = useQueryClient();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      const sound = new Audio(notificationSound);
      sound.play();

      queryClient.setQueryData(
        ["messages", selectedConversation._id],
        (old = []) => [...old, newMessage]
      );
    });

    return () => socket?.off("newMessage");
  }, [socket, selectedConversation, queryClient]);
};

export default useListenForMessages;
// socket?.on("newMessage", (newMessage) => {
//   //   newMessage.shouldShake = true;

//   const sound = new Audio(notificationSound);
//   sound.play();

//   queryClient.setQueryData(
//     ["messages", selectedConversation._id],
//     (old = []) => [...old, newMessage]
//   );
// });
//------------------------------------------------------
/*
import { toast } from "react-toastify";

socket?.on("newMessage", (newMessage) => {
  const isFromOtherUser = selectedConversation?._id !== newMessage.senderId._id;

  queryClient.setQueryData(
    ["messages", newMessage.senderId._id],
    (old = []) => [...old, newMessage]
  );

  if (isFromOtherUser) {
    const sound = new Audio(notificationSound);
    sound.play();

    toast.info(`📩 New message from ${newMessage.senderId.name}`, {
      position: "bottom-left",
    });
  }
});
*/
