import React from "react";

export function XkcdItem({ xkcdImgPath, xkcdHref, imageName }) {
  return (
    <a href={xkcdHref} target="_blank" rel="noopener" className="xkcd-item">
      <img src={xkcdImgPath + imageName} className="xkcd-image" />
    </a>
  );
}
