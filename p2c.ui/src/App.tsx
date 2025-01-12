import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import CustomLoader from "./core/components/CustomLoader";
import { UseScrollToTop } from "./core/hooks/useScrollToTop";
import { Toaster } from "react-hot-toast";
import { useBoundStore } from "./core/stores/useBoundStore";

const Auth = React.lazy(() => import("./modules/auth/Auth"));
const Login = React.lazy(() => import("./modules/auth/pages/Login"));
const Signup = React.lazy(() => import("./modules/auth/pages/Signup"));
const Chat = React.lazy(() => import("./modules/chat/Chat"));
const Inbox = React.lazy(() => import("./modules/chat/pages/Inbox"));

function App() {
  const isLoading = useBoundStore((store) => store.isLoading());
  return (
    <>
      {isLoading && <CustomLoader />}
      <Router>
        <UseScrollToTop />
        <Toaster />
        <Suspense fallback={<CustomLoader />}>
          <Routes>
            <Route path="/" element={<Auth />}>
              <Route index element={<Login />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
            </Route>

            <Route path="chats" element={<Chat />}>
              <Route path=":chatId" element={<Inbox />} />
            </Route>

            <Route path="/chats/*" element={<Navigate to="/chats" replace />} />
            <Route path="/*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
