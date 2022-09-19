import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./../index.css";
import { api } from "./Cameras";

export default function CameraListItem({ name, url }) {
  const tmp = api + "/current?name=" + name;
  const [newUrl, setUrl] = useState(tmp);

  useEffect(() => {
    const interval = setInterval(() => {
      const append = "&t=" + new Date().getTime();
      setUrl(tmp + append);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <a className="link" href={"/cameraDetail/" + name}>
      <div className="card">
        <div className="card-border">
          <p>{name}</p>
          <img className="smallImage" src={newUrl} alt={name} />
        </div>
      </div>
    </a>
  );
}
