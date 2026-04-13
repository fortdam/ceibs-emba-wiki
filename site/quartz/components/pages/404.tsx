import { i18n } from "../../i18n"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"

const NotFound: QuartzComponent = ({ cfg }: QuartzComponentProps) => {
  const url = new URL(`https://${cfg.baseUrl ?? "example.com"}`)
  const baseDir = url.pathname

  return (
    <article class="popover-hint">
      <h1>404</h1>
      <p>{i18n(cfg.locale).pages.error.notFound}</p>
      <div id="search-fallback"></div>
      <a href={baseDir}>{i18n(cfg.locale).pages.error.home}</a>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            #search-fallback {
              margin: 1.5rem 0;
            }
            #search-fallback .search-term {
              font-size: 1.1rem;
              margin-bottom: 1rem;
              color: var(--darkgray);
            }
            #search-fallback .search-term strong {
              color: var(--dark);
            }
            #search-fallback .search-links {
              display: flex;
              flex-wrap: wrap;
              gap: 0.6rem;
            }
            #search-fallback .search-links a {
              display: inline-block;
              padding: 0.5rem 1rem;
              border: 1px solid var(--lightgray);
              border-radius: 6px;
              color: var(--secondary);
              text-decoration: none;
              font-size: 0.9rem;
              transition: background 0.2s ease, color 0.2s ease;
            }
            #search-fallback .search-links a:hover {
              background: var(--highlight);
              color: var(--tertiary);
              border-color: var(--tertiary);
            }
          `,
        }}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              var base = "${baseDir}";
              function update() {
                var path = decodeURIComponent(window.location.pathname);
                if (path.startsWith(base)) path = path.slice(base.length);
                path = path.replace(/^\\/+|\\/+$/g, '').replace(/\\/index$/, '');
                if (!path) return;
                var term = path.split('/').pop().replace(/-/g, ' ');
                var c = document.getElementById('search-fallback');
                if (!c) return;
                var e = encodeURIComponent(term);
                c.innerHTML =
                  '<p class="search-term">\\u4f60\\u5728\\u5bfb\\u627e: <strong>' + term + '</strong></p>' +
                  '<div class="search-links">' +
                  '<a href="https://www.google.com/search?q=' + e + '" target="_blank" rel="noopener">Google</a>' +
                  '<a href="https://zh.wikipedia.org/wiki/' + e + '" target="_blank" rel="noopener">Wikipedia (\\u4e2d\\u6587)</a>' +
                  '<a href="https://baike.baidu.com/item/' + e + '" target="_blank" rel="noopener">\\u767e\\u5ea6\\u767e\\u79d1</a>' +
                  '</div>';
              }
              update();
              document.addEventListener('nav', update);
            })();
          `,
        }}
      />
    </article>
  )
}

export default (() => NotFound) satisfies QuartzComponentConstructor
