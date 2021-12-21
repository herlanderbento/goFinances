import React, { useEffect, useState, useCallback } from "react";
import { ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

import { HighlightCard } from "../../components/HighlightCard";
import {
  TransactionCard,
  TransactionCardProps,
} from "../../components/TransactionCard";

import {
  Container,
  Header,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  UserWrapper,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionList,
  LogoutButton,
  LoadContainer,
} from "./styles";
import { removeAll } from "./remove";
import { useTheme } from "styled-components";

export interface IDataListProps extends TransactionCardProps {
  id: string;
}

interface IHighLightDataProps {
  amount: string;
  lastTransaction: string;
}
interface IHighLightData {
  entries: IHighLightDataProps;
  expensive: IHighLightDataProps;
  total: IHighLightDataProps;
}

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<IDataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<IHighLightData>(
    {} as IHighLightData
  );

  const theme = useTheme();

  function getLastTransactionDate(
    collection: IDataListProps[],
    type: "positive" | "negative"
  ) {
    const lastTransaction = new Date(
      Math.max.apply(
        Math,
        collection
          .filter((transaction) => transaction.type === type)
          .map((transaction) => new Date(transaction.date).getTime())
      )
    );

    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString(
      "pt-AO",
      { month: "long" }
    )}`;
  }

  async function loadTransactions() {
    const dataKey = "@gofinances:transactions";
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionsFormatted: IDataListProps[] = transactions.map(
      (item: IDataListProps) => {
        if (item.type === "positive") {
          entriesTotal += Number(item.amount);
        } else {
          expensiveTotal += Number(item.amount);
        }

        const lastTransactionEntries = getLastTransactionDate(
          transactions,
          "positive"
        );
        const lastTransactionExpensive = getLastTransactionDate(
          transactions,
          "negative"
        );

        const totalInterval = `01 a ${lastTransactionExpensive}`;

        const total = entriesTotal - expensiveTotal;

        setHighlightData({
          entries: {
            amount: entriesTotal.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            }),
            lastTransaction: `Última entrada dia ${lastTransactionEntries}`,
          },
          expensive: {
            amount: expensiveTotal.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            }),
            lastTransaction: `Última saída dia ${lastTransactionExpensive}`,
          },
          total: {
            amount: total.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            }),
            lastTransaction: totalInterval,
          },
        });
        const amount = Number(item.amount).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        const date = Intl.DateTimeFormat("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        }).format(new Date(item.date));

        return {
          id: item.id,
          name: item.name,
          amount,
          type: item.type,
          category: item.category,

          date,
        };
      }
    );

    setTransactions(transactionsFormatted);
    setIsLoading(false);
  }

  useEffect(() => {
    //removeAll();
    loadTransactions();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [])
  );

  return (
    <Container>
      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </LoadContainer>
      ) : (
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo
                  source={{
                    uri: "https://avatars.githubusercontent.com/u/80765400?v=4",
                  }}
                />
                <User>
                  <UserGreeting>Olá,</UserGreeting>
                  <UserName>Herlander</UserName>
                </User>
              </UserInfo>
              <LogoutButton onPress={() => {}}>
                <Icon name="power" />
              </LogoutButton>
            </UserWrapper>
          </Header>
          <HighlightCards>
            <HighlightCard
              type="up"
              title="Entradas"
              amount={highlightData.entries.amount}
              lastTransaction={highlightData.entries.lastTransaction}
            />
            <HighlightCard
              type="down"
              title="Saídas"
              amount={highlightData.expensive.amount}
              lastTransaction={highlightData.expensive.lastTransaction}
            />

            <HighlightCard
              type="total"
              title="Total"
              amount={highlightData.total.amount}
              lastTransaction={highlightData.total.lastTransaction}
            />
          </HighlightCards>

          <Transactions>
            <Title>Listagem</Title>
            <TransactionList
              data={transactions}
              keyExtractor={(item: any) => item.id}
              renderItem={({ item }: any) => <TransactionCard data={item} />}
            />
          </Transactions>
        </>
      )}
    </Container>
  );
}
