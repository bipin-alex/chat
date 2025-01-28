import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import "./App.css";

const socket = io("http://localhost:5000"); // Backend server for WebSocket connection

function App() {
  const [messages, setMessages] = useState([]); // To store chat messages
  const [currentMessage, setCurrentMessage] = useState(""); // For user input
  const isFetching = useRef(false); // Track if the fetch is in progress

  // Handle receiving messages from the server
  
  useEffect(() => {
    axios
      .get("http://localhost:5000/msg")
      .then(data => {
          console.log("data>>>>",data.data)
          setMessages((prevMessages)=>[...prevMessages, ...data.data])
      })
      .catch(error => console.log("err>>>>",error))
      .finally(() => {
        isFetching.current = false; // Allow fetching again after completion
      });
      socket.on("receive_message", (data) => {
        console.log("socket data>>>>>", data)
      setMessages((prevMessages) => [...prevMessages, data]);
    });
    socket.on('delete_message',  (messageId) => {
      // setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
      console.log("inexfsaf>>>", messageId,messages)
      // const deletedMsg = messages.filter((msg,i)=>{
      //   console.log("i>>>", i)
      //     console.log("inex>>>", msg)
      //     return messageId != i
      //   })
      //   console.log("deletedMsg>>>", deletedMsg)
      setMessages((prevmsg)=>{
        console.log("prevmsg>>>", prevmsg)
        return [...prevmsg.filter((msg,i)=>{
            console.log("i>>>", i)
              console.log("inex>>>", msg)
              return messageId != i
            })]
            // console.log("del>>>", del)
            //  [...del]
      })
  });
    return () => socket.off("receive_message"); // Cleanup on component unmount
  }, []);

  // Send message to the server
  const sendMessage = () => {
    if (currentMessage.trim()) {
      socket.emit("send_message", currentMessage);
      setMessages((prevMessages) => [...prevMessages, { text: currentMessage, sender: "You" }]);
      setCurrentMessage("");
    }
  };
  const handleDelete = (msg, index)=>{
    // console.log(messages)
    // const deletedMsg = messages.filter((msg,i)=>{
    //   console.log("inex>>>", index, msg)
    //   return index != i
    // })
    console.log("dMsg>>>", messages)
    // setMessages((deletedMsg))
    socket.emit('delete_message', index);
  } 

  return (
    <div className="chat-container">
      <div className="chat-box">
        <h2>Chat Room</h2>
        <div className="messages">
          {messages.map((msg, index) => (
            
            <div key={index} className={`message ${msg.sender === "You" ? "sent" : "received"}`}>
              <span>{msg.sender}: {msg.text}</span>
              <button onClick={() => handleDelete(msg, index)}>🗑️</button>
            </div>
          ))}
        </div>
        <div className="input-box">
          <input
            type="text"
            value={currentMessage}
            placeholder="Type your message..."
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default App;
