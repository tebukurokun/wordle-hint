import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement); // createRootを使用
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
