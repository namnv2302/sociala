import { FC } from 'react';
import './GlobalStyles.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

type GlobalStylesProps = {
    children: JSX.Element;
};

const GlobalStyles: FC<GlobalStylesProps> = ({ children }) => {
    return children;
};

export default GlobalStyles;
