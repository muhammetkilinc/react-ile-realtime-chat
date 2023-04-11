import React, { useEffect, useState } from "react";

const Chat = ({ socket, username, room }) => {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    socket.on("messageReturn", (data) => {
      setMessageList((prev) => [...prev, data]);
    });
  }, [socket]);

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const day = currentDate.getDate().toString().padStart(2, "0");
  const hours = currentDate.getHours().toString().padStart(2, "0");
  const minutes = currentDate.getMinutes().toString().padStart(2, "0");
  const seconds = currentDate.getSeconds().toString().padStart(2, "0");

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  const sendMessage = async () => {
    const messageContent = {
      username: username,
      message: message,
      room: room,
      date:formattedDate
    };
    await socket.emit("message", messageContent);
    setMessageList((prev) => [...prev, messageContent]);
    setMessage("");
  };

  console.log("mesajlar", messageList);

  return (
    <div className="h-full justify-center items-center flex">
      <div className="w-[90%] h-[90%] bg-[#282828] rounded-xl p-6 text-white relative">
        <div className="w-full h-[75%] items-center">
          <div className="w-full h-[100%] overflow-y-auto">
            {messageList &&
              messageList.map((msg, i) => (
                <div
                  className={
                    username === msg.username
                      ? "flex justify-end"
                      : "flex justify-start"
                  }
                >
                  <div
                    className={
                      username === msg.username
                        ? "w-1/3 p-3 pl-4 rounded-xl rounded-br-none mt-6 bg-green-600 text-sm"
                        : "w-1/3 p-3 pl-4 rounded-xl rounded-bl-none mt-6 bg-blue-600 text-sm"
                    }
                  >
                    <div
                      className={
                        username !== msg.username && "justify-end flex mr-4"
                      }
                    >
                      {msg.message}
                    </div>
                    <div
                      className={
                        username === msg.username
                          ? "w-full mt-2 flex gap-1 justify-end text-xs text-black"
                          : "w-full mt-2 flex gap-1 justify-start text-xs text-black"
                      }
                    >
                      <div className="font-semibold">{msg.username}</div>
                      <div>- {msg.date}</div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full flex items-center justify-center">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-4/6 h-12 p-3 m-4 mb-6 rounded-xl outline-none bg-gray-700"
            type="text"
            placeholder="Mesaj yaz ..."
          />
          <button
            onClick={sendMessage}
            className="w-1/6 h-12 bg-sky-500/75 mb-2 rounded-xl hover:bg-sky-500/100"
          >
            Gönder
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
