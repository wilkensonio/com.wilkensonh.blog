import React from "react";

type props_type = {
  startDrag: (event: React.MouseEvent, target: "icon" | "popup") => void;
  setIsChatOpen: (isOpen: boolean) => void;
  chatPosition: { x: number; y: number };
  popupPosition?: { x: number; y: number };
};
export const ChatBot = (props: props_type): JSX.Element => {
  return (
    <div
      onMouseDown={(event) => props.startDrag(event, "popup")}
      style={{
        position: "fixed",
        top: `${(props.popupPosition ?? props.chatPosition).y + 60}px`,
        left: `${(props.popupPosition ?? props.chatPosition).x}px`,
        cursor: "move",
        zIndex: 1100,
        width: "300px",
        backgroundColor: "white",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        borderRadius: "8px",
      }}
      className="chat-box"
    >
      <div className="chat-header flex justify-between p-3 border-b">
        <h3 className="text-lg font-bold">Your writing assistant.</h3>
        <button
          onClick={() => props.setIsChatOpen(false)}
          className="text-red-500 font-bold"
        >
          ×
        </button>
      </div>
      <div className="chat-body p-3 h-48 overflow-auto text-wrap">
        <p className="text-gray-600 pb-2 google-gemini-text">
          Hello! How can I assist you?
        </p>
        <p className=""></p>
      </div>
      <div className="chat-footer flex items-center p-3 border-t">
        <input
          type="text"
          className="flex-grow p-2 border rounded-l-md"
          placeholder="Type your message..."
        />
        <button className="bg-gradient-to-b from-blue-300 via-slate-500 to-purple-500 text-white px-4 py-2 rounded-r-md">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
