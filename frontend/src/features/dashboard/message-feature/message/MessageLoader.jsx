const MessageLoader = () => {
  return (
    <div className="space-y-6 px-4 py-6 animate-pulse">
      {/* Incoming message skeleton */}
      <div className="flex gap-4 items-start">
        <div className="w-10 h-10 bg-gray-300 dark:bg-gray-400 rounded-full shrink-0"></div>
        <div className="flex flex-col gap-2">
          <div className="h-4 w-40 bg-gray-300 dark:bg-gray-300 rounded-md"></div>
          <div className="h-4 w-32 bg-gray-200 dark:bg-gray-200 rounded-md"></div>
        </div>
      </div>

      {/* Outgoing message skeleton */}
      <div className="flex gap-4 items-start justify-end">
        <div className="flex flex-col gap-2 items-end">
          <div className="h-4 w-32 bg-gray-300 dark:bg-gray-400 rounded-md"></div>
        </div>
        <div className="w-10 h-10 bg-gray-300 dark:bg-gray-300 rounded-full shrink-0"></div>
      </div>

      {/* Incoming message skeleton */}
      <div className="flex gap-4 items-start">
        <div className="w-10 h-10 bg-gray-300 dark:bg-gray-400 rounded-full shrink-0"></div>
        <div className="flex flex-col gap-2">
          <div className="h-4 w-36 bg-gray-300 dark:bg-gray-300 rounded-md"></div>
          <div className="h-4 w-24 bg-gray-200 dark:bg-gray-200 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export default MessageLoader;
