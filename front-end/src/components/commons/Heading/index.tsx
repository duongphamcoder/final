import { HTMLAttributes } from 'react';

// Styles
import stylesHeading from 'components/commons/Heading/index.module.css';

type Size = 'sm' | 'md' | 'lg' | 'xl';
type TagName = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  label?: string;
  tag?: TagName;
  size?: Size;
};

const Heading = (props: HeadingProps) => {
  const {
    children,
    label = '',
    className = '',
    size = 'sm',
    tag = 'h2',
    ...rest
  } = props;
  const TagName = tag;
  const classes = `${stylesHeading.heading} ${stylesHeading[size]} ${className}`;
  const attributes = {
    ...rest,
    className: classes,
  };

  return <TagName {...attributes}>{children || label}</TagName>;
};

export default Heading;
