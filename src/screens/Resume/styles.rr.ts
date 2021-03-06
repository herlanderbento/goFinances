import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { ScrollView } from "react-native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFValue(133)}px;

  background-color: ${({ theme }) => theme.colors.primary};

  align-items: center;
  justify-content: flex-end;
  padding-bottom: 19px;
`;

export const Title = styled.Text`
  font-size: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.shape};
`;

export const Content = styled(ScrollView)``;

export const ChartContainer = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
`;
