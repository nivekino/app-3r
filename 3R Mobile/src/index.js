import React from "react";
import PanitasFrontend from "./PanitasFrontend";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");

if (window.cordova) {
  document.addEventListener(
    "deviceready",
    () => {
      const root = createRoot(container);
      root.render(<PanitasFrontend />);
    },
    false
  );
} else {
  const root = createRoot(container);
  root.render(<PanitasFrontend />);
}
