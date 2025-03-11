import { useEffect } from "react";

export default function StartScreen({ handleFileUpload }) {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col rounded-2xl w-[80vw] lg:w-[500px] bg-[#1E1E1E] shadow-xl">
        <figure className="flex justify-center items-center rounded-2xl">
          <img src="/chat.webp" alt="Card Preview" className="rounded-t-2xl" />
        </figure>
        <div className="flex flex-col p-8">
          <div className="text-2xl font-bold text-[#DDDDDD] pb-6">
            WhatsApp Chat Export Preview 🔎
          </div>
          <div className="text-lg text-[#DDDDDD]">
            Preview your exported WhatsApp chat in a beautiful way. Open Source
            and 100% client-side.
            <br />
            <button
              className="text-[#A855F7] underline hover:text-[#9333EA] transition"
              type="button"
              data-hs-overlay="#hs-basic-modal"
              aria-haspopup="dialog"
              aria-expanded="false"
              aria-controls="hs-basic-modal"
            >
              Learn how to export your chat
            </button>
          </div>
          <div className="flex justify-end pt-6">
            <button className="bg-[#2C2C2E] text-[#DDDDDD] w-full font-bold text-base p-3 rounded-lg hover:bg-neutral-700 active:scale-95 transition-transform transform relative">
              <span>Select .zip 🗂️</span>
              <input
                type="file"
                onChange={handleFileUpload}
                className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                accept=".zip"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Modal for Export Guide */}
      <div
        id="hs-basic-modal"
        className="hs-overlay hidden fixed inset-0 z-[60] flex items-center justify-center bg-black/50"
        role="dialog"
        tabIndex="-1"
        aria-labelledby="hs-basic-modal-label"
      >
        <div className="hs-overlay-open:opacity-100 hs-overlay-open:duration-500 opacity-0 transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
          <div className="flex flex-col shadow-2xs rounded-xl pointer-events-auto bg-neutral-800 border-neutral-700 shadow-neutral-700/70">
            <div className="flex justify-between items-center py-3 px-4 border-b border-neutral-700">
              <h3 id="hs-basic-modal-label" className="font-bold text-white">
                How to Export a WhatsApp Chat
              </h3>
              <button
                type="button"
                className="flex justify-center items-center size-7 text-sm font-semibold rounded-full border border-transparentfocus:outline-hidden disabled:opacity-50 disabled:pointer-events-none text-white hover:bg-neutral-700 focus:bg-neutral-700"
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
              <p className="mt-1 text-neutral-400">
                To export your WhatsApp chat:
              </p>
              <ol className="list-decimal pl-6 space-y-2 text-neutral-400">
                <li>Open WhatsApp and go to the chat you want to export.</li>
                <li>
                  Tap on the <strong>three dots menu</strong> (Android) or
                  <strong> chat options</strong> (iPhone). On PC / Mac
                  right-click the chat in the sidebar.
                </li>
                <li>
                  Select <strong>Export chat</strong>. This option might be
                  hidden in a "more" overflow menu.
                </li>
                <li>
                  Choose whether to <strong>include media</strong> or
                  <strong> export only text</strong>.
                </li>
                <li>
                  Save the exported <strong>.zip</strong> file and select it
                  here. <br></br>
                  Your data is <strong>secure</strong> and never leaves your
                  computer.
                </li>
              </ol>
            </div>
            <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t border-neutral-700">
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

      {/* GitHub Button */}
      <a
        href="https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPOSITORY"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-5 -z-10 text-[#DDDDDD] hover:text-[#A855F7] transition text-sm"
      >
        🌟 View on GitHub
      </a>
    </div>
  );
}
