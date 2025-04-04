import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center m-10">
      <div className="flex">
        <img
          src="/images/AIC2.jpeg"
          alt="Art Institute of Chicago 1"
          width="800"
        ></img>
        <img
          src="/images/AIC3.jpeg"
          alt="Art Institute of Chicago 2"
          width="800"
        ></img>
        <img
          src="/images/AIC4.jpeg"
          alt="Art Institute of Chicago 3"
          width="800"
        ></img>
      </div>
      <div className="flex flex-col gap-6 bg-orange-100 px-72 py-10">
        <h1 className="text-3xl font-bold text-center mt-10 text-red-500">
          The art of Art Institute of Chicago
        </h1>
        <p>
          My mini app is designed to offer an interactive exploration of a
          curated collection of artworks from the Art Institute of Chicago. Upon
          initial display, users are shown only the images of the artworks,
          inviting them to engage with the collection by guessing the artist
          behind each piece. Once a user clicks on a specific artwork, the app
          reveals the artist's name along with other relevant details, such as
          the artist's background, the artwork’s context, and additional
          insights into the piece. This immersive experience fosters a deeper
          connection to the artwork and its creator, making it both informative
          and engaging for art enthusiasts.
        </p>

        <Link
          to={`/all-art`}
          title="See art list"
          className="flex rounded-2xl shadow-md shadow-slate-500 p-2 justify-center w-32 text-red-500 cursor-pointer hover:shadow-lg hover:shadow-slate-600"
        >
          See art list
        </Link>
      </div>
      <div className="flex">
        <img
          src="/images/AIC1.jpeg"
          alt="Art Institute of Chicago 4"
          width="800"
        ></img>

        <img
          src="/images/AIC5.jpeg"
          alt="Art Institute of Chicago 5"
          width="800"
        ></img>
        <img
          src="/images/AIC6.jpeg"
          alt="Art Institute of Chicago 6"
          width="800"
        ></img>
      </div>
    </div>
  );
}
