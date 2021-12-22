import React from "react";
import { RFPercentage } from "react-native-responsive-fontsize";

import Apple from "../../assets/svg/apple.svg";
import Google from "../../assets/svg/google.svg";
import Logo from "../../assets/svg/logo.svg";
import { SignInSocialButton } from "../../components/SignInSocialButton";

import {
  Container,
  Title,
  TitleWrapper,
  Header,
  SignInTitle,
  Footer,
  FooterWrapper,
} from "./styles";

export function SignIn() {
  return (
    <Container>
      <Header>
        <TitleWrapper>
          <Logo width={RFPercentage(20)} />

          <Title>
            Controle suas {"\n"}
            finanças de forma {"\n"}
            muito simples
          </Title>
        </TitleWrapper>

        <SignInTitle>
          Faça seu login com {"\n"}
          uma das contas abaixo
        </SignInTitle>
      </Header>
      <Footer>
        <FooterWrapper>
          <SignInSocialButton title="Entrar com Google" svg={Google} />
          <SignInSocialButton title="Entrar com Apple" svg={Apple} />
        </FooterWrapper>
      </Footer>
    </Container>
  );
}
