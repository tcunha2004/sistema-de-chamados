import { createGlobalStyle } from "styled-components";
import SfPro from "../../assets/fonts/SF-Pro-Display.otf";

export const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'SF Pro';
        src: url(${SfPro}) format('opentype');
        font-style: normal;
    }
    

    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    :focus{
        outline: 0;
        box-shadow: 0 0 0 2px ${(props) => props.theme["dark-gray"]};
    }

    body{
        background: ${(props) => props.theme.white};
        color: ${(props) => props.theme.black};
    }

    body, input, textarea, button {
        font-family: 'SF Pro', sans-serif;
        font-weight: 100;
        font-size: 1rem;
    }
`;
