import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { VictoryPie } from "victory-native";

import { HistoryCard } from "../../components/HistoryCard";
import theme from "../../global/styles/theme";
import { categories } from "../../utils/categories";
import { Container, Header, Title, Content, ChartContainer } from "./styles";

interface TransactionData {
  type: "positive" | "negative";
  name: string;
  amount: string;
  category: string;
  date: string;
}
interface CategoryData {
  key: string;
  name: string;
  total: number;
  totalFormatted: string;
  color: string;
  percent: string;
}

export function Resumo() {
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>(
    []
  );
  async function loadData() {
    const dataKey = "@gofinances:transactions";
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    const expensives = responseFormatted.filter(
      (expensive: TransactionData) => expensive.type === "negative"
    );

    const expensivesTotal = expensives.reduce(
      (acumullator: number, expensive: TransactionData) => {
        return acumullator + Number(expensive.amount);
      },
      0
    );

    const totalByCategory: CategoryData[] = [];

    categories.forEach((category) => {
      let categorySum = 0;

      expensives.forEach((expensive: TransactionData) => {
        if (expensive.category === category.key) {
          categorySum += Number(expensive.amount);
        }
      });

      if (categorySum > 0) {
        const totalFormatted = categorySum.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        const percent = `${((categorySum / expensivesTotal) * 100).toFixed(
          0
        )}%`;

        totalByCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total: categorySum,
          totalFormatted,
          percent,
        });
      }
    });

    setTotalByCategories(totalByCategory);
    console.log(totalByCategory);
  }

  useEffect(() => {
    loadData();
  }, []);
  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>
      <ChartContainer>
        <VictoryPie
          colorScale={totalByCategories.map((category) => category.color)}
          style={{
            labels: {
              fontSize: RFValue(18),
              fontWeight: "bold",
              fill: theme.colors.shape,
            },
          }}
          labelRadius={50}
          data={totalByCategories}
          x="percent"
          y="total"
        />
      </ChartContainer>
      <Content>
        {totalByCategories.map(({ key, name, totalFormatted, color }) => (
          <HistoryCard
            key={key}
            title={name}
            amount={totalFormatted}
            color={color}
          />
        ))}
      </Content>
    </Container>
  );
}