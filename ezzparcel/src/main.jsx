import React from "react"; // react library import kore jeita essential for building react components
import ReactDOM from "react-dom/client"; // reactDOM library import korsi. eita use kore amra DOM er shathe interact korte pari. eita use kori to Render React applications into the HTML

import "./index.css";

import AOS from "aos"; // animation for scroll effect use korar jonno eita import korsi

import "aos/dist/aos.css"; // css import kore animation for scroll effect er jonno.
import "leaflet/dist/leaflet.css";

import { RouterProvider } from "react-router/dom"; // react router use kori karon amra SPA(single page application) banacchi ar etay navigation er jonno react router bhalo kaj kore. 1. client side e routing handle kore. 2. server er upor dependent kom thake etc

import { router } from "./router/router.jsx"; // routes define kore for the application

import AuthProvider from "./contexts/AuthContext/AuthProvider.jsx"; // which is used to manage user authentication state using react Context
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

AOS.init({
  duration: 1000, //React animation er duration eita. 1000 miliseconds (1sec)
});
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="font-lexend max-w-7xl mx-auto">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
    </div>
  </React.StrictMode>
);

/**
 * ReactDOM.createRoot(document.getElementById("root")): This line selects the HTML element with the ID "root" (usually a <div id="root"> in your index.html file). It creates a root instance where the React app will be rendered.

.render(...): This is where the React application is actually rendered into the "root" element.

<React.StrictMode>: development stage e onek problem show kore jeno amra fix korte pari

The rest is the JSX that defines the structure of the application:

A div element provides styling (font-lexend, max-w-7xl, mx-auto).
The whole application is wrapped in <AuthProvider>, making authentication context available to all components.
<RouterProvider router={router} /> renders the application's routing configuration, enabling navigation between different views.
 */
