import React from 'react';
import './button.scss';

interface ButtonProps {
  designType?: 'type01' | 'type02' | 'type03';
  primary?: boolean;
  backgroundColor?: string | null;
  size?: 'small' | 'medium' | 'large';
  variant?: 'contained' | 'outlined' | 'text';
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  readonly?: boolean;
}

const DESIGN_TYPES = {
  type01: {
    base: 'btn-type01',
    styles: {
      primary: 'bg-blue-500 text-white',
      secondary: 'bg-gray-500 text-white',
    },
  },
  type02: {
    base: 'btn-type02',
    styles: {
      primary: 'border-2 border-blue-500 text-blue-500',
      secondary: 'border-2 border-gray-500 text-gray-500',
    },
  },
  type03: {
    base: 'btn-type03',
    styles: {
      primary: 'bg-gradient-to-r from-blue-500 to-purple-500 text-white',
      secondary: 'bg-gradient-to-r from-gray-500 to-gray-700 text-white',
    },
  },
};

export const Button = ({
  designType = 'type01',
  primary = false,
  backgroundColor = null,
  size = 'medium',
  label,
  disabled = false,
  readonly = false,
  ...props
}: ButtonProps) => {
  const designConfig = DESIGN_TYPES[designType];
  const mode = primary ? designConfig.styles.primary : designConfig.styles.secondary;
  const baseClasses = [
    'btn',
    designConfig.base,
    `btn-${size}`,
    mode,
    disabled ? 'btn-disabled' : '',
    readonly ? 'btn-readonly' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || readonly) {
      e.preventDefault();
      return;
    }
    if (props.onClick) {
      props.onClick();
    }
  };

  return (
    <button
      type="button"
      className={baseClasses}
      style={backgroundColor ? { backgroundColor } : undefined}
      onClick={handleClick}
      disabled={disabled}
      aria-disabled={disabled || readonly}
      tabIndex={readonly ? -1 : 0}
      {...props}
    >
      {label}
    </button>
  );
};
