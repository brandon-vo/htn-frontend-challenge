import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as faBookmarkSolid } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as faBookmarkRegular } from "@fortawesome/free-regular-svg-icons";
import { TEvent } from "../../types/EventType";

export const bookmarkAtom = atomWithStorage<TEvent[]>("bookmarkedEvents", []);

interface BookmarkButtonProps {
  event: TEvent;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ event }) => {
  const [bookmarkedEvents, setBookmarkedEvents] = useAtom(bookmarkAtom);

  const handleBookmark = (event: TEvent) => {
    const isBookmarked = bookmarkedEvents.some(
      (bookmarkedEvent) => bookmarkedEvent.id === event.id,
    );

    // Toggle bookmark status
    if (isBookmarked) {
      // Remove from bookmarked events
      setBookmarkedEvents((prevBookmarkedEvents) =>
        prevBookmarkedEvents.filter(
          (bookmarkedEvent) => bookmarkedEvent.id !== event.id,
        ),
      );
    } else {
      // Add to bookmarked events
      setBookmarkedEvents((prevBookmarkedEvents) => [
        ...prevBookmarkedEvents,
        event,
      ]);
    }
  };
  return (
    <button onClick={() => handleBookmark(event)}>
      <FontAwesomeIcon
        icon={
          bookmarkedEvents.some(
            (bookmarkedEvent) => bookmarkedEvent.id === event.id,
          )
            ? faBookmarkSolid
            : faBookmarkRegular
        }
        className="ml-1 md:ml-2 text-black"
      />
    </button>
  );
};

export default BookmarkButton;
