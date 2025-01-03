import React from 'react';
import './button.scss';

interface ButtonProps {
  label: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'full';
  variant?: 'default' | 'primary' | 'outline-default' | 'outline-primary';
  className?: string;

  // HTML 태그 타입
  as?: 'button' | 'a';

  // 링크 관련 props
  href?: string;
  target?: string;
  title?: string;
  isExternalLink?: boolean;

  onClick?: () => void;
  disabled?: boolean;
  readonly?: boolean;

  // 디자인 타입
  designType?: 'type01' | 'type02' | 'type03';
}

export const Button = ({
  label,
  size = 'md',
  variant = 'default',
  className = '',
  as = 'button',
  href,
  target,
  title,
  isExternalLink,
  onClick,
  disabled = false,
  readonly = false,
  designType,
  ...props
}: ButtonProps) => {
  const baseClasses = [
    'btn',
    `btn-${size}`,
    `btn-${variant}`,
    `btn-${designType}`,
    // disabled ? 'btn-disabled' : '',
    // readonly ? 'btn-readonly' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (disabled || readonly) {
      e.preventDefault();
      return;
    }
    if (onClick) {
      onClick();
    }
  };

  // href가 있거나 as가 'a'로 지정된 경우 앵커 태그로 렌더링
  if (href || as === 'a') {
    return (
      <a
        href={href || '#'}
        className={`${baseClasses}${disabled ? ' disabled' : ''}${readonly ? ' readonly' : ''}`}
        onClick={handleClick as React.MouseEventHandler<HTMLAnchorElement>}
        target={target}
        title={title}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        {...props}
      >
        {label}
        {isExternalLink && target === '_blank' && (
          <i className="ico ico-external-link ml-1" aria-hidden="true" />
        )}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={baseClasses}
      onClick={handleClick as React.MouseEventHandler<HTMLButtonElement>}
      disabled={disabled}
      data-readonly={readonly}
      // aria-disabled={disabled || readonly}
      // tabIndex={readonly ? -1 : 0}
      {...props}
    >
      {label}
    </button>
  );
};
