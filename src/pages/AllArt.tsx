import { Link, useSearchParams } from "react-router-dom";
import { ArtCard } from "../components/ArtCard";
import { useGetArtCollection } from "../hooks/useGetArtCollection";
import { useEffect, useRef, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

export default function AllArt() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = Number(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);
  const { data, error, isLoading } = useGetArtCollection(currentPage);
  const [highlightedCardId, setHighlightedCardId] = useState<string | null>(
    null
  );

  useEffect(() => {
    setSearchParams({ page: currentPage.toString() });
  }, [currentPage, setSearchParams]);

  const handleNextPage = () => {
    if (data && currentPage < data.pagination.total_pages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (error) return <p>Error: {error.message}</p>;
  const dataWithImage = data ? data.data.filter((obj) => obj.thumbnail) : [];

  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const clickedId = localStorage.getItem("clickedArtId");
    
    if (clickedId && cardRefs.current[clickedId]) {
      cardRefs.current[clickedId].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      setHighlightedCardId(clickedId);
      localStorage.removeItem("clickedArtId");
    }
  }, [data]);

  return (
    <div className="flex flex-col">
      <div className="sticky top-0 shadow-md bg-white pb-4">
        <Link
          to={"/"}
          className="pt-6 m-6 justify-center w-32 text-red-500 cursor-pointer hover:text-red-800"
        >
          Home
        </Link>
        <h1 className="md:text-3xl text-md font-bold text-center text-red-500 ">
          The art of Art Institute of Chicago
        </h1>
        <h2 className="md:text-3xl text-md text-center my-4">
          Guess who the artist is!
        </h2>
      </div>
      {isLoading && <LoadingSpinner />}
      <div className="flex flex-wrap justify-center">
        {dataWithImage &&
          dataWithImage.map((art, index) => {
            return (
              <Link
                key={`${index}-${art.artist_id}`}
                to={`/all-art/${art.artist_id}?page=${currentPage}`}
                state={{ art }}
                className="h-full"
                onClick={() => {
                  localStorage.setItem(
                    "clickedArtId",
                    `${index}-${art.artist_id}`
                  );
                  setHighlightedCardId(`${index}-${art.artist_id}`);
                }}
              >
                <div
                  id={`${index}-${art.artist_id}`}
                  key={`${index}-${art.artist_id}`}
                  ref={(el) => {
                    cardRefs.current[`${index}-${art.artist_id}`] = el;
                  }}
                  className={`transition-all duration-300 ${
                    highlightedCardId === `${index}-${art.artist_id}`
                      ? "ring-2 ring-red-500 text-red-500 rounded-xl"
                      : ""
                  }`}
                >
                  <ArtCard
                    imageId={art?.image_id}
                    thumbnail={art?.thumbnail}
                    altText={art?.thumbnail?.alt_text}
                  />
                </div>
              </Link>
            );
          })}
      </div>
      {!isLoading && (
        <div className="flex justify-center mt-4 items-center p-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg mr-2"
          >
            Previous
          </button>
          <span className="text-lg">
            Page {currentPage} of {data?.pagination.total_pages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === data?.pagination.total_pages}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg ml-2"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
