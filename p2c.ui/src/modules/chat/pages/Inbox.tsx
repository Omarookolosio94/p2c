import { useParams } from "react-router-dom";
import { fakeUser, generateFakeChat } from "../../../core/utilities/mocks";
import { formatChatDate, getInitials } from "../../../core/utilities/helpers";
import send from "../../../assets/send.svg";
import TextArea from "../../../core/components/html/TextArea";
import MessageBox from "../partials/MessageBox";
import { useBoundStore } from "../../../core/stores/useBoundStore";

export default function Inbox() {
  const { chatId } = useParams<{ chatId: string }>();
  const user = fakeUser();
  const chats = generateFakeChat(chatId, "", 100);
  const getProfile = useBoundStore((store) => store.getContactProfile);

  return (
    <>
      <header className="sticky top-0 z-20 flex h-16 w-full justify-between border-b bg-white px-3">
        <div className="flex items-center gap-3" onClick={() => getProfile()}>
          <div className="relative flex h-[36px] min-h-[36px] w-[36px] min-w-[36px] items-center justify-center gap-3 rounded-full bg-brand-blue-dark text-white">
            <p>{getInitials(user?.name)}</p>
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
            <div className="mb-5 text-center">
              <p className="msg text-gray-500">
                {formatChatDate(user?.lastSeen || "")}
              </p>
            </div>

            {chats?.messages?.map((chat) => (
              <MessageBox
                key={chat?.messageId}
                data={chat}
                isMine={chat?.senderUserId == chatId}
              />
            ))}

            <div className="mb-2 text-left">
              <div className="msg">
                <p className="mb-3">
                  OMG do you remember what you did last night at the work night
                  out?
                </p>
                <p className="text-end text-xs text-gray-500">
                  {formatChatDate(user?.lastSeen || "")}
                </p>
              </div>
            </div>
          </div>
        </div>

        <form className="sticky bottom-3 z-20 flex w-full items-end rounded-[12px] bg-white p-2">
          <div className="w-full">
            <TextArea
              name=""
              placeholder="Message"
              textareaClassName="!border-none !outline-none"
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
