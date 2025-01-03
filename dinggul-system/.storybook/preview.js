/** @type { import('@storybook/react').Preview } */
import { addons } from '@storybook/preview-api';
import { STORY_RENDERED } from '@storybook/core-events';

import { DocsContainer } from '@storybook/addon-docs';

// 복사 기능을 위한 스타일 추가
const style = document.createElement('style');
style.textContent = `
    .sb-html-preview>div{
    display: flex;
    flex-direction: column;
    }
    .sb-html-preview h3{
    flex : 0 0 auto
    }
    .sb-html-preview .code-viewer{
    flex : 1 1 auto
    }
    .btn-copy {
      position: absolute;
      top: 0px;
      right: 0px;
      border-width: 0px 0px 1px 1px;
      border-style: none none solid solid;
      border-right-color: initial;
      border-top-color: initial;
      border-image: initial;
      padding: 4px 10px;
      cursor: pointer;
      display: flex;
      align-items: center;
      color: rgb(46, 52, 56);
      background: rgb(255, 255, 255);
      font-size: 12px;
      line-height: 16px;
      font-weight: 700;
      border-bottom-color: rgba(38, 85, 115, 0.15);
      border-left-color: rgba(38, 85, 115, 0.15);
      border-radius:  0px 0px 0px 4px;
    }
    
    .btn-copy:focus {
      box-shadow: rgb(2, 156, 253) 0px -3px 0px 0px inset;
      outline: none 0px;
    }
    
    .btn-copy.copied {
      box-shadow: rgb(2, 156, 253) 0px -3px 0px 0px inset;
      outline: none 0px;
    }

    .code-viewer {
      background: rgb(246, 248, 250);
      border-radius: 4px;
      margin-top: 10px;
      font-family: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, monospace;
      font-size: 13px;
      line-height: 20px;
      overflow-x: auto;
      position: relative;
      counter-reset: line;
    }

    .code-viewer pre {
      margin: 0;
      white-space: pre;
      overflow-x: auto;
    }

    .code-viewer code {
      display: block;
      padding-left: 3.5em;
      min-width: max-content;
      font-family: ui-monospace, Menlo, Monaco, "Roboto Mono", "Oxygen Mono", "Ubuntu Monospace", "Source Code Pro", "Droid Sans Mono", "Courier New", monospace;
    }

    .code-viewer code > div {
      position: relative;
      height: 20px;
    }

    .code-viewer code > div::before {
      counter-increment: line;
      content: counter(line);
      position: absolute;
      left: -3em;
      width: 2em;
      text-align: right;
      color: #6e7781;
      padding-right: 1em;
      user-select: none;
    }

    .code-viewer .tag {
      color: #116329;
    }

    .code-viewer .attr-name {
      color: #953800;
    }

    .code-viewer .attr-value {
      color: #0550ae;
    }
`;

// HTML 복사 함수
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(
    () => {
      const copyButton = document.querySelector('.btn-copy');
      if (copyButton) {
        copyButton.textContent = 'Copied!';
        copyButton.classList.add('copied');

        setTimeout(() => {
          copyButton.textContent = 'Copy HTML';
          copyButton.classList.remove('copied');
        }, 2000);
      }
    },
    err => {
      console.error('Failed to copy text: ', err);
    }
  );
}

function removeExistingWrappers() {
  const wrappers = document.querySelectorAll('.sb-html-preview');
  wrappers.forEach(wrapper => wrapper.remove());
}

export const decorators = [
  (Story, context) => {
    // docs 페이지에서만 제외
    if (context.viewMode === 'docs') {
      removeExistingWrappers();
      return Story();
    }

    // 기존 wrapper 제거
    removeExistingWrappers();

    // 새로운 wrapper 생성
    const wrapper = document.createElement('div');
    wrapper.className = 'sb-html-preview';
    document.body.appendChild(wrapper);

    // 스타일 추가
    if (!document.head.contains(style)) {
      document.head.appendChild(style);
    }

    const channel = addons.getChannel();

    const updateHTML = () => {
      const root = document.querySelector('#storybook-root');
      if (!root) return;

      const storyHtml = root.innerHTML;

      // HTML 구문 강조를 위한 포맷팅 함수
      const formatHtml = html => {
        try {
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');
          const element = doc.body.firstElementChild;

          if (!element) return '';

          function indentElement(el, level = 0) {
            if (!el) return [];

            const indent = '  '.repeat(level);
            const result = [];

            if (el.nodeType === Node.TEXT_NODE) {
              const text = el.textContent.trim();
              if (text) {
                result.push(`<div>${indent}${text}</div>`);
              }
              return result;
            }

            if (el.nodeType === Node.ELEMENT_NODE) {
              const tagName = el.tagName.toLowerCase();

              // 시작 태그와 속성들을 별도의 줄에 표시
              result.push(`<div>${indent}&lt;<span class="tag">${tagName}</span>&gt;</div>`);

              // 각 속성을 새로운 줄에 표시
              Array.from(el.attributes || []).forEach(attr => {
                result.push(
                  `<div>${indent}  <span class="attr-name">${attr.name}</span>=<span class="attr-value">"${attr.value}"</span></div>`
                );
              });

              // 자식 요소들 처리
              Array.from(el.childNodes).forEach(child => {
                result.push(...indentElement(child, level + 1));
              });

              if (
                !el.hasChildNodes() ||
                (el.childNodes.length === 1 &&
                  el.firstChild.nodeType === Node.TEXT_NODE &&
                  !el.firstChild.textContent.trim())
              ) {
                return result;
              }

              // 종료 태그
              result.push(`<div>${indent}&lt;/<span class="tag">${tagName}</span>&gt;</div>`);
            }

            return result;
          }

          return indentElement(element).join('');
        } catch (error) {
          console.error('Error formatting HTML:', error);
          return '';
        }
      };

      const formattedHtml = formatHtml(storyHtml);
      if (!formattedHtml) return;

      wrapper.innerHTML = `
        <div>
          <h3>HTML Output</h3>
          <button class="btn-copy">Copy HTML</button>
          <div class="code-viewer">
            <pre><code>${formattedHtml}</code></pre>
          </div>
        </div>
      `;

      const copyButton = wrapper.querySelector('.btn-copy');
      if (copyButton) {
        copyButton.addEventListener('click', () => copyToClipboard(storyHtml));
      }
    };

    channel.on(STORY_RENDERED, updateHTML);

    return Story();
  },
];

const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      sort: 'alpha',
    },
    layout: 'fullscreen',
    previewTabs: {
      canvas: { hidden: false },
      'storybook/docs/panel': { hidden: true },
    },
    docs: {
      container: DocsContainer,
      // theme: {
      //   brandTitle: 'My Custom Docs',
      //   brandUrl: 'https://example.com',
      //   brandImage: '/my-logo.png',
      // }
    },
  },
};

export default preview;
