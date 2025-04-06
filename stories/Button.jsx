import React from 'react';
import PropTypes from 'prop-types';
import './button.scss';

/** Primary UI component for user interaction */
export const Button = ({
  variant = 'default',
  size = 'md',
  label,
  icon,
  isIconOnly = false,
  isFab = false,
  isFabExtended = false,
  isNewWindow = false,
  href,
  disabled = false,
  readonly = false,
  isSegment = false,
  isSegmentActive = false,
  isFull = false,
  ...props
}) => {
  const baseClass = 'btn';
  const sizeClass = `btn-${size}`;
  const variantClass = variant ? 
    (variant.startsWith('outline-') ? 
      `btn-outline-${variant.split('-')[1]}` : 
      `btn-${variant}`) : 
    '';
  const iconClass = isIconOnly ? 'btn-icon' : '';
  const fabClass = isFab ? 'btn-fab' : '';
  const fabExtendedClass = isFabExtended ? 'btn-fab-extended' : '';
  const segmentClass = isSegment ? 'btn-segment' : '';
  const segmentActiveClass = isSegmentActive ? 'is-active' : '';
  const fullClass = isFull ? 'btn-full' : '';

  const className = [
    baseClass,
    sizeClass,
    variantClass,
    iconClass,
    fabClass,
    fabExtendedClass,
    segmentClass,
    segmentActiveClass,
    fullClass,
    (disabled || readonly) && 'is-disabled',
  ].filter(Boolean).join(' ');

  const Tag = href ? 'a' : 'button';
  const newWindowProps = isNewWindow ? {
    target: '_blank',
    title: '새창으로 열림'
  } : {};

  const segmentProps = isSegment ? {
    'aria-pressed': isSegmentActive,
    role: 'button'
  } : {};

  const content = (
    <>
      {icon && <i className={`ico ico-${icon}`} />}
      {!isIconOnly && label}
    </>
  );

  return (
    <Tag
      className={className}
      href={href}
      disabled={disabled}
      readOnly={readonly}
      {...newWindowProps}
      {...segmentProps}
      {...props}
    >
      {content}
    </Tag>
  );
};

Button.propTypes = {
  /** Button variant style */
  variant: PropTypes.oneOf([
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
  ]),
  /** Button size */
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  /** Button label text */
  label: PropTypes.string,
  /** Icon name (without 'ico-' prefix) */
  icon: PropTypes.string,
  /** Whether the button contains only an icon */
  isIconOnly: PropTypes.bool,
  /** Whether the button is a Floating Action Button */
  isFab: PropTypes.bool,
  /** Whether the button is an extended FAB */
  isFabExtended: PropTypes.bool,
  /** Whether the link opens in a new window */
  isNewWindow: PropTypes.bool,
  /** URL for link buttons */
  href: PropTypes.string,
  /** Whether the button is disabled */
  disabled: PropTypes.bool,
  /** Whether the button is readonly */
  readonly: PropTypes.bool,
  /** Whether the button is a segment button */
  isSegment: PropTypes.bool,
  /** Whether the segment button is active */
  isSegmentActive: PropTypes.bool,
  /** Whether the button takes full width */
  isFull: PropTypes.bool,
  /** Optional click handler */
  onClick: PropTypes.func,
};
