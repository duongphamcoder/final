import { MouseEvent } from 'react';

// Component
import { Button, Heading } from 'components/commons';

// Styles
import styles from 'components/Card/index.module.css';

export type CardProps = {
  href?: string;
  title: string;
  price: string;
  imageUrl: string;
  onClick?: (_event: MouseEvent) => void;
};

const Card = (props: CardProps) => {
  const { title, price, imageUrl, onClick } = props;

  return (
    <div className={styles.card}>
      <img src={imageUrl} alt={title} className={styles.image} />
      <Heading label={title} className={styles.heading} size="md" />
      <div className="">
        <p className={styles.price}>{price}</p>
        <Button label="đặt hàng" onClick={onClick} variant="primary" />
      </div>
    </div>
  );
};

export default Card;
