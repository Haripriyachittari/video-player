import VideoProps from "@/types/types";
import mediaJSON from "@/utils/constant";
import React, { createContext, useState } from "react";

interface AllContextProviderProps {
  children: React.ReactNode;
}

export const AllContext = createContext<any | null>(null);

const AllContextProvider: React.FC<AllContextProviderProps> = ({
  children,
}) => {
  const [allVideos, setAllVideos] = useState<VideoProps[]>(
    mediaJSON.categories[0].videos,
  );
  const contextValue = {
    allVideos,
    setAllVideos,
  };
  return (
    <AllContext.Provider value={contextValue}>{children}</AllContext.Provider>
  );
};

export default AllContextProvider;
