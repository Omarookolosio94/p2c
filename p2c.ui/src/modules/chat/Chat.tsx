import { Link, Outlet, useNavigate } from "react-router-dom";
import { cx, formatChatDate, getInitials } from "../../core/utilities/helpers";
import logo from "../../assets/logo.svg";
import search from "../../assets/search.svg";
import close from "../../assets/close.svg";
import { useBoundStore } from "../../core/stores/useBoundStore";
import { useEffect, useMemo, useState } from "react";
import Input from "../../core/components/html/Input";
import useChat from "../../core/hooks/useChat";

export default function Chat() {
  const navigate = useNavigate();

  const {
    singleUser: profile,
    users,
    isProfileOpen,
    toggleProfile,
    currentUser,
    chatRooms,
    getUsers,
    currentChatId,
  } = useBoundStore();

  const [searchUser, setSearchUser] = useState("");

  const filteredUsers = useMemo(() => {
    // Ensure users is an array before filtering
    const validUsers = Array.isArray(users) ? users : [];

    if (!searchUser)
      return validUsers.filter((user) => user?.userId !== currentUser?.userId);

    return validUsers.filter(
      (user) =>
        user?.userId !== currentUser?.userId &&
        (user.name.toLowerCase().includes(searchUser.toLowerCase()) ||
          user.email.toLowerCase().includes(searchUser.toLowerCase())),
    );
  }, [users, searchUser]);

  const { createOrJoinRoom, initializeConnection } = useChat();

  const startNewChat = async (contact: User) => {
    // If no chat history with this contact, create a new room
    if (
      !chatRooms.some(
        (chat) =>
          chat.user1Id == contact.userId || chat.user2Id == contact.userId,
      )
    ) {
      initializeConnection(currentUser?.userId, contact?.userId);

      await createOrJoinRoom(currentUser?.userId, contact.userId);

      navigate(`/chats/${currentChatId}/${contact?.userId}`);
    } else {
      navigate(`/chats`);
    }
  };

  useEffect(() => {
    getUsers();

    if (currentUser?.userId) {
      initializeConnection(currentUser?.userId, "");

      // getUserChatRooms(currentUser?.userId);
    }
  }, []);

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <div
          className={cx(
            "fixed inset-y-0 left-0 z-40 ml-0 h-screen w-[380px] min-w-[380px] overflow-auto border-r-[.5px] bg-white transition-[margin-left] duration-500 ease-in-out md:static md:w-[380px]",
          )}
        >
          <header className="sticky top-0 z-20 mb-5 w-full bg-white p-3">
            <Link to="/chats">
              <img src={logo} alt="p2c" className="mb-8 h-[40px] w-auto" />
            </Link>
            <div className="bg-brand-gray flex items-center rounded-[22px] px-3">
              <img src={search} alt="search user" />
              <div className="w-full">
                <Input
                  showError={false}
                  boxClassName="!mb-0"
                  className="!mb-0 !h-[46px] !w-full !border-none !outline-none"
                  placeholder="Search"
                  value={searchUser}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  onChange={(e: any) => {
                    setSearchUser(e?.target?.value);
                  }}
                />
              </div>
            </div>
          </header>

          {searchUser?.length > 0 ? (
            <div>
              {filteredUsers?.length > 0 &&
                filteredUsers?.map((contact) => (
                  <div
                    className={cx(
                      "h hover:bg-brand-gray flex items-start justify-between gap-3 px-3 py-5",
                    )}
                    key={contact?.userId}
                    onClick={() => startNewChat(contact)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="relative flex h-[48px] min-h-[48px] w-[48px] min-w-[48px] items-center justify-center gap-3 rounded-full bg-brand-blue-dark text-white">
                        <p>{getInitials(contact?.name)}</p>
                        {contact?.isOnline && (
                          <span className="absolute right-0 top-0 min-h-3 min-w-3 rounded-full bg-green-600"></span>
                        )}
                      </div>
                      <div>
                        <p className="mb-1 font-medium">{contact?.name}</p>
                      </div>
                    </div>
                    <div className="min-w-[15%]">
                      <p className="mb-1 text-end text-xs text-gray-500">
                        {formatChatDate(contact?.lastSeen || "")}
                      </p>

                      {/* 
                      <div className="flex items-end justify-end">
                        <div className="ml-auto flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                          2
                        </div>
                      </div>
                      */}
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div>
              {chatRooms?.length > 0 &&
                chatRooms?.map((contact) => (
                  <div
                    className={cx(
                      "h hover:bg-brand-gray flex items-start justify-between gap-3 px-3 py-5",
                    )}
                    key={contact?.chatId}
                    onClick={() =>
                      navigate(
                        `/chats/${contact?.chatId}/${contact.user1Id == currentUser?.userId ? contact?.user2Id : contact?.user1Id}`,
                      )
                    }
                  >
                    <div className="flex items-start gap-4">
                      <div className="relative flex h-[48px] min-h-[48px] w-[48px] min-w-[48px] items-center justify-center gap-3 rounded-full bg-brand-blue-dark text-white">
                        <p>
                          {getInitials(
                            contact?.user1Name !== currentUser?.name
                              ? contact?.user1Name
                              : contact?.user2Name,
                          )}
                        </p>

                        {/*
                        {contact? && (
                          <span className="absolute right-0 top-0 min-h-3 min-w-3 rounded-full bg-green-600"></span>
                        )}*/}
                      </div>
                      <div>
                        <p className="mb-1 font-medium">
                          {contact?.user2Name != currentUser?.name
                            ? contact?.user2Name
                            : contact?.user1Name}
                        </p>
                        <p className="line-clamp-1 text-sm font-light text-gray-500">
                          {contact?.messages[contact?.messages?.length - 1]
                            ?.content || ""}
                        </p>
                      </div>
                    </div>
                    <div className="min-w-[15%]">
                      <p className="mb-1 text-end text-xs text-gray-500">
                        {formatChatDate(
                          contact?.messages?.length > 0
                            ? contact?.messages[contact?.messages?.length - 1]
                                ?.timestamp
                            : "",
                        )}
                      </p>

                      {/* 
                      <div className="flex items-end justify-end">
                        <div className="ml-auto flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                          2
                        </div>
                      </div>
                      */}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>

        <div className="flex-grow overflow-y-auto border-x bg-[#F6F6F6]">
          <Outlet />
        </div>

        {isProfileOpen && (
          <div
            className={cx(
              "fixed inset-y-0 left-0 z-40 ml-0 h-screen w-[360px] overflow-auto border-r-[.5px] bg-white transition-[margin-left] duration-500 ease-in-out md:static md:w-[360px]",
            )}
          >
            <div className="relative p-3">
              <button onClick={() => toggleProfile()}>
                <img src={close} alt="close profile" />
              </button>

              <div className="flex flex-col items-center justify-center gap-4 border-b pb-8">
                <div className="relative flex h-[135px] min-h-[135px] w-[135px] min-w-[135px] items-center justify-center gap-3 rounded-full bg-brand-blue-dark text-white">
                  <p className="text-2xl">{getInitials(profile?.name || "")}</p>
                  <span className="absolute right-0 top-3 min-h-6 min-w-6 rounded-full bg-green-600"></span>
                </div>
                <div className="text-center">
                  <p className="mb-1 font-medium">{profile?.name}</p>

                  <div className="text-xs font-light text-gray-500">
                    <p className="mb-1">{profile?.phoneNumber}</p>
                    <p>{profile?.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
