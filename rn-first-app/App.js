import React, { useState } from 'react';
import { StyleSheet, View, Button, FlatList } from 'react-native';

import GoalInput from './components/Goalinput';
import GoalItem from './components/Goalitem';

export default function App() {
  const [courseGoals, setCouseGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  const addGoalHandler = goalTitle => {
    if (goalTitle.length === 0) {
      return;
    }
    setCouseGoals(currentGoals => [
      ...currentGoals, 
      { id: Math.random().toString(), value: goalTitle }
    ]);

    setIsAddMode(false);
  };

  const removeGoalHandler = goalId => {
    setCouseGoals(currentGoals => {
      return currentGoals.filter((goal) => goal.id !== goalId);
    });
  };

  const cancelGoaladditionHandler = () => {
    setIsAddMode(false);
  };
  
  return (
    <View style={styles.container}>
      <Button title="Add New Goal" onPress={() => setIsAddMode(true)} />
      <GoalInput 
        visible={isAddMode} 
        onAddGoal={addGoalHandler} 
        onCancel={cancelGoaladditionHandler} 
      />
      <FlatList 
        keyExtractor={(item, index) => item.id }
        data={courseGoals} 
        renderItem={itemData => (
          <GoalItem 
            id={itemData.item.id} 
            onDelete={removeGoalHandler} 
            title={itemData.item.value} 
          />
        )}
      >
      </FlatList>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 50
  },
});
