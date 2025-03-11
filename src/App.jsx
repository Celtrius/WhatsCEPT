import React from "react";
import Preview from "./components/Preview";
import LoadingScreen from "./components/LoadingScreen";
import ChatWindow from "./components/ChatWindow";

function App() {
  return (
    <>
      <div className="relative w-full h-screen flex items-center justify-center">
        {/* Main Content */}
        <div className="absolute inset-0 -z-10 bg-pattern"></div>
        <Preview />
      </div>
      <script src="./node_modules/preline/dist/preline.js"></script>
    </>
  );
}

export default App;
