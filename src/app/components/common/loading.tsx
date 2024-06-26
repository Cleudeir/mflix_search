import { FaSpinner } from "react-icons/fa";

function Loading({color = 'white'}): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <FaSpinner className="animate-spin text-blue-500" style={{filter:'revert'}}  color={color} size={36} />
    </div>
  );
}

export default Loading;
