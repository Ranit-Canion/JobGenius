function DeleteConfirmation({ resourceName, onConfirmed }) {
  return (
    <div className="flex flex-col gap-[0.7rem] w-[30rem] relative">
      <h1 className="text-xl text-gray-700 font-bold">Delete {resourceName}</h1>
      <p>
        {" "}
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </p>
      <div className="flex justify-end transition-all">
        <button
          onClick={onConfirmed}
          className="text-gray-50 cursor-pointer text-lg font-medium hover:bg-red-700 duration-300  rounded-xl  w-[6rem] p-2 bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default DeleteConfirmation;
