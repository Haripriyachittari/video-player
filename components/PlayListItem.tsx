import VideoProps from "@/types/types";
import React, { useRef } from "react";
import Image from "next/image";

interface PlayListItemProps {
  video: VideoProps;
  currentlyPlayingVideo: VideoProps | null;
  index: number;
  handleChangeVideo: Function;
  handleDragStart: Function;
  handleDragOver: Function;
}

const PlayListItem: React.FC<PlayListItemProps> = ({
  video,
  handleDragOver,
  handleDragStart,
  handleChangeVideo,
  index,
  currentlyPlayingVideo,
}) => {
  const playListItemRef = useRef<HTMLVideoElement>(null);
  return (
    <div
      draggable
      key={index}
      className={`my-2 flex cursor-pointer gap-2 rounded-md  p-2 hover:bg-[#bbdefb] ${video.title === currentlyPlayingVideo?.title ? "bg-[#bfd7ff]" : "bg-slate-200"}`}
      onClick={() => handleChangeVideo(video)}
      onDragStart={(event) => handleDragStart(event, index)}
      onDragOver={(event) => handleDragOver(event, index)}
    >
      <video
        poster={video?.thumb}
        id="video-player"
        // controls
        muted
        className="cursor-pointer rounded-xl "
        ref={playListItemRef}
        preload="auto"
        width="150px"
        height="100px"
        onMouseEnter={() => {
          playListItemRef.current?.play();
          console.log("Hi");
        }}
        onMouseLeave={() => {
          playListItemRef.current?.pause();
          console.log("bye");
        }}
      >
        <source src={video?.sources[0]} type="video/mp4" />
      </video>
      {/* <Image
        src={video.thumb}
        alt="poster"
        width={100}
        height={100}
        className="rounded-md"
      /> */}
      <div>
        <p className="font-medium">{video.title}</p>
        <p className="text-sm">{video.subtitle}</p>
      </div>
    </div>
  );
};

export default PlayListItem;
