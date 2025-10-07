import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { ConversationProvider } from "./context/useConversation";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { SocketContextProvider } from "./context/SocketContext";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <SocketContextProvider>
        <ConversationProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ConversationProvider>
      </SocketContextProvider>
    </QueryClientProvider>
  </StrictMode>
);
