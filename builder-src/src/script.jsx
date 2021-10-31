import React from "react";

export function Script({ scriptSources, objectPreloadComment, scriptTexts }) {
  const makePassword = `
        async function makePassword({ wordlistUrl, integrity }) {
            ${scriptTexts.download}
            const wordlist = await fetch(wordlistUrl, { integrity }).then((res) => res.text());

            ${scriptTexts.extract}
            const words = [...wordlist.matchAll(/[0-9]{5}\t(.*)/g)].map(([, word]) => word);

            ${scriptTexts.prepare}
            const passwordWordIds = new Uint16Array(4);

            ${scriptTexts.fill}
            crypto.getRandomValues(passwordWordIds);

            ${scriptTexts.map}
            return [...passwordWordIds].map(id => words[id % 4096]).join(' ');
        }
    `;

  const promiseContent = scriptSources
    .map(
      ({ wordlistUrl, integrity, originalUrl }) =>
        scriptTexts.pass
          .replace("REPLACE_LINK", originalUrl)
          .replace("REPLACE_INTEGRITY", integrity) +
        `\nmakePassword(${JSON.stringify({ wordlistUrl, integrity })})`
    )
    .join(",\n");

  const message = scriptSources
    .map(
      ({ name }, i) =>
        `${name}'+'<div class="password-text">'+passwords[${i}]+'</div>`
    )
    .join("'+'");

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `${makePassword}\n\nwindow.addEventListener('DOMContentLoaded', () => {Promise.all([${promiseContent}])\n${scriptTexts.make}\n.then(passwords => '${message}'+'${scriptTexts.passAfter}')\n${scriptTexts.intercept}\n.catch(() => '${scriptTexts.error}')\n${scriptTexts.put}\n.then(message => document.querySelector('.password').innerHTML = message);});`,
        }}
      />
      {scriptSources.map(({ wordlistUrl }, i) => (
        <object
          data={wordlistUrl}
          key={i}
          dangerouslySetInnerHTML={{
            __html: `<!-- ${objectPreloadComment} -->`,
          }}
        />
      ))}
    </>
  );
}
