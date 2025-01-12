import { Link, Outlet, useNavigate } from "react-router-dom";
import { cx, formatChatDate, getInitials } from "../../core/utilities/helpers";
import logo from "../../assets/logo.svg";
import search from "../../assets/search.svg";
import close from "../../assets/close.svg";
import { useBoundStore } from "../../core/stores/useBoundStore";
import { useEffect } from "react";

export default function Chat() {
  const getContacts = useBoundStore((store) => store.getContacts);
  const contacts = useBoundStore((store) => store.contacts);
  const profile = useBoundStore((store) => store.contactProfile);
  const resetProfile = useBoundStore((store) => store.resetProfile);

  const navigate = useNavigate();

  useEffect(() => {
    getContacts();
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
            <form className="bg-brand-gray flex items-center rounded-[22px] px-3">
              <img src={search} alt="search user" />
              <input
                className="input !h-[46px] !border-none !outline-none"
                placeholder="Search"
              />
            </form>
          </header>

          <div>
            {contacts?.length > 0 &&
              contacts?.map((contact) => (
                <div
                  className={cx(
                    "h hover:bg-brand-gray flex items-start justify-between gap-3 px-3 py-5",
                  )}
                  key={contact?.userId}
                  onClick={() => {
                    navigate(`/chats/${contact?.userId}`);
                  }}
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
                      <p className="line-clamp-1 text-sm font-light text-gray-500">
                        See you later Lorem ipsum dolor sit amet consectetur
                        adipisicing elit. Earum error aliquid atque veniam
                        velit, ipsum, explicabo autem expedita a debitis illo
                        dicta facilis nobis libero assumenda! Culpa quam sed
                        hic.
                      </p>
                    </div>
                  </div>
                  <div className="min-w-[15%]">
                    <p className="mb-1 text-end text-xs text-gray-500">
                      {formatChatDate(contact?.lastSeen || "")}
                    </p>

                    <div className="flex items-end justify-end">
                      <div className="ml-auto flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                        2
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="flex-grow overflow-y-auto border-x bg-[#F6F6F6]">
          <Outlet />
        </div>

        {profile && (
          <div
            className={cx(
              "fixed inset-y-0 left-0 z-40 ml-0 h-screen w-[360px] overflow-auto border-r-[.5px] bg-white transition-[margin-left] duration-500 ease-in-out md:static md:w-[360px]",
            )}
          >
            <div className="relative p-3">
              <button onClick={() => resetProfile()}>
                <img src={close} alt="close profile" />
              </button>

              <div className="flex flex-col items-center justify-center gap-4 border-b pb-8">
                <div className="relative flex h-[135px] min-h-[135px] w-[135px] min-w-[135px] items-center justify-center gap-3 rounded-full bg-brand-blue-dark text-white">
                  <p className="text-2xl">{getInitials(profile?.name)}</p>
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
