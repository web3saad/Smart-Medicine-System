/* eslint-disable react/prop-types */

import React from 'react';

const ImagePreLoader = ({ imageUrls }) => {
  React.useEffect(() => {
    imageUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  }, [imageUrls]);

  return null;
};

export default ImagePreLoader;
