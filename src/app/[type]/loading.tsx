import { FaSpinner } from "react-icons/fa";

function Loading(): JSX.Element {
  return (
    <div className="group relative flex flex-col items-center justify-center p-0 m-1 w-full h-full text-black rounded-5 bg-gray-300 shadow transition-all duration-300 scale-95 hover:scale-100 rounded-lg border-2">
      <FaSpinner className="animate-spin text-blue-500" size={36} />
    </div>
  );
}

export default Loading;
