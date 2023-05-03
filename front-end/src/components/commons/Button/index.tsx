import { ButtonHTMLAttributes, MouseEvent } from 'react';

// Styles
import buttonStyles from 'components/commons/Button/index.module.css';

type Variant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'success'
  | 'info';
type Size = 'small' | 'medium' | 'large';
type Border = 'b-md' | 'b-lg';
type Width = 'w-sm' | 'w-lg';
type Type = 'button' | 'submit';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  name?: string;
  className?: string;
  leftIcon?: string;
  rightIcon?: string;
  variant?: Variant;
  border?: Border;
  size?: Size;
  width?: Width;
  type?: Type;
  onClick?: (_event: MouseEvent) => void;
};

const Button = (props: ButtonProps) => {
  const {
    label,
    leftIcon = '',
    rightIcon = '',
    className = '',
    variant = 'default',
    size = 'medium',
    border = 'b-md',
    width = 'w-sm',
    type = 'button',
    ...rest
  } = props;

  const classes = `${buttonStyles.btn} ${buttonStyles[variant]}
  ${buttonStyles[size]} ${buttonStyles[border]}
  ${buttonStyles[width]} ${className}`;

  return (
    <button className={classes} type={type} {...rest}>
      {leftIcon && (
        <img src={leftIcon} alt="icon action" className={buttonStyles.icon} />
      )}

      {label}

      {rightIcon && (
        <img src={rightIcon} alt="icon action" className={buttonStyles.icon} />
      )}
    </button>
  );
};

export default Button;
