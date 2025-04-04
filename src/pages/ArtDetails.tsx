import { Link, Navigate, useLocation } from "react-router-dom";
import { ArtProps } from "../hooks/useGetArtCollection";
import { BASEIIIFIMAGEAPI, IMAGEEXTENTION } from "../constants";
import ReactHtmlParser from "html-react-parser";

export default function ArtDetails() {
  const location = useLocation();
  const art = location.state?.art as ArtProps | undefined;
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get("page");

  if (!art) {
    return <Navigate to="/all-art" replace />;
  }

  return (
    <div className="flex flex-col justify-center p-10 bg-neutral-100 m-10 rounded-xl ">
      <h1 className="md:text-3xl text-md font-bold text-center p-6">
        Artist: {art.artist_title}
      </h1>
      <img
        src={`${BASEIIIFIMAGEAPI}/${art.image_id}${IMAGEEXTENTION}`}
        alt={art.thumbnail?.alt_text || "Artwork"}
        className="max-h-[800px] w-auto object-contain"
      />
      <div className="pt-6">
        <p className="py-1">More details about this artwork:</p>
        <div className="py-1">
          <span className="font-bold">Artist: </span>
          {art.artist_display}
        </div>
        <div className="py-1 font-bold">
          Art work type: {art.artwork_type_title}
        </div>
        <div className="py-1">
          <span className="font-bold">Short description: </span>
          {art.description && ReactHtmlParser(art.description)}
        </div>
        <div className="py-1">
          <span className="font-bold">Provenance: </span>
          {art.provenance_text && ReactHtmlParser(art.provenance_text)}
        </div>
        <div className="py-1">
          <span className="font-bold">Exhibition history:</span>{" "}
          {art.exhibition_history && ReactHtmlParser(art.exhibition_history)}
        </div>
      </div>

      <Link
        to={`/all-art${page ? `?page=${page}` : ""}`}
        title="Back to art list"
        className="flex rounded-2xl shadow-md shadow-slate-500 p-2 justify-center w-32 text-red-500 cursor-pointer hover:shadow-lg hover:shadow-slate-600 mt-6"
      >
        Back to art list
      </Link>
    </div>
  );
}
