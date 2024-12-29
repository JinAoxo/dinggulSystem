/** @type { import('@storybook/react').Preview } */
import { addons } from '@storybook/preview-api';
import { STORY_RENDERED } from '@storybook/core-events';

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
      top: 10px;
      right: 10px;
      padding: 8px 12px;
      background: #1ea7fd;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
    }
    
    .btn-copy:hover {
      background: #0088e2;
    }
    
    .btn-copy.copied {
      background: #66bf3c;
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
              const attributes = Array.from(el.attributes || []).map(attr => {
                return `<span class="attr-name">${attr.name}</span>=<span class="attr-value">"${attr.value}"</span>`;
              });

              result.push(
                `<div>${indent}&lt;<span class="tag">${tagName}</span>${
                  attributes.length ? ' ' + attributes.join(' ') : ''
                }&gt;</div>`
              );

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
  },
};

export default preview;
