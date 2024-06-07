import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {
  // sent default to sent
  type: "sent" | "received";
  message: string;
};

const ChatBubble = ({ type = "received", message = "Lomo" }: Props) => {
  return (
    <div className="w-full my-2 flex">
      <div className="w-full">
        <div
          className={`h-fit w-1/2 bg-purple-400 border-none font-current  text-sm p-4 ${
            type == "sent"
              ? "float-end bg-slate-500 text-white rounded-tl-xl rounded-bl-xl rounded-tr-xl"
              : "float-start text-slate-950 rounded-tl-xl rounded-br-xl rounded-tr-xl"
          }`}
        >
          <div className="flex items-center h-full">
            <span>{message}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
