export default function CustomLoader() {
  return (
    <div
      className={`no-scrollbar overlay fixed left-0 top-0 z-40 h-screen w-screen overflow-auto bg-black bg-opacity-10 backdrop-blur-sm backdrop-filter`}
      style={{
        minHeight: "calc(100vh - 72px)",
        zIndex: 1000,
      }}
    >
      <div className="flex h-full w-full flex-col items-center justify-center">
        <svg
          width="100px"
          height="100px"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 200"
        >
          <circle
            fill="none"
            strokeOpacity="1"
            stroke="#1E3A8A"
            strokeWidth=".5"
            cx="100"
            cy="100"
            r="0"
          >
            <animate
              attributeName="r"
              calcMode="spline"
              dur="2"
              values="1;80"
              keyTimes="0;1"
              keySplines="0 .2 .5 1"
              repeatCount="indefinite"
            ></animate>
            <animate
              attributeName="stroke-width"
              calcMode="spline"
              dur="2"
              values="0;25"
              keyTimes="0;1"
              keySplines="0 .2 .5 1"
              repeatCount="indefinite"
            ></animate>
            <animate
              attributeName="stroke-opacity"
              calcMode="spline"
              dur="2"
              values="1;0"
              keyTimes="0;1"
              keySplines="0 .2 .5 1"
              repeatCount="indefinite"
            ></animate>
          </circle>
        </svg>
        <p className="text-sm">Please wait...</p>
      </div>
    </div>
  );
}
