import React from "react";
import { AdForNews } from "../types/types";
import "./AdStyles.css";

interface AdDisplayProps {
  ad: AdForNews;
}

const AdDisplay: React.FC<AdDisplayProps> = ({ ad }) => {
  const isVideo = (url: string): boolean => {
    const videoExtensions = ["mp4", "webm", "ogg"];
    const extension = url.split(".").pop()?.toLowerCase();
    return extension ? videoExtensions.includes(extension) : false;
  };

  return (
    <div className="ad-display">
      <h4>Sponsored Ad</h4>
      <a href={ad.forwardUrl} target="_blank" rel="noopener noreferrer">
        {isVideo(ad.mediaUrl) ? (
          <video
            src={ad.mediaUrl}
            className="ad-display-media"
            controls
            preload="metadata"
          >
            Your browser does not support the video tag.
          </video>
        ) : (
          <img src={ad.mediaUrl} alt="Ad" className="ad-display-media" />
        )}
      </a>
    </div>
  );
};

export default AdDisplay;
