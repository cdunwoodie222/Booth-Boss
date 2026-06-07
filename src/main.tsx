import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css'
import { ConvexReactClient } from "convex/react";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { MockAuthProvider } from "./lib/convex-mock";

const convexUrl = import.meta.env.VITE_CONVEX_URL;
const isStandalone = !convexUrl;

function Root() {
  if (isStandalone) {
    return (
      <MockAuthProvider>
        <App />
      </MockAuthProvider>
    );
  }

  const convex = new ConvexReactClient(convexUrl as string);
  return (
    <ConvexAuthProvider client={convex}>
      <App />
    </ConvexAuthProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
)
