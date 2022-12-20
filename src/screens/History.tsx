import { HistoryCard } from "@components/HistoryCard";
import { useState } from "react";
import { ScreenHeader } from "@components/ScreenHeader";
import { VStack, Heading, SectionList } from "native-base";
export function History() {
  const [exercises, setExercises] = useState([
    {
      title: "26.08.2022",
      data: ["Puxada frontal", "Remada"]
    },
    {
      title: "27.08.2022",
      data: ["Puxada dorsal"]
    }
  ]);
  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios" />
      <SectionList
        sections={exercises}
        keyExtractor={item => item}
        renderItem={({ item }) => <HistoryCard />}
        renderSectionHeader={({ section }) => (
          <Heading color="gray.200" fontSize="md" mt={10} mb={3}>
            {section.title}
          </Heading>
        )}
        px={8}
      />
    </VStack>
  );
}
