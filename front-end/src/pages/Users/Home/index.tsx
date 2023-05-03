// Components
import { Heading } from 'components/commons';

// Styles
import styles from 'pages/Users/Home/index.module.css';
import container from 'styles/commons/index.module.css';

const HomeUser = () => {
  return (
    <section className={styles.home}>
      <div className={container.container}>
        <Heading label="Welcome" size="xl" className={styles.heading} />
        <p className={styles.description}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo,
          veniam officia. Sapiente, similique. Sapiente odit blanditiis labore
          magnam possimus at voluptas inventore incidunt. Sit, expedita. Rerum
          dignissimos cum earum tenetur. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Quidem eius illo a labore necessitatibus voluptatum
          veritatis atque, reprehenderit neque itaque animi. Doloribus
          consectetur maiores facere animi corporis, quidem cum explicabo? Lorem
          ipsum dolor, sit amet consectetur adipisicing elit. Ratione
          repudiandae recusandae magni necessitatibus doloribus architecto
          corporis minima atque explicabo cupiditate, placeat provident odio
          animi veritatis non? Cum nisi quam adipisci.
        </p>
      </div>
    </section>
  );
};

export default HomeUser;
