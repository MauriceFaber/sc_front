import React, { useState } from "react";
import { api } from "./Cameras";

export default function AddCamera() {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState();

  async function add() {
    console.log("add", name, url);
    if (!name || name.length == 0 || !url || url.length == 0) {
      setMessage("Name oder url nicht angegeben.");
    } else {
      setMessage("hinzufügen...");
      let request = new Request(api + `/cameraConfig?name=${name}&url=${url}`, {
        method: "POST",
      });

      const res = await fetch(request);
      console.log(res);
      if (res.ok) {
        const obj = await res.json();
        const added = !obj.message;
        if (added) {
          setMessage("Erfolgreich hinzugefügt!");
          setName("");
          setUrl("");
        } else {
          setMessage(obj.message + " ❌");
        }
      } else {
        setMessage("Fehler beim Hinzufügen ❌");
      }
    }
  }

  return (
    <>
      <h3>Webcam hinzufügen 📸</h3>
      <span>{message}</span>
      <span>Name ({name})</span>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>
      <span>Url ({url})</span>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      ></input>
      <button onClick={(e) => add()}>Hinzufügen</button>
    </>
  );
}
