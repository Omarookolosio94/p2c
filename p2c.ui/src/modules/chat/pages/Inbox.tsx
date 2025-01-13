import { useParams } from "react-router-dom";
import { formatChatDate, getInitials } from "../../../core/utilities/helpers";
import send from "../../../assets/send.svg";
import TextArea from "../../../core/components/html/TextArea";
import MessageBox from "../partials/MessageBox";
import { useBoundStore } from "../../../core/stores/useBoundStore";
import { useEffect, useState } from "react";
import useChat from "../../../core/hooks/useChat";

export default function Inbox() {
  const { chatId, userId } = useParams<{ chatId: string; userId: string }>();

  const [newContent, setNewContent] = useState<string>("");
  const { sendMessage, getChatHistory, initializeConnection } = useChat();

  const {
    getUserById,
    currentUser,
    singleUser: user,
    messages,
    setCurrentChatId,
    toggleProfile,
  } = useBoundStore();

  useEffect(() => {
    if (user == null) {
      getUserById(userId!);
    }
  }, []);

  useEffect(() => {
    if (chatId) {
      initializeConnection(currentUser?.userId, userId);

      getChatHistory(chatId);
      setCurrentChatId(chatId);
    }
  }, [chatId, currentUser?.userId]);

  const scrollWindowToTop = () => {
    const chatContainer = document.getElementById("chatBox");
    if (chatContainer) {
      chatContainer.scrollTop = 0;
    }
  };

  useEffect(() => {
    // This useEffect will run whenever `messages` change
    scrollWindowToTop();
  }, [messages]);

  // Send new message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newContent.trim() && chatId && currentUser?.userId && user?.userId) {
      await sendMessage(chatId, currentUser.userId, user?.userId, newContent);
      setNewContent("");
      scrollWindowToTop();
    }
  };

  return (
    <>
      <header className="sticky top-0 z-20 flex h-16 w-full justify-between border-b bg-white px-3">
        <div
          className="flex items-center gap-3"
          onClick={() => toggleProfile()}
        >
          <div className="relative flex h-[36px] min-h-[36px] w-[36px] min-w-[36px] items-center justify-center gap-3 rounded-full bg-brand-blue-dark text-white">
            <p>{getInitials(user?.name || "")}</p>
            {user?.isOnline && (
              <span className="absolute right-0 top-0 min-h-3 min-w-3 rounded-full bg-green-600"></span>
            )}
          </div>
          <div>
            <p className="font-medium">{user?.name}</p>
          </div>
        </div>
      </header>

      <div className="relative mx-auto mb-5 w-11/12 bg-[#F6F6F6] px-3 pt-8">
        <div className="mb-8 flex h-auto min-h-[70vh] flex-col justify-end gap-3">
          <div>
            <div id="chatbox" className="mb-5 text-center">
              <p className="msg text-gray-500">
                {formatChatDate(user?.lastSeen || "")}
              </p>
            </div>

            {messages?.map((chat) => (
              <MessageBox
                key={chat?.timestamp}
                data={chat}
                isMine={chat?.senderUserId == currentUser?.userId}
              />
            ))}
          </div>
        </div>

        <form
          onSubmit={handleSendMessage}
          className="sticky bottom-3 z-20 flex w-full items-end rounded-[12px] bg-white p-2"
        >
          <div className="w-full">
            <TextArea
              name="content"
              placeholder="Message"
              value={newContent}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(e);
                }
              }}
              textareaClassName="!border-none !outline-none"
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onChange={(e: any) => setNewContent(e?.target?.value)}
            />
          </div>

          <button type="submit">
            <img src={send} alt="send message" />
          </button>
        </form>
      </div>
    </>
  );
}
