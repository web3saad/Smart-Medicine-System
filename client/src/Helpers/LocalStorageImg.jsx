/* eslint-disable react/prop-types */

import React from "react";

const LocalStorageImg = ({ imageUrls }) => {
  React.useEffect(() => {
    const preloadedImages =
      JSON.parse(localStorage.getItem("preloadedImages")) || {};

    const loadImage = (url) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(url);
        img.onerror = () => reject(url);
        img.src = url;
      });
    };

    const preloadImages = async () => {
      const imagesToPreload = imageUrls.filter((url) => !preloadedImages[url]);

      try {
        await Promise.all(imagesToPreload.map((url) => loadImage(url)));

        const updatedPreloadedImages = {
          ...preloadedImages,
          ...imagesToPreload.reduce((acc, url) => {
            acc[url] = true;
            return acc;
          }, {}),
        };

        localStorage.setItem(
          "preloadedImages",
          JSON.stringify(updatedPreloadedImages)
        );
      } catch (error) {
        console.error("Error preloading images:", error);
      }
    };

    preloadImages();
  }, [imageUrls]);

  return null;
};

export default LocalStorageImg;
