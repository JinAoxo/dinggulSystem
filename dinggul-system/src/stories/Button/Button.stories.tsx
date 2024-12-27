import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
// import { withDesign } from 'storybook-addon-designs';
// import { withA11y } from '@storybook/addon-a11y';
// import { withHTML } from '@whitespace/storybook-addon-html';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  // decorators: [withDesign, withA11y, withHTML],
  parameters: {
    layout: 'centered',
    a11y: {
      config: {
        rules: [
          { id: 'button-name', enabled: true },
          { id: 'color-contrast', enabled: true },
        ],
      },
    },
    design: {
      type: 'figma',
      url: 'your-figma-url',
    },
  },
  argTypes: {
    designType: {
      control: 'radio',
      options: ['type01', 'type02', 'type03'],
      description: 'Select button design type',
    },
    backgroundColor: { control: 'color' },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    variant: {
      control: 'select',
      options: ['contained', 'outlined', 'text'],
    },
    disabled: {
      control: 'boolean',
      description: 'Disable button',
    },
    readonly: {
      control: 'boolean',
      description: 'Make button readonly',
    },
    primary: {
      control: 'boolean',
      description: 'Primary style button',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

export const Type01: Story = {
  args: {
    designType: 'type01',
    label: 'Type 01 Button',
    primary: true,
  },
  parameters: {
    docs: {
      source: {
        language: 'tsx',
        code: '<Button designType="type01" label="Type 01 Button" primary />',
      },
      html: {
        source: '<button type="button" class="btn btn-type01 btn-primary">Type 01 Button</button>',
      },
      description: {
        story: `
         # Type 01 Button
         기본 버튼 스타일입니다.
         
         ## 접근성 고려사항
         - 적절한 색상 대비 (WCAG 2.1 Level AA)
         - 키보드 포커스 가시성
         - aria-label 제공
         
         ## 사용 예시
         \`\`\`html
         <!-- HTML -->
         <button type="button" class="btn btn-type01 btn-primary">Button</button>
         
         <!-- React -->
         <Button designType="type01" label="Button" primary />
         
         <!-- Vue -->
         <button-component design-type="type01" label="Button" :primary="true" />
         \`\`\`
       `,
      },
    },
    a11y: {
      config: {
        rules: [
          { id: 'button-name', enabled: true },
          { id: 'color-contrast', enabled: true },
        ],
      },
    },
  },
};

export const Type02: Story = {
  args: {
    designType: 'type02',
    label: 'Type 02 Button',
    primary: true,
  },
  parameters: {
    docs: {
      source: {
        language: 'tsx',
        code: '<Button designType="type02" label="Type 02 Button" primary />',
      },
      html: {
        source: '<button type="button" class="btn btn-type02 btn-primary">Type 02 Button</button>',
      },
      description: {
        story: `
         # Type 02 Button
         아웃라인 스타일의 버튼입니다.
         
         ## 접근성 고려사항
         - 테두리와 배경색의 충분한 대비
         - 호버/포커스 상태의 명확한 표시
         - 적절한 여백과 크기
         
         ## 사용 예시
         \`\`\`html
         <!-- HTML -->
         <button type="button" class="btn btn-type02 btn-primary">Button</button>
         
         <!-- React -->
         <Button designType="type02" label="Button" primary />
         
         <!-- Vue -->
         <button-component design-type="type02" label="Button" :primary="true" />
         \`\`\`
       `,
      },
    },
  },
};

export const Type03: Story = {
  args: {
    designType: 'type03',
    label: 'Type 03 Button',
    primary: true,
  },
  parameters: {
    docs: {
      source: {
        language: 'tsx',
        code: '<Button designType="type03" label="Type 03 Button" primary />',
      },
      html: {
        source: '<button type="button" class="btn btn-type03 btn-primary">Type 03 Button</button>',
      },
      description: {
        story: `
         # Type 03 Button
         그라데이션 효과가 적용된 버튼입니다.
         
         ## 접근성 고려사항
         - 그라데이션 적용 시 텍스트 가독성 유지
         - 동적 상태 변화에 대한 적절한 피드백
         
         ## 사용 예시
         \`\`\`html
         <!-- HTML -->
         <button type="button" class="btn btn-type03 btn-primary">Button</button>
         
         <!-- React -->
         <Button designType="type03" label="Button" primary />
         
         <!-- Vue -->
         <button-component design-type="type03" label="Button" :primary="true" />
         \`\`\`
       `,
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Button',
    disabled: true,
  },
};

export const Readonly: Story = {
  args: {
    label: 'Readonly Button',
    readonly: true,
  },
};

export const WithVariants: Story = {
  args: {
    label: 'Button Variants',
    variant: 'contained',
  },
};
