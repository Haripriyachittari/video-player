import { AllContext } from "@/context/Context";
import VideoProps from "@/types/types";
import Image from "next/image";
import React, { DragEventHandler, useContext, useState } from "react";

interface PlaylistProps {
  handleChangeVideo: (video: VideoProps) => void;
  currentlyPlayingVideo: VideoProps | null;
}

const Playlist: React.FC<PlaylistProps> = ({
  handleChangeVideo,
  currentlyPlayingVideo,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { allVideos, setAllVideos } = useContext(AllContext);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

  function getReorderedList(
    videos: VideoProps[],
    startIndex: number,
    endIndex: number,
  ) {
    const result = Array.from(videos);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  }

  const handleDragStart = (e: any, index: number) => {
    setDraggingIndex(index);
  };

  const handleDragOver = (e: any, index: any) => {
    e.preventDefault();
    if (draggingIndex === null || draggingIndex === index) return;
    const newList = getReorderedList(allVideos, draggingIndex, index);
    setAllVideos(newList);
    setDraggingIndex(index);
  };
  return (
    <div className="mx-4 mb-10  h-[610px] overflow-auto rounded-lg border-2  border-[#bfd7ff] p-4 md:mb-6 md:mr-8  md:mt-8">
      <p className="text-2xl font-semibold">Playlist</p>
      <div className="my-4">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-lg border border-gray-200 p-1.5 focus:outline-[#6499E9] "
          placeholder="Search your playlist"
        />
      </div>
      <div>
        {allVideos
          .filter((video: VideoProps) => {
            if (searchTerm === "") return video.title.indexOf(searchTerm) === 0;
            else {
              return video.title
                .toLowerCase()
                .includes(searchTerm?.toLowerCase());
            }
          })
          .map((video: VideoProps, index: number) => (
            <div
              draggable
              key={index}
              className={`my-2 flex cursor-pointer gap-2 rounded-md  p-2 hover:bg-[#bbdefb] ${video.title === currentlyPlayingVideo?.title ? "bg-[#bfd7ff]" : "bg-slate-200"}`}
              onClick={() => handleChangeVideo(video)}
              onDragStart={(event) => handleDragStart(event, index)}
              onDragOver={(event) => handleDragOver(event, index)}
            >
              <Image
                src={video.thumb}
                alt="poster"
                width={100}
                height={100}
                className="rounded-md"
              />
              <p>{video.title}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Playlist;
