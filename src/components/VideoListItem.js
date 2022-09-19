import React from "react";
import "./../index.css";

export default function VideoListItem({ camName, videoName, smallName }) {
  return (
    <>
      <li className="day">
        <a className="link" href={"/stream/" + camName + "/" + videoName}>
          {smallName}
        </a>
      </li>
    </>
  );
}
