import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css'
import { ConvexReactClient } from "convex/react";
import { ConvexAuthProvider } from "@convex-dev/auth/react";

const convexUrl = import.meta.env.VITE_CONVEX_URL;

function Root() {
  if (!convexUrl) {
    return <App />;
  }

  const convex = new ConvexReactClient(convexUrl);
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
