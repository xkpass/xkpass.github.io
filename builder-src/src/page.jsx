import React from "react";

import { Script } from "./script";
import { LanguageSelector } from "./language-selector";
import { XkcdItem } from "./xkcd-item";

export function Page({ page, languages }) {
  return (
    <html lang={page.lang}>
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=1.0, minimum-scale=1.0, maximum-scale=1.0"
        />
        <title>{page.title}</title>
        <link rel="stylesheet" type="text/css" href="./res/style.css" />
      </head>
      <body>
        <Script {...page} />
        <div className="languages">{languages.map(LanguageSelector)}</div>
        <div className="description">
          {page.description.map((__html, i) => (
            <div
              className="description-text"
              key={i}
              dangerouslySetInnerHTML={{ __html }}
            />
          ))}
        </div>
        <img src="./res/wow.jpeg" className="wow" />
        <div className="password-container">
          <div className="password">{page.generating}</div>
        </div>
        <div className="xkcd-line">
          <XkcdItem {...page} imageName="xkcd1.png" />
          <XkcdItem {...page} imageName="xkcd2.png" />
          <XkcdItem {...page} imageName="xkcd3.png" />
        </div>
        <div className="xkcd-line">
          <XkcdItem {...page} imageName="xkcd4.png" />
          <XkcdItem {...page} imageName="xkcd5.png" />
          <XkcdItem {...page} imageName="xkcd6.png" />
        </div>
        <div className="xkcd-line">
          <XkcdItem {...page} imageName="xkcd7.png" />
        </div>
      </body>
    </html>
  );
}
