// cat eff_large_wordlist.txt | openssl dgst -sha384 -binary | openssl base64 -A
// https://theworld.com/~reinhold/diceware.html

import React from "react";
import fs from "fs";
import { parse } from "yaml";
import prettier from "prettier";
import { renderToStaticMarkup } from "react-dom/server";

import { Page } from "./page";

const { pages } = parse(fs.readFileSync("./res/localization.yml", "utf-8")),
  languages = Object.entries(pages).map(([filename, { flag }]) => ({
    filename,
    flag,
  }));

for (let pageName in pages) {
  const html =
      "<!DOCTYPE html>" +
      renderToStaticMarkup(
        <Page
          page={{ ...pages["index.html"], ...pages[pageName] }}
          languages={languages}
        />
      ),
    htmlFormatted = prettier.format(html.replace(/></g, ">\n<"), {
      parser: "html",
      printWidth: 200,
    });

  fs.writeFileSync(`../${pageName}`, htmlFormatted);
}
