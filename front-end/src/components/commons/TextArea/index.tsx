import { TextareaHTMLAttributes } from 'react';

// Styles
import styles from 'components/commons/TextArea/index.module.css';

export type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  className?: string;
};

const TextArea = (props: TextAreaProps) => {
  const { value = '', className = '', ...rest } = props;

  return (
    <textarea
      className={`${styles.text} ${className}`}
      {...rest}
      value={value}
    ></textarea>
  );
};

export default TextArea;
