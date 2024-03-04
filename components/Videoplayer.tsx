import React, { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Switcher1 from "./ToggleSwitch";
import VideoProps from "@/types/types";
import { AllContext } from "@/context/Context";

interface VideoplayerProps {
  currentlyPlayingVideo: VideoProps | null;
  autoPlayOn: boolean;
  setAutoPlayOn: React.Dispatch<React.SetStateAction<boolean>>;
  setStoredPlaybackPosition: React.Dispatch<
    React.SetStateAction<number | null>
  >;
  storedPlaybackPosition: number | null;
  setCurrentlyPlayingVideo: React.Dispatch<
    React.SetStateAction<VideoProps | null>
  >;
}
const Videoplayer: React.FC<VideoplayerProps> = ({
  currentlyPlayingVideo,
  autoPlayOn,
  setAutoPlayOn,
  storedPlaybackPosition,
  setStoredPlaybackPosition,
  setCurrentlyPlayingVideo,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { allVideos, setAllVideos } = useContext(AllContext);

  useEffect(() => {
    const storedPosition = localStorage.getItem("videoPlaybackPosition");
    if (storedPosition) {
      setStoredPlaybackPosition(parseFloat(storedPosition));
    }
  }, []);

  const handleMetadataLoaded = () => {
    if (videoRef.current && storedPlaybackPosition !== null) {
      videoRef.current.currentTime = storedPlaybackPosition;
    }
  };

  const handleTimeUpdate = () => {
    const currentTime = videoRef.current?.currentTime;
    if (currentTime) {
      localStorage.setItem("videoPlaybackPosition", currentTime.toString());
    }
  };

  const handleVideoEnd = () => {
    if (!autoPlayOn) return;
    // console.log(allVideos.length);
    const currentVideoId = allVideos.findIndex(
      (video: VideoProps) => video.title === currentlyPlayingVideo!.title,
    );
    // console.log(currentVideoId);
    if (currentVideoId === allVideos.length - 1) {
      //check if the current video in the playlist is the last one playing, looping the playlist to play the first one next
      setCurrentlyPlayingVideo(allVideos[0]);
      setStoredPlaybackPosition(null);
      return;
    }
    setCurrentlyPlayingVideo(allVideos[currentVideoId + 1]);
    setStoredPlaybackPosition(null);
  };

  return (
    <div className="m-6  flex flex-col md:ml-8 md:mr-2  md:mt-8 ">
      <video
        id="video-player"
        controls
        autoPlay
        className="rounded-xl "
        ref={videoRef}
        preload="auto"
        width="100%"
        height="auto"
        key={currentlyPlayingVideo?.sources[0]}
        onTimeUpdate={handleTimeUpdate}
        onLoadedDataCapture={handleMetadataLoaded}
        onEnded={handleVideoEnd}
      >
        <source src={currentlyPlayingVideo?.sources[0]} type="video/mp4" />
      </video>
      <div className="flex items-center justify-between">
        <h1 className="my-4 px-3 text-3xl font-semibold ">
          {currentlyPlayingVideo?.title}
        </h1>
        <div className="flex items-center gap-2">
          <p>Autoplay</p>
          <Switcher1 autoPlayOn={autoPlayOn} setAutoPlayOn={setAutoPlayOn} />
        </div>
      </div>

      <div className="my-1 rounded-xl border bg-[#bbdefb] p-3 ">
        <p className=" text-sm">{currentlyPlayingVideo?.description}</p>
      </div>
    </div>
  );
};

export default Videoplayer;
