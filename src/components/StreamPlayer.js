import React from "react";
import { api } from "./Cameras";
import { useParams } from "react-router-dom";

export default function StreamPlayer() {
  const { name } = useParams();
  const { video } = useParams();
  const streamUrl = api + "/stream?name=" + name + "&video=" + video;
  console.log(streamUrl);

  return (
    <video width="100%" controls muted="muted" autoPlay>
      <source src={streamUrl} type="video/mp4" />
    </video>
  );
}
