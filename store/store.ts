import { useState } from "react";
import { message } from "@/models/message";

export const chatStore = () => {
  const [chats, setChat] = useState<message[]>([]);

  const addSentMessage = (message: string) => {
    setChat((prevChats: message[]) => {
      const newChats: message[] = [...prevChats, { type: "sent", message }];
      console.log("Sent: ", newChats);
      return newChats;
    });
  };

  const addReceivedMessage = (message: string) => {
    setChat((prevChats: message[]) => {
      const newChats: message[] = [...prevChats, { type: "received", message }];
      console.log("Received: ", newChats);
      return newChats;
    });
    console.log("Received: ", chats);
  };

  return { chats, addSentMessage, addReceivedMessage };
};

export const resourceStore = () => {
  const [resources, setResources] = useState<string[]>([]);

  const addResource = (resourceUrl: string) => {
    setResources((previousResources: string[]) => {
      const updatedResources: string[] = [...previousResources, resourceUrl];
      console.log("Resources list: ", updatedResources);
      return updatedResources;
    });
  };

  return { resources, addResource };
};

export const userStore = () => {
  const [userId, setUserId] = useState<string | null>(null);

  const updateUserSessionId = (id: string) => {
    setUserId(prevId => id);
  };

  return { userId, updateUserSessionId };
};
