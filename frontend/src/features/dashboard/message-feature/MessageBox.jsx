import MessageSidebar from "./sidebar/MessageSidebar";
import MessageContainer from "./message/MessageContainer";
function MessageBox() {
  return (
    <>
      <h1 className="text-2xl mb-[2rem]">Message!</h1>
      <div className="flex h-[50rem] rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-[2rem] rounded-xl shadow-lg ">
          <MessageSidebar />
        </div>
        <div className="bg-gray-50 px-[2rem] rounded-xl shadow-lg ">
          {" "}
          <MessageContainer />
        </div>
      </div>
    </>
  );
}

export default MessageBox;
