import { useEffect, useState } from "react";
import "preline"; // Import Preline to ensure it's available

export default function ChatWindow({
  messages,
  participants,
  selfName,
  setSelfName,
  chatRef,
  handleScroll,
  showScrollButton,
  scrollToBottom,
  zipFileName,
}) {
  // Extract the chat name from the ZIP file name
  const chatName = zipFileName
    .replace("WhatsApp Chat - ", "")
    .replace(".zip", "")
    .trim();
  const [nameColors, setNameColors] = useState({}); // Store assigned colors

  useEffect(() => {
    // Ensure Preline UI elements initialize properly after component mounts
    if (window.HSOverlay) {
      window.HSOverlay.autoInit();
    }
  }, []);

  // Function to generate a random color
  const getRandomColor = () => {
    const colors = [
      "#e6194B",
      "#3cb44b",
      "#ffe119",
      "#4363d8",
      "#f58231",
      "#911eb4",
      "#46f0f0",
      "#f032e6",
      "#bcf60c",
      "#fabebe",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Function to get or assign a color to a sender
  const getSenderColor = (sender) => {
    if (!nameColors[sender]) {
      setNameColors((prevColors) => ({
        ...prevColors,
        [sender]: getRandomColor(),
      }));
    }
    return nameColors[sender];
  };

  return (
    <>
      {/* Modal for Chat Settings */}
      <div
        id="hs-basic-modal"
        className="hs-overlay hidden fixed inset-0 z-[60] flex items-center justify-center bg-black/50"
        role="dialog"
        tabIndex="-1"
        aria-labelledby="hs-basic-modal-label"
      >
        <div className="hs-overlay-open:opacity-100 hs-overlay-open:duration-500 opacity-0 transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
          <div className="flex flex-col bordershadow-2xs rounded-xl pointer-events-auto bg-neutral-800 border-neutral-700 shadow-neutral-700/70">
            <div
              className="flex justify-between items-center py-3 px-4 border-b 
             border-neutral-700"
            >
              <h3 id="hs-basic-modal-label" className="font-bold  text-white">
                Chat Settings
              </h3>
              <button
                type="button"
                className="flex justify-center items-center size-7 text-sm font-semibold rounded-full border border-transparent  focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none text-white hover:bg-neutral-700 focus:bg-neutral-700"
                aria-label="Close"
                data-hs-overlay="#hs-basic-modal"
              >
                <span className="sr-only">Close</span>
                <svg
                  className="shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </button>
            </div>
            <div className="p-4 overflow-y-auto">
              {/* Name selection */}
              <div className="mb-4">
                {participants.size > 0 && (
                  <div>
                    <label className="block mb-2 text-white">
                      Select your <strong>name</strong>:
                    </label>
                    <select
                      value={selfName}
                      onChange={(e) => setSelfName(e.target.value)}
                      className="p-2 border rounded w-full text-white"
                    >
                      <option value="">-- Please select --</option>
                      {[...participants].map((name) => (
                        <option key={name} value={name}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t  border-neutral-700">
              <button
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border shadow-2xs focus:outline-hidden  disabled:opacity-50 disabled:pointer-events-none bg-neutral-800 border-neutral-700 text-white hover:bg-neutral-700 focus:bg-neutral-700"
                data-hs-overlay="#hs-basic-modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex flex-col h-[100vh] lg:w-[70vw] md:w-[90vw] w-[100vw] p-1 mx-auto rounded-lg bg-[#1E1E1E]/10 shadow-lg relative">
        {/* Chat Header */}
        <div className="flex items-center gap-3 p-3 border-b border-neutral-700 bg-[#1E1E1E] rounded-t-lg">
          {/* Profile Image / Group Icon */}
          <div className="w-10 h-10 flex items-center justify-center bg-gray-700 rounded-full">
            {participants.size > 2 ? (
              <i className="fas fa-users text-white text-lg"></i> // Group Icon
            ) : (
              <i className="fas fa-user text-white text-lg"></i> // Single Person Icon
            )}
          </div>

          {/* Chat Info */}
          <div className="flex flex-col">
            {/* Chat Name */}
            <p className="text-white font-bold">{chatName}</p>

            {/* Show Participants List Only If It’s a Group Chat */}
            {participants.size > 2 && (
              <p className="text-sm text-gray-400 truncate overflow-hidden whitespace-nowrap max-w-[300px]">
                {[...participants].slice(0, 5).join(", ")}
                {participants.size > 5 && " ..."}
              </p>
            )}
          </div>

          {/* Settings Button */}
          <button
            className="ml-auto p-3 bg-gray-800 text-white rounded-full shadow-md hover:bg-gray-700 transition flex items-center justify-center"
            type="button"
            data-hs-overlay="#hs-basic-modal"
            aria-haspopup="dialog"
            aria-expanded="false"
            aria-controls="hs-basic-modal"
          >
            <i className="fas fa-cog text-xl"></i> {/* Font Awesome Cog Icon */}
          </button>
        </div>

        {/* Chat Messages */}
        <div
          ref={chatRef}
          className="flex-grow p-4 rounded overflow-auto"
          onScroll={handleScroll}
        >
          {(() => {
            let lastDate = null; // Track last message date
            return messages.map((msg, index) => {
              const showDateSeparator = lastDate !== msg.date;
              const isFirstInBlock =
                showDateSeparator ||
                index === 0 ||
                messages[index - 1].sender !== msg.sender;
              lastDate = msg.date;

              return (
                <div key={index}>
                  {/* Date Separator */}
                  {showDateSeparator && (
                    <div className="text-center my-4">
                      <span className="bg-[#1F1F1F] text-[#A5A5A5] text-sm px-3 py-1 rounded-full">
                        {msg.date}
                      </span>
                    </div>
                  )}

                  {/* Message Bubble */}
                  <div
                    className={`rounded flex ${
                      msg.sender === selfName ? "justify-end" : "justify-start"
                    } ${isFirstInBlock ? "mt-7" : "mt-1"}`}
                  >
                    <div
                      className={`p-2 gap-0 flex flex-col max-w-[75%] ${
                        msg.sender === selfName
                          ? "bg-[#005046] shadow-md shadow-black/20 text-left"
                          : "bg-[#363638] shadow-md shadow-black/20 text-left"
                      } ${
                        index === messages.length - 1 ||
                        showDateSeparator ||
                        messages[index + 1]?.sender !== msg.sender
                          ? msg.sender === selfName
                            ? "rounded-2xl rounded-br-none bubble-right" // Right-side speech bubble
                            : "rounded-2xl rounded-bl-none bubble-left" // Left-side speech bubble
                          : "rounded-2xl" // Normal rounded corners for other messages
                      }`}
                    >
                      {index === 0 ||
                      messages[index - 1].sender !== msg.sender ? (
                        <p
                          className="text-sm font-bold"
                          style={{ color: getSenderColor(msg.sender) }}
                        >
                          {msg.sender}
                        </p>
                      ) : null}
                      <p className="text-lg text-[#E0E0E0] break-words">
                        {msg.message}
                      </p>

                      {/* Image Attachments */}
                      {msg.attachment && msg.attachmentType === "image" && (
                        <img
                          src={msg.attachment}
                          alt="Attachment"
                          className="mt-2 max-w-full rounded-lg"
                        />
                      )}

                      {/* Sticker Attachments */}
                      {msg.attachment && msg.attachmentType === "sticker" && (
                        <img
                          src={msg.attachment}
                          alt="Sticker"
                          className="mt-2 max-w-20 rounded-lg sticker-class"
                        />
                      )}

                      {/* Audio Attachments */}
                      {msg.attachment && msg.attachmentType === "audio" && (
                        <audio controls className="mt-2 w-full">
                          <source src={msg.attachment} />
                          Dein Browser unterstützt das Audioformat nicht.
                        </audio>
                      )}

                      {/* Video Attachments */}
                      {msg.attachment && msg.attachmentType === "video" && (
                        <video controls className="mt-2 max-w-full rounded-lg">
                          <source src={msg.attachment} />
                          Dein Browser unterstützt dieses Videoformat nicht.
                        </video>
                      )}

                      {/* Other File Attachments */}
                      {msg.attachment && msg.attachmentType === "file" && (
                        <a
                          href={msg.attachment}
                          download={msg.attachmentName}
                          className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        >
                          📥 {msg.attachmentName} herunterladen
                        </a>
                      )}

                      <p className="text-sm text-[#A4A4A4] text-right">
                        {msg.edited && (
                          <>
                            {msg.edited && (
                              <span className="text-red-400">Edited - </span>
                            )}
                            <span> </span>
                          </>
                        )}
                        {msg.time ? msg.time.slice(0, 5) : ""}
                      </p>
                    </div>
                  </div>
                </div>
              );
            });
          })()}
        </div>
        {/* Scroll to Bottom Button */}
        {showScrollButton && (
          <button
            onClick={scrollToBottom}
            className="fixed bottom-10 right-10 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700"
          >
            <i class="fa-solid fa-chevron-down"></i>
          </button>
        )}
      </div>
    </>
  );
}
