import React from 'react';
import { Button } from './Button';

export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      source: {
        type: 'code',
        language: 'html',
        code: `
// HTML
<button class="btn btn-md btn-default">
  Default
</button>

// Vue.js
<Button :variant="'default'" :size="'md'" :label="'Default'" />

// React
<Button variant="default" size="md" label="Default" />
        `,
      },
      description: {
        component: `
# 버튼 컴포넌트 가이드

버튼은 \`a\`, \`button\` 태그를 사용합니다 (\`input\`은 지양).  
웹접근성 향상을 위해 **새 창으로 여는 링크**에는 \`target="_blank"\`와 \`title="새창"\` 속성이 **필수**입니다.

기본으로 \`.btn\` 클래스를 사용하며, 크기와 스타일에 따라 \`.btn-*\` 클래스가 추가됩니다.

## 버튼 크기 클래스

| 클래스      | 설명                             | 예시                         |
|-------------|----------------------------------|------------------------------|
| \`.btn-xs\`   | 텍스트 중간, 끝                  | \`.btn.btn-xs.btn-default\`    |
| \`.btn-sm\`   | 콘텐츠 내 문단 위/아래           | \`.btn.btn-sm.btn-primary\`    |
| \`.btn-md\`   | 테이블, 폼 필드 내부             | \`.btn.btn-md.btn-outline-*\`  |
| \`.btn-lg\`   | 페이지 주요 액션 (게시판 하단 등) | \`.btn.btn-lg.btn-default\`    |
| \`.btn-full\` | 버튼의 너비를 100%로 설정        | \`.btn.btn-full.btn-primary\`  |

## 버튼 스타일 클래스

| 스타일 명칭          | 설명                       | 클래스명                   | 비고         |
|----------------------|----------------------------|-----------------------------|--------------|
| 기본 버튼 (Elevated) | 일반 강조용 버튼           | \`.btn-default\`              | 음영 있음     |
| 강조 버튼 (Filled)   | 주요 행동 강조용           | \`.btn-primary\`              | 배경 진함     |
| 톤 강조 버튼         | 보조 강조용                | \`.btn-tonal\`, \`.btn-secondary\` | 색상 약함 |
| 외곽선 버튼          | 강조 버튼 보조, 테두리만 표시 | \`.btn-outline-*\`            | 배경 없음     |
| 텍스트 버튼          | 가장 우선순위 낮은 버튼     | \`.btn-text\`                 | 배경, 테두리 없음 |

## 버튼 유형별 구성 가이드

| 유형 | 설명 | 사용 예 | 구성 요소 | 비고 |
|------|------|---------|------------|------|
| 일반 버튼 | 대부분의 기본 버튼 유형 | \`.btn.btn-primary\`, \`.btn-default\` | 컨테이너, (아이콘), 텍스트 | \`btn-xs ~ btn-lg\` 사이즈 모두 사용 가능 |
| 세그먼트 버튼 | 보기 전환, 다중 선택 | \`.btn-segment\` | 세그먼트, 아이콘, 컨테이너, 텍스트, 구분선 | \`aria-pressed\` 등 상태값 활용 |
| 아이콘 버튼 | 아이콘만 사용하거나 강조할 때 | \`.btn-icon\` | 아이콘, (컨테이너) | 텍스트 없음, 접근성 위해 \`aria-label\` 사용 권장 |
| FAB (Floating Action Button) | 화면 우측 하단 주요 액션 | \`.btn-fab\` | 컨테이너, 아이콘 | 둥근 형태, 고정 위치 |
| 확장형 FAB | FAB에 텍스트를 추가할 경우 | \`.btn-fab-extended\` | 컨테이너, 아이콘, 텍스트 | FAB보다 명확한 액션 설명 필요 시 사용 |

## 접근성 관련 체크리스트

- 새창 링크: \`target="_blank"\` + \`title="새창"\` 포함
- 아이콘-only 버튼: \`aria-label\`로 대체 텍스트 제공
- 버튼 내 상태 전환 시: \`aria-pressed\`, \`aria-expanded\`, \`aria-disabled\` 등 활용
- 버튼은 \`button\`, \`a\` 태그 권장 (\`input[type=button]\`은 지양)

## 코드 예시

각 프레임워크별 코드 예시를 확인할 수 있습니다. 코드 블록을 클릭하여 복사할 수 있습니다.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        null,
        'default',
        'primary',
        'tonal',
        'secondary',
        'outline-default',
        'outline-primary',
        'outline-tonal',
        'outline-secondary',
        'text'
      ],
    },
    size: {
      control: 'radio',
      options: ['xs', 'sm', 'md', 'lg'],
    },
    label: {
      control: 'text',
    },
    icon: {
      control: 'text',
    },
    isIconOnly: {
      control: 'boolean',
    },
    isFab: {
      control: 'boolean',
    },
    isFabExtended: {
      control: 'boolean',
    },
    isNewWindow: {
      control: 'boolean',
    },
    href: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
    readonly: {
      control: 'boolean',
    },
    isSegment: {
      control: 'boolean',
    },
    isSegmentActive: {
      control: 'boolean',
    },
    isFull: {
      control: 'boolean',
    },
  },
};

const Template = (args) => {
  const getButtonHTML = () => {
    const classes = [
      'btn',
      `btn-${args.size}`,
      args.variant ? 
        (args.variant.startsWith('outline-') ? 
          `btn-outline-${args.variant.split('-')[1]}` : 
          `btn-${args.variant}`) : 
        '',
      args.isIconOnly && 'btn-icon',
      args.isFab && 'btn-fab',
      args.isFabExtended && 'btn-fab-extended',
      args.isSegment && 'btn-segment',
      args.isSegmentActive && 'is-active',
      args.isFull && 'btn-full',
    ].filter(Boolean).join(' ');

    const tag = args.href ? 'a' : 'button';
    const newWindowProps = args.isNewWindow ? 
      ' target="_blank" title="새창으로 열림"' : '';
    const disabledAttr = args.disabled ? ' disabled' : '';
    const readonlyAttr = args.readonly ? ' readonly' : '';
    const hrefAttr = args.href ? ` href="${args.href}"` : '';
    const segmentProps = args.isSegment ? 
      ` aria-pressed="${args.isSegmentActive}" role="button"` : '';

    const content = args.isIconOnly ? 
      `<i class="ico ico-${args.icon}"></i>` : 
      args.icon ? 
        `<i class="ico ico-${args.icon}"></i> ${args.label}` : 
        args.label;

    return `<${tag} class="${classes}"${hrefAttr}${disabledAttr}${readonlyAttr}${newWindowProps}${segmentProps}>
  ${content}
</${tag}>`;
  };

  const getVueTemplate = () => {
    const props = [];
    if (args.variant) props.push(`:variant="'${args.variant}'"`);
    if (args.size) props.push(`:size="'${args.size}'"`);
    if (args.label) props.push(`:label="'${args.label}'"`);
    if (args.icon) props.push(`:icon="'${args.icon}'"`);
    if (args.isIconOnly) props.push(`:is-icon-only="true"`);
    if (args.isFab) props.push(`:is-fab="true"`);
    if (args.isFabExtended) props.push(`:is-fab-extended="true"`);
    if (args.isNewWindow) props.push(`:is-new-window="true"`);
    if (args.href) props.push(`:href="'${args.href}'"`);
    if (args.disabled) props.push(`:disabled="true"`);
    if (args.readonly) props.push(`:readonly="true"`);
    if (args.isSegment) props.push(`:is-segment="true"`);
    if (args.isSegmentActive) props.push(`:is-segment-active="true"`);
    if (args.isFull) props.push(`:is-full="true"`);

    return `<Button ${props.join(' ')} />`;
  };

  const getReactCode = () => {
    const props = [];
    if (args.variant) props.push(`variant="${args.variant}"`);
    if (args.size) props.push(`size="${args.size}"`);
    if (args.label) props.push(`label="${args.label}"`);
    if (args.icon) props.push(`icon="${args.icon}"`);
    if (args.isIconOnly) props.push(`isIconOnly={${args.isIconOnly}}`);
    if (args.isFab) props.push(`isFab={${args.isFab}}`);
    if (args.isFabExtended) props.push(`isFabExtended={${args.isFabExtended}}`);
    if (args.isNewWindow) props.push(`isNewWindow={${args.isNewWindow}}`);
    if (args.href) props.push(`href="${args.href}"`);
    if (args.disabled) props.push(`disabled={${args.disabled}}`);
    if (args.readonly) props.push(`readonly={${args.readonly}}`);
    if (args.isSegment) props.push(`isSegment={${args.isSegment}}`);
    if (args.isSegmentActive) props.push(`isSegmentActive={${args.isSegmentActive}}`);
    if (args.isFull) props.push(`isFull={${args.isFull}}`);

    return `<Button ${props.join(' ')} />`;
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <Button {...args} />
      </div>
      <div style={{ 
        backgroundColor: '#f5f5f5', 
        padding: '15px', 
        borderRadius: '4px',
        fontFamily: 'monospace',
        whiteSpace: 'pre-wrap',
      }}>
        <div style={{ marginBottom: '15px' }}>
          <h4 style={{ margin: '0 0 10px 0' }}>HTML</h4>
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => copyToClipboard(getButtonHTML())}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                padding: '5px 10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                cursor: 'pointer',
                backgroundColor: 'white'
              }}
            >
              Copy HTML
            </button>
            <pre style={{ margin: 0, padding: '10px', backgroundColor: '#fff', borderRadius: '4px' }}>
              {getButtonHTML()}
            </pre>
          </div>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <h4 style={{ margin: '0 0 10px 0' }}>Vue.js</h4>
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => copyToClipboard(getVueTemplate())}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                padding: '5px 10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                cursor: 'pointer',
                backgroundColor: 'white'
              }}
            >
              Copy Vue
            </button>
            <pre style={{ margin: 0, padding: '10px', backgroundColor: '#fff', borderRadius: '4px' }}>
              {getVueTemplate()}
            </pre>
          </div>
        </div>

        <div>
          <h4 style={{ margin: '0 0 10px 0' }}>React</h4>
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => copyToClipboard(getReactCode())}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                padding: '5px 10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                cursor: 'pointer',
                backgroundColor: 'white'
              }}
            >
              Copy React
            </button>
            <pre style={{ margin: 0, padding: '10px', backgroundColor: '#fff', borderRadius: '4px' }}>
              {getReactCode()}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export const DefaultButton = Template.bind({});
DefaultButton.args = {
  variant: 'default',
  size: 'md',
  label: 'Default',
};

export const PrimaryButton = Template.bind({});
PrimaryButton.args = {
  variant: 'primary',
  size: 'md',
  label: 'Primary',
};

export const TonalButton = Template.bind({});
TonalButton.args = {
  variant: 'tonal',
  size: 'md',
  label: 'Tonal',
};

export const OutlineDefaultButton = Template.bind({});
OutlineDefaultButton.args = {
  variant: 'outline-default',
  size: 'md',
  label: 'Outline Default',
};

export const OutlinePrimaryButton = Template.bind({});
OutlinePrimaryButton.args = {
  variant: 'outline-primary',
  size: 'md',
  label: 'Outline Primary',
};

export const OutlineTonalButton = Template.bind({});
OutlineTonalButton.args = {
  variant: 'outline-tonal',
  size: 'md',
  label: 'Outline Tonal',
};

export const OutlineSecondaryButton = Template.bind({});
OutlineSecondaryButton.args = {
  variant: 'outline-secondary',
  size: 'md',
  label: 'Outline Secondary',
};

export const TextButton = Template.bind({});
TextButton.args = {
  variant: 'text',
  size: 'md',
  label: 'Text',
};

export const IconButton = Template.bind({});
IconButton.args = {
  variant: 'primary',
  size: 'md',
  icon: 'add',
  isIconOnly: true,
  label: 'Add',
};

export const FabButton = Template.bind({});
FabButton.args = {
  variant: 'primary',
  size: 'md',
  icon: 'add',
  isFab: true,
};

export const ExtendedFabButton = Template.bind({});
ExtendedFabButton.args = {
  variant: 'primary',
  size: 'md',
  icon: 'add',
  label: 'New Task',
  isFabExtended: true,
};

export const SegmentButton = Template.bind({});
SegmentButton.args = {
  isSegment: true,
  isSegmentActive: true,
  label: 'Segment',
};

export const LinkButton = Template.bind({});
LinkButton.args = {
  variant: 'primary',
  size: 'md',
  label: 'Link',
  href: 'https://example.com',
  isNewWindow: true,
};

export const FullWidthButton = Template.bind({});
FullWidthButton.args = {
  variant: 'primary',
  size: 'md',
  label: 'Full Width Button',
  isFull: true,
}; 