import { InputHTMLAttributes, MouseEvent, Ref, forwardRef } from 'react';

// Style
import inputStyles from 'components/commons/Input/index.module.css';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  leftIcon?: string;
  rightIcon?: string;
  className?: string;
  onClick?: (_event: MouseEvent) => void;
};

const Input = (props: InputProps, ref: Ref<HTMLInputElement>) => {
  const {
    value = '',
    leftIcon = '',
    rightIcon = '',
    className = '',
    type = 'text',
    placeholder = 'Enter text...',
    onClick,
    onChange,
    ...rest
  } = props;

  const classes = `${inputStyles.input} ${className}`;

  return (
    <div className={classes}>
      {leftIcon && (
        <img
          src={leftIcon}
          alt="icon"
          className={inputStyles.icon}
          onClick={onClick}
        />
      )}

      <input
        className={inputStyles.value}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        ref={ref}
        {...rest}
      />

      {rightIcon && (
        <img
          src={rightIcon}
          alt="icon"
          className={inputStyles.icon}
          onClick={onClick}
        />
      )}
    </div>
  );
};

export default forwardRef(Input);
