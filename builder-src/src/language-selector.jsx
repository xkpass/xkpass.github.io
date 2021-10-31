import React from "react";

export function LanguageSelector({ filename, flag }) {
  return (
    <a href={"./" + filename} className="language-selector" key={flag}>
      {flag}
    </a>
  );
}
