import { DataListProps } from ".";

export const allDataCards: DataListProps[] = [
  {
    id: "1",
    type: "positive",
    title: "Desenvolvimento de site",
    amount: "R$ 12.000,00",
    category: {
      name: "Vendas",
      icon: "dollar-sign",
    },
    date: "13/04/2020",
  },
  {
    id: "2",
    type: "negative",
    title: "Hamburguaria Pizzy",
    amount: "R$ 59,00",
    category: {
      name: "Alimentação",
      icon: "coffee",
    },
    date: "13/04/2020",
  },
  {
    id: "3",
    type: "negative",
    title: "Aluguel do apartamento",
    amount: "R$ 1.2000,00",
    category: {
      name: "Casa",
      icon: "shopping-bag",
    },
    date: "13/04/2020",
  },
];
