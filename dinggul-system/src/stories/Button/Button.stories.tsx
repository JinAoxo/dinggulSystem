import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'full'],
      description: '버튼 크기 지정',
    },
    variant: {
      control: 'select',
      options: ['default', 'primary', 'outline-default', 'outline-primary'],
      description: '버튼 스타일 변형',
    },
    as: {
      control: 'radio',
      options: ['button', 'a'],
      description: 'HTML 태그 선택',
    },
    disabled: {
      control: 'boolean',
      description: '버튼 비활성화',
    },
    readonly: {
      control: 'boolean',
      description: '읽기 전용 상태',
    },
    href: {
      control: 'text',
      description: '링크 URL (a 태그로 렌더링)',
      if: { arg: 'as', eq: 'a' },
    },
    target: {
      control: 'text',
      description: '링크 타겟 속성',
      if: { arg: 'as', eq: 'a' },
    },
    title: {
      control: 'text',
      description: '링크 타이틀',
      if: { arg: 'as', eq: 'a' },
    },
    isExternalLink: {
      control: 'boolean',
      description: '외부 링크 아이콘 표시',
      if: { arg: 'as', eq: 'a' },
    },
    designType: {
      control: 'radio',
      options: ['type01', 'type02', 'type03'],
      description: '버튼 디자인 타입 선택',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

// Size Variants
export const ExtraSmall: Story = {
  args: {
    size: 'xs',
    label: 'Extra Small Button',
    variant: 'primary',
    designType: 'type01',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    label: 'Small Button',
    variant: 'primary',
    designType: 'type01',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    label: 'Medium Button',
    variant: 'primary',
    designType: 'type01',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    label: 'Large Button',
    variant: 'primary',
    designType: 'type01',
  },
};

export const Full: Story = {
  args: {
    size: 'full',
    label: 'Full Width Button',
    variant: 'primary',
    designType: 'type01',
  },
};

// State Variants
export const Disabled: Story = {
  args: {
    label: 'Disabled Button',
    variant: 'primary',
    designType: 'type01',
    disabled: true,
  },
};

export const Readonly: Story = {
  args: {
    label: 'Readonly Button',
    variant: 'primary',
    designType: 'type01',
    readonly: true,
  },
};

// Base Variants
export const Type01Button: Story = {
  args: {
    label: 'Type 01 Button',
    variant: 'primary',
    designType: 'type01',
    as: 'button',
  },
};

export const Type02Button: Story = {
  args: {
    label: 'Type 02 Button',
    variant: 'primary',
    designType: 'type02',
    as: 'button',
  },
};

export const Type03Button: Story = {
  args: {
    label: 'Type 03 Button',
    variant: 'primary',
    designType: 'type03',
    as: 'button',
  },
};

// Link Variants
export const Type01Link: Story = {
  args: {
    label: 'Type 01 Link',
    variant: 'primary',
    designType: 'type01',
    as: 'a',
    href: '#',
    target: '_blank',
    title: '새창',
    isExternalLink: true,
  },
};

export const Type02Link: Story = {
  args: {
    label: 'Type 02 Link',
    variant: 'primary',
    designType: 'type02',
    as: 'a',
    href: '#',
    target: '_blank',
    title: '새창',
    isExternalLink: true,
  },
};

export const Type03Link: Story = {
  args: {
    label: 'Type 03 Link',
    variant: 'primary',
    designType: 'type03',
    as: 'a',
    href: '#',
    target: '_blank',
    title: '새창',
    isExternalLink: true,
  },
};
