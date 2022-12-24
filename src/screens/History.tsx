import { HistoryCard } from "@components/HistoryCard";
import { useCallback, useState } from "react";
import { ScreenHeader } from "@components/ScreenHeader";
import { VStack, Heading, SectionList, Text, useToast } from "native-base";
import { AppError } from "@utils/AppError";
import { Loading } from "@components/Loading";
import { api } from "@services/api";
import { useFocusEffect } from "@react-navigation/native";
import { HistoryByDayDTO } from "@dtos/HistoryByDayDTO";
import { useAuth } from "@hooks/useAuth";
export function History() {
  const toast = useToast();
  const { refreshedToken } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [exercises, setExercises] = useState<HistoryByDayDTO[]>([]);
  async function fetchHistory() {
    try {
      setIsLoading(true);
      const response = await api.get("/history");
      setExercises(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : " Não foi possivel salvar o historico do exercício";
      toast.show({
        title,
        placement: "bottom",
        bgColor: "red.500"
      });
    } finally {
      setIsLoading(false);
    }
  }
  useFocusEffect(
    useCallback(() => {
      fetchHistory();
    }, [refreshedToken])
  );
  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios" />
      {isLoading ? (
        <Loading />
      ) : (
        exercises?.length && (
          <SectionList
            sections={exercises}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <HistoryCard data={item} />}
            renderSectionHeader={({ section }) => (
              <Heading
                color="gray.200"
                fontSize="md"
                mt={10}
                mb={3}
                fontFamily="heading"
              >
                {section.title}
              </Heading>
            )}
            px={8}
            contentContainerStyle={
              exercises.length === 0 && { flex: 1, justifyContent: "center" }
            }
            ListEmptyComponent={() => (
              <Text color="gray.100" textAlign="center">
                Não há exercícios registrados ainda.{"\n"} Vamos fazer
                exercícios hoje?
              </Text>
            )}
            showsVerticalScrollIndicator={false}
          />
        )
      )}
    </VStack>
  );
}
