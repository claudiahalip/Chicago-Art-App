import { BASEIIIFIMAGEAPI, IMAGEEXTENTION } from "../constants";

interface ArtCardProps {
  imageId: string;
  thumbnail: {
    lqip: string;
    alt_text: string;
  };
  altText: string;
}

export function ArtCard({
  imageId,
  thumbnail,
  altText,
}: ArtCardProps) {
  return (
    <div
      className="flex flex-col min-h-[900px] min-w-[500px] m-6 rounded-lg overflow-hidden bg-neutral-100 justify-between cursor-pointer hover:shadow-lg hover:shadow-slate-600"
    >
      {thumbnail ? (
        <img
          src={`${BASEIIIFIMAGEAPI}/${imageId}${IMAGEEXTENTION}`}
          alt={altText || "Artwork"}
          width="500"
        ></img>
      ) : (
        <div className="bg-slate-400 text-xl align-center p-10">
          No photo available for this piece of art.
        </div>
      )}
      <div>
        <div className="text-center pb-4"> Click for more info </div>
      </div>
    </div>
  );
}
