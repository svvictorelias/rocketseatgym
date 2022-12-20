import { useState } from "react";
import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { VStack, HStack, Heading, FlatList, Text } from "native-base";
import { ExerciseCard } from "@components/ExerciseCard";

export function Home() {
  const [group, setGroup] = useState(["ombro", "costa", "biceps", "triceps"]);
  const [exercises, setExercises] = useState(["1", "2", "3", "4"]);
  const [groupSelected, setGroupSelected] = useState("ombro");
  return (
    <VStack flex={1}>
      <HomeHeader />
      <FlatList
        data={group}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={groupSelected.toUpperCase() === item.toUpperCase()}
            onPress={() => setGroupSelected(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{ px: 8 }}
        my={10}
        maxH={10}
      />
      <VStack flex={1} px={8}>
        <HStack justifyContent="space-between" mb={5}>
          <Heading color="gray.200" fontSize="md">
            Execícios
          </Heading>
          <Text color="gray.200" fontSize="sm">
            {exercises.length}
          </Text>
        </HStack>
        <FlatList
          data={exercises}
          keyExtractor={item => item}
          renderItem={({ item }) => <ExerciseCard />}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ paddingBottom: 20 }}
        />
      </VStack>
    </VStack>
  );
}
