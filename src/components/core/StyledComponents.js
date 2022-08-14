import styled, { css } from "styled-components";

export const InputWrapper = styled.div`
  padding: 20px;
  ${({ padding }) =>
    padding &&
    css`
      padding: ${padding};
    `}
`;

export const InputWrapperSearch = styled.div`
  @media (max-width: 600px) {
    padding-top: 20px;
  }
`;

export const SectionWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  ${({ align }) =>
    align === "right" &&
    css`
      justify-content: flex-end;
    `}

  ${({ position }) =>
    position &&
    css`
      align-tems: ${position};
    `}
`;

export const SectionCustom = styled.div`
  ${({ width }) =>
    width &&
    css`
      width: ${width};
    `}
  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const SectionOneByTwo = styled.div`
  width: 50%;
  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const SectionOneByThree = styled.div`
  width: 33.33%;
  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const PaddedWrapper = styled.div`
  padding: 5px 20px 5px 20px;
  ${({ padding }) =>
    padding &&
    css`
      padding: ${padding};
    `}

  ${({ paddingMob }) =>
    paddingMob &&
    css`
      @media (max-width: 600px) {
        padding: ${paddingMob};
      }
    `}
`;

export const Header = styled.div`
  background-color: #1976d2;
  padding: 15px 50px;
  color: #fff;
  display: flex;
  align-items: center;
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
    0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
  @media (max-width: 600px) {
    padding: 10px 20px;
  }
`;

export const Footer = styled.div`
  background-color: #292929;
  padding: 30px 50px 30px 50px;
  color: #fff;
  display: flex;
  align-items: center;
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
    0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
`;
