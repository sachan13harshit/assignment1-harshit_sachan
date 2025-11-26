import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TaskItem = ({ task, onToggle, onDelete }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.contentContainer} 
        onPress={() => onToggle(task.id)}
        activeOpacity={0.7}
      >
        <View style={[styles.checkbox, task.completed && styles.checkboxChecked]}>
          {task.completed && <View style={styles.checkmark} />}
        </View>
        <Text style={[styles.text, task.completed && styles.textCompleted]}>
          {task.text}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        onPress={() => onDelete(task.id)}
        style={styles.deleteButton}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Text style={styles.deleteText}>✕</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#6C63FF',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#6C63FF',
  },
  checkmark: {
    width: 10,
    height: 10,
    backgroundColor: '#FFF',
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  textCompleted: {
    textDecorationLine: 'line-through',
    color: '#AAA',
  },
  deleteButton: {
    padding: 8,
    marginLeft: 8,
  },
  deleteText: {
    fontSize: 18,
    color: '#FF5252',
    fontWeight: 'bold',
  },
});

export default TaskItem;
