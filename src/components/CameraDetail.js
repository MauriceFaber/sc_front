import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./../index.css";
import { api } from "./Cameras";
import VideoListItem from "./VideoListItem";

export default function CameraDetail() {
  const { name } = useParams();
  const tmp = api + "/current?name=" + name;
  const [newUrl, setUrl] = useState(tmp);

  const [videos, setVideos] = useState([]);
  const [size, setSize] = useState();
  const [groupedVideos, setGroupedVideos] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const append = "&t=" + new Date().getTime();
      setUrl(tmp + append);
    }, 10000);

    async function fetchVideos() {
      console.log(name);
      const raw = await fetch(api + "/videos?name=" + name, { mode: "cors" });
      const tmpVideos = await raw.json();
      setVideos(tmpVideos);
    }
    fetchVideos();

    async function fetchSize() {
      const url = api + "/dirSize?name=" + name;
      console.log(url);
      const resp = await fetch(url, { mode: "cors" });
      const raw = await resp.text();
      console.log(raw);
      setSize("(" + raw + ")");
    }
    fetchSize();
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    var groups = [];
    videos.forEach((video) => {
      var displayName = video.replace(name, "");
      displayName = displayName.replace(".mkv", "");
      const day = displayName.substr(0, displayName.indexOf("-"));
      const hour = displayName.substr(displayName.indexOf("-") + 1);

      var group = groups.find((g) => g.day === day);
      if (!group) {
        group = { day, items: [] };
        groups.push(group);
      }
      group.items.push({ video, hour });

      setGroupedVideos(groups);
    });
  }, [videos]);

  return (
    <>
      <div className="card">
        <div className="card-border">
          <p>
            {name} {size}
          </p>
          <img className="rounded8" src={newUrl} alt={name} />
        </div>
      </div>
      {groupedVideos.map((group, i) => {
        return (
          <>
            <h4>{group.day}</h4>
            <ul className="dayCol">
              {group.items.map((video, i) => {
                return (
                  <VideoListItem
                    smallName={video.hour}
                    camName={name}
                    videoName={video.video}
                  />
                );
              })}
            </ul>
          </>
        );
      })}
    </>
  );
}
