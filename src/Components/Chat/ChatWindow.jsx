import "./ChatWindow.css";
import React, { useEffect, useState, useRef } from "react";

export default function ChatWindow() {
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState([]);
  const chat = useRef(null);

  let dateFormat = `${new Date().toLocaleString("default", {
    day: "numeric",
  })} ${new Date().toLocaleString("default", {
    month: "long",
  })}, ${new Date().toLocaleString("default", { year: "numeric" })}`;

  useEffect(() => {
    chat.current.scrollTop = chat.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    const wait = setTimeout(() => {
      // console.log("are you still there?")
      const warnMessage = {
        text: "Are you still there?",
        date: dateFormat,
        sender: "bot",
      };
      setMessages((prev) => [...prev, warnMessage]);
    }, 20000);
    return () => clearTimeout(wait);
  }, [value]);

  function handleValue(event) {
    setValue(event.target.value);
  }

  function handleSend() {
    const newSentMessage = {
      text: value,
      date: dateFormat,
      sender: "user",
    };
    setMessages([...messages, newSentMessage]);
    handleBot(value);
    console.log(messages);
    setValue("");
  }

  function handleBot(message) {
    let charCount = message.replaceAll(" ", "").length;
    let digitCount = 0;
    for (let i = 0; i < message.length; i++) {
      if (message.charAt(i) >= "0" && message.charAt(i) <= "9") {
        digitCount++;
      }
    }
    let vowels = ["a", "e", "i", "o", "u"];
    let vowelCount = 0;
    for (let i = 0; i < message.length; i++) {
      if (vowels.includes(message[i])) {
        vowelCount++;
      }
    }

    let consonantCount = 0;
    for (let i = 0; i < message.length; i++) {
      if (message.charAt(i) >= "a" && message.charAt(i) <= "z") {
        if (vowels.includes(message.charAt(i))) {
          continue;
        } else {
          consonantCount++;
        }
      }
    }

    let wordCount = message.split(" ").length;

    let specialcharcount = 0;
    for (let i = 0; i < value.length; i++){
        if(value.charAt(i) == "_" || value.charAt(i) == "$" || value.charAt(i) == "%"|| value.charAt(i) == "?" || value.charAt(i) == "." || value.charAt(i) == ","){
            specialcharcount++;
        }
    }

      let words = value.trim().split(" ");
  
      let charLength = 0 ;
  
      for(let i = 0; i < words.length; i++){
          charLength += words[i].length;
      }
      let avgwordlength = charLength / words.length;
  

    const ans = (
      <>
        Number of characters are: {charCount} <br />
        Number of digits are: {digitCount} <br />
        Number of vowels are: {vowelCount} <br />
        Number of consonants are: {consonantCount} <br />
        Number of words are: {wordCount} <br />
        Number of special characters are: {specialcharcount} <br />
        Average word length is: {avgwordlength}
      </>
    );
    const botMessage = {
      text: ans,
      date: dateFormat,
      sender: "bot",
    };

    setMessages((prev) => [...prev, botMessage]);
    console.log(messages);
  }

  return (
    <>
      <div className="chat-window" id="chat-window" ref={chat}>
        
        {messages.map((message, index) => (
          <div
            id={index}
            className={`message ${message.sender}`}
          >
            <div className="text">{message.text}</div>
            <div className="date-time">{message.date}</div>
          </div>
        ))}
      </div>
      <div className="footer">
        <input
          type="text"
          name="command"
          id="command"
          placeholder="Enter the text here..."
          value={value}
          onChange={handleValue}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </>
  );
}
