import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./../index.css";
import CameraListItem from "./CameraListItem";

export const api = "http://192.168.2.128:3000";
export default function Cameras() {
  const [cameras, setCameras] = useState([]);

  useEffect(() => {
    async function fetchCameras() {
      const raw = await fetch(api + "/cameras", { mode: "cors" });
      const tmpCameras = await raw.json();
      if (!cameras || cameras.length === 0) {
        setCameras(tmpCameras);
      } else {
        console.log(".");
      }
    }
    fetchCameras();
    setInterval(fetchCameras, 10000);
    return () => {};
  }, []);

  if (!cameras || cameras.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="centered">
      <div className="cards">
        {cameras.map((camera) => {
          return (
            <CameraListItem
              key={camera.name}
              name={camera.name}
              url={camera.url}
            />
          );
        })}
      </div>
    </div>
  );
}
