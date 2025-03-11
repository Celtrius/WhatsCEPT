import { useState, useRef } from "react";
import JSZip from "jszip";
import StartScreen from "./StartScreen";
import LoadingScreen from "./LoadingScreen";
import ChatWindow from "./ChatWindow";

export default function Previewer() {
  const [messages, setMessages] = useState([]);
  const [zipFileName, setZipFileName] = useState(""); // Store the ZIP file name
  const [attachments, setAttachments] = useState({});
  const [participants, setParticipants] = useState(new Set());
  const [selfName, setSelfName] = useState("");
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [viewState, setViewState] = useState("start"); // "start" | "loading" | "chat"
  const [progress, setProgress] = useState(0); // New progress state
  const chatRef = useRef(null);

  // Function to handle ZIP file upload
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setZipFileName(file.name); // Store the file name

    setViewState("loading"); // Show loading screen
    setProgress(0); // Reset progress

    const zip = new JSZip();
    const zipData = await zip.loadAsync(file);

    const files = Object.keys(zipData.files);
    const totalFiles = files.length;
    let processedFiles = 0;

    const chatFile = files.find((name) => name.endsWith(".txt"));
    if (!chatFile) {
      alert("Keine Chat-Datei gefunden!");
      setViewState("start");
      return;
    }

    // Process each file and update progress
    for (const fileName of files) {
      const file = zipData.files[fileName];
      if (!file.dir) {
        await file.async("blob"); // Simulate processing file
        processedFiles++;
        setProgress(Math.round((processedFiles / totalFiles) * 100));
      }
    }

    const chatContent = await zipData.files[chatFile].async("text");
    await parseChat(chatContent, zipData);

    setTimeout(() => setViewState("chat"), 500); // Simulate loading delay
  };

  // Function to parse WhatsApp chat export
  const parseChat = async (text, zipData) => {
    const lines = text.split("\n");
    const parsedMessages = [];
    const detectedParticipants = new Set();
    const attachmentMap = {};

    for (const line of lines) {
      const match = line.match(
        /\[(\d{2}\.\d{2}\.\d{2}), (\d{2}:\d{2}:\d{2})\] (.+?): (.+)/
      );
      if (match) {
        let sender = match[3];
        detectedParticipants.add(sender);
        let messageText = match[4];
        let attachment = null;
        let attachmentType = "file";
        let attachmentName = null;
        let isSystemMessage = false;
        let edited = false;

        // Detect system messages in group chats (sent by the group name)
        if (
          sender ===
          zipFileName.replace("WhatsApp Chat - ", "").replace(".zip", "").trim()
        ) {
          isSystemMessage = true;
        }

        // Detect edited messages

        //Detect edited messages

        if (messageText.includes("<Diese Nachricht wurde bearbeitet.>")) {
          edited = true;
          messageText = messageText
            .replace("<Diese Nachricht wurde bearbeitet.>", "")
            .trim();
        }

        // Detect attachments
        const attachmentMatch = messageText.match(/<Anhang: (.+?)>/);
        if (attachmentMatch) {
          attachmentName = attachmentMatch[1];
          messageText = "📎 Anhang: " + attachmentName;

          if (zipData.files[attachmentName]) {
            const blob = await zipData.files[attachmentName].async("blob");
            const url = URL.createObjectURL(blob);
            attachmentMap[attachmentName] = url;

            if (attachmentName.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
              attachmentType = attachmentName.includes("STICKER")
                ? "sticker"
                : "image";
            } else if (attachmentName.match(/\.(opus|mp3|wav|ogg)$/i)) {
              attachmentType = "audio";
            } else if (attachmentName.match(/\.(mp4|webm|mov|avi|mkv)$/i)) {
              attachmentType = "video";
            }
            attachment = url;
          }
        }

        parsedMessages.push({
          date: match[1],
          time: match[2],
          sender,
          message: messageText,
          edited,
          isSystemMessage,
          attachment,
          attachmentType,
          attachmentName,
        });
      }
    }

    setMessages(parsedMessages);
    setParticipants(detectedParticipants);
  };

  // Function to scroll to bottom
  const scrollToBottom = () => {
    if (chatRef.current) {
      chatRef.current.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  // Function to handle scroll event
  const handleScroll = () => {
    if (chatRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatRef.current;
      setShowScrollButton(scrollHeight - (scrollTop + clientHeight) > 100);
    }
  };

  return (
    <div className="flex h-screen max-w-4xl">
      {viewState === "start" && (
        <StartScreen handleFileUpload={handleFileUpload} />
      )}
      {viewState === "loading" && <LoadingScreen progress={progress} />}
      {viewState === "chat" && (
        <ChatWindow
          messages={messages}
          participants={participants}
          selfName={selfName}
          setSelfName={setSelfName}
          chatRef={chatRef}
          handleScroll={handleScroll}
          showScrollButton={showScrollButton}
          scrollToBottom={scrollToBottom}
          zipFileName={zipFileName} // Pass the file name to ChatWindow
        />
      )}
    </div>
  );
}
