import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Conversations from "./Conversations";

function MessageSidebar() {
  return (
    <div className="container mx-auto flex flex-col gap-[1.5rem] w-[20rem] ">
      <form className="mt-[2rem]">
        <div className="flex items-center mt-[1rem] w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            id="search"
            placeholder="Enter job title or keyword"
            className="ml-3 w-full bg-gray-50 outline-none text-gray-700 placeholder-gray-400"
          />
        </div>
      </form>
      <Conversations />
    </div>
  );
}

export default MessageSidebar;
