import { useEffect, useState } from "react";

export default function MemeGenerator() {
  const MEME_ENDPOINT = import.meta.env.VITE_MEME_ENDPOINT;
  const MEME_WITH_CAPTION_ENDPOINT = import.meta.env.VITE_MEME_WITH_CAPTION_ENDPOINT;
  const MEME_API = import.meta.env.VITE_IMGFLIP_KEY;
  const [data, setData] = useState([]);
  const [meme, setMeme] = useState();
  useEffect(() => {
    fetch(MEME_ENDPOINT, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setData(data.data.memes);
        setMeme(data.data.memes[0]);
      })
      .catch((error) => console.error("Fetch error:", error));
  }, []);

  function shuffleMeme() {
    const id = Math.ceil(Math.random() * data.length);
    setMeme(data[id]);
  }
  function updateMeme(formData: FormData) {
    if (!meme) return;
    const body = new URLSearchParams({
      template_id: meme.id,
      text0: String(formData.get("topText") ?? ""),
      text1: String(formData.get("bottomText") ?? ""),
    });
    fetch(MEME_WITH_CAPTION_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${MEME_API}`,
      },
      body,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setMeme(data.data);
      })
      .catch((error) => console.error("Fetch error:", error));
  }
  return (
    <div className="flex flex-col gap-2">
      <form className="space-y-2" action={updateMeme}>
        <div className="flex gap-2">
          <fieldset className="flex flex-col">
            <label htmlFor="topText">Top text</label>
            <input type="text" name="topText" defaultValue="hello" />
          </fieldset>
          <fieldset className="flex flex-col">
            <label htmlFor="bottomText">Bottom text</label>
            <input type="text" name="bottomText" defaultValue="world" />
          </fieldset>
        </div>
        <button type="submit">Update Meme</button>
      </form>
      <button onClick={shuffleMeme}>Shuffle Meme</button>
      {meme && (
        <img
          className="size-80 object-contain object-center border rounded mx-auto"
          src={meme.url}
        />
      )}
    </div>
  );
}
