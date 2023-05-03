// Styles
import footerStyles from './index.module.css';
import containerStyles from 'styles/commons/index.module.css';

// Mock data
import { footerData } from 'mock-data';

const Footer = () => {
  return (
    <footer className={footerStyles.mainFooter}>
      <div className={`${containerStyles.container} ${footerStyles.grid}`}>
        <img src={footerData.colOne} alt="" className={footerStyles.logo} />
        <ul className={footerStyles.information}>
          {footerData.colTwo.map((i, index) => (
            <li className={footerStyles.infoItem} key={index}>
              {i}
            </li>
          ))}
        </ul>
        <ul className={footerStyles.information}>
          {footerData.colThree.map((i, index) => (
            <li className={footerStyles.infoItem} key={index}>
              {i}
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
