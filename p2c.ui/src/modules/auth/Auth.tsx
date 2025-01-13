import { Outlet } from "react-router-dom";
import logo from "../../assets/logo.svg";
import dots from "../../assets/dots.svg";

export default function Auth() {
  return (
    <>
      <div className="relative h-[100vh] w-full overflow-hidden bg-brand-blue">
        <div className="relative z-20 flex h-[100vh] items-center justify-center overflow-hidden">
          <main className="relative w-full rounded-lg bg-white px-5 py-20 sm:w-11/12 md:w-3/5 md:px-10 lg:w-[40%] xl:w-[30%]">
            <img src={dots} alt="" className="absolute -right-5 -top-5" />

            <div className="mb-10 w-full text-center">
              <img src={logo} alt="p2c" className="inline-block" />
            </div>

            <Outlet />

            <img src={dots} alt="" className="absolute bottom-1 left-1" />
          </main>
        </div>
      </div>
    </>
  );
}
