import AsyncStorage from "@react-native-async-storage/async-storage";

export async function removeAll() {
  const dataKey = "@gofinances:transactions";

  await AsyncStorage.removeItem(dataKey);
}
