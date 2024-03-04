import React, {
  MouseEventHandler,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import Videoplayer from "./Videoplayer";
import Playlist from "./Playlist";
import mediaJSON from "@/utils/constant";
import VideoProps from "@/types/types";
import { AllContext } from "@/context/Context";

const Homescreen = () => {
  const { allVideos, setAllVideos } = useContext(AllContext);

  const [currentlyPlayingVideo, setCurrentlyPlayingVideo] =
    useState<VideoProps | null>(null);
  const [autoPlayOn, setAutoPlayOn] = useState<boolean>(false);
  const [storedPlaybackPosition, setStoredPlaybackPosition] = useState<
    number | null
  >(null);

  const handleChangeVideo = (video: VideoProps) => {
    localStorage.setItem("currentVideo", JSON.stringify(video));
    setCurrentlyPlayingVideo(video);
    setStoredPlaybackPosition(null);
  };

  useEffect(() => {
    if (typeof window !== undefined) {
      const storedVideo = JSON.parse(localStorage.getItem("currentVideo")!);
      // console.log(storedVideo, "store");
      if (storedVideo) {
        setCurrentlyPlayingVideo(storedVideo);
      } else {
        setCurrentlyPlayingVideo(allVideos[0]);
      }
    }
  }, [allVideos]);
  return (
    <div className=" flex h-full w-full  flex-col gap-2 border md:flex-row  ">
      <div className="w-[100%] md:w-[70%] ">
        <Videoplayer
          currentlyPlayingVideo={currentlyPlayingVideo}
          setCurrentlyPlayingVideo={setCurrentlyPlayingVideo}
          autoPlayOn={autoPlayOn}
          setAutoPlayOn={setAutoPlayOn}
          storedPlaybackPosition={storedPlaybackPosition}
          setStoredPlaybackPosition={setStoredPlaybackPosition}
        />
      </div>
      <div className="w-[100%] md:w-[30%] ">
        <Playlist
          handleChangeVideo={handleChangeVideo}
          currentlyPlayingVideo={currentlyPlayingVideo}
        />
      </div>
    </div>
  );
};

export default Homescreen;
