import BookMarkSingle from "../features/bookmark/BookMarkSingle";
import useGetUserBookMars from "../features/bookmark/useGetUserBookMarks";
import Spinner from "../ui/Spinner";

function BookMarks() {
  const { isPending, bookmarks } = useGetUserBookMars();

  return (
    <div className="mx-auto container py-[6rem] px-[4rem]">
      <h1 className="text-2xl font-medium mb-[2rem] tracking-[0.2rem]">
        Saved Jobs !
      </h1>
      {isPending ? (
        <Spinner />
      ) : (
        <div className="flex flex-col gap-[2rem]">
          {bookmarks.map((savedPost) => (
            <BookMarkSingle
              jobpost={savedPost.post}
              bookmarkId={savedPost._id}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default BookMarks;
