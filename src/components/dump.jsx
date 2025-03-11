{
  /* Chat Messages */
}
<div
  ref={chatRef}
  className="flex-grow border p-4 rounded bg-gray-100 overflow-auto"
  onScroll={handleScroll}
>
  {(() => {
    let lastDate = null; // Track last message date
    return messages.map((msg, index) => {
      const showDateSeparator = lastDate !== msg.date;
      lastDate = msg.date;

      return (
        <div key={index}>
          {/* Date Separator */}
          {showDateSeparator && (
            <div className="text-center my-4">
              <span className="bg-gray-300 text-gray-700 text-sm px-3 py-1 rounded-full">
                {msg.date}
              </span>
            </div>
          )}

          {/* Message Bubble */}
          <div
            className={`p-2 my-1 rounded flex ${
              msg.sender === selfName ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-2 max-w-xs rounded-lg ${
                msg.sender === selfName
                  ? "bg-green-200 text-left"
                  : "bg-white text-left"
              }`}
            >
              <p className=" text-2xl text-gray-600">{msg.sender}</p>
              <p className="text-lg">{msg.message}</p>

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
              <p className="text-sm text-gray-800 text-right">{msg.time}</p>
            </div>
          </div>
        </div>
      );
    });
  })()}
</div>;
