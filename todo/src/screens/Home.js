import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import {
    Alert,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import TaskItem from '../components/TaskItem';

const STORAGE_KEY = '@todo_app_tasks';

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [text, setText] = useState('');

    useEffect(() => {
        loadTasks();
    }, []);

    useEffect(() => {
        saveTasks(tasks);
    }, [tasks]);

    const loadTasks = async () => {
        try {
            const storedTasks = await AsyncStorage.getItem(STORAGE_KEY);
            if (storedTasks) {
                setTasks(JSON.parse(storedTasks));
            }
        } catch (e) {
            console.error('Failed to load tasks', e);
        }
    };

    const saveTasks = async (currentTasks) => {
        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(currentTasks));
        } catch (e) {
            console.error('Failed to save tasks', e);
        }
    };

    const addTask = () => {
        if (text.trim().length === 0) return;

        const newTask = {
            id: Date.now().toString(),
            text: text.trim(),
            completed: false,
        };

        setTasks([newTask, ...tasks]);
        setText('');
        Alert.alert('Success', 'Task added successfully!', [{ text: 'OK' }]);
    };

    const toggleTask = (id) => {
        const taskToToggle = tasks.find(t => t.id === id);
        if (!taskToToggle) return;

        const newCompleted = !taskToToggle.completed;

        if (newCompleted) {
            Alert.alert('Success', 'Task marked as completed!', [{ text: 'OK' }]);
        } else {
            Alert.alert('Pending', 'Task marked as pending!', [{ text: 'OK' }]);
        }

        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: newCompleted } : task
        ));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
        Alert.alert('Deleted', 'Task deleted successfully!', [{ text: 'OK' }]);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>My Tasks</Text>
                    <Text style={styles.subtitle}>{tasks.filter(t => !t.completed).length} pending</Text>
                </View>

                <FlatList
                    data={tasks}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <TaskItem
                            task={item}
                            onToggle={toggleTask}
                            onDelete={deleteTask}
                        />
                    )}
                    contentContainerStyle={styles.listContent}
                    ListEmptyComponent={
                        <View style={styles.emptyState}>
                            <Text style={styles.emptyText}>No tasks yet. Add one below!</Text>
                        </View>
                    }
                />

                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.inputWrapper}
                >
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Add a new task..."
                            placeholderTextColor="#999"
                            value={text}
                            onChangeText={setText}
                            onSubmitEditing={addTask}
                        />
                        <TouchableOpacity onPress={addTask} style={styles.addButton}>
                            <Text style={styles.addButtonText}>+</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    container: {
        flex: 1,
    },
    header: {
        padding: 24,
        paddingTop: 10,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginTop: 4,
    },
    listContent: {
        paddingHorizontal: 24,
        paddingBottom: 100,
    },
    emptyState: {
        alignItems: 'center',
        marginTop: 60,
    },
    emptyText: {
        color: '#999',
        fontSize: 16,
    },
    inputWrapper: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: 'transparent',
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 24,
        backgroundColor: '#F5F5F5', // Match background to hide content behind
        borderTopWidth: 1,
        borderTopColor: '#EEE',
    },
    input: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 30,
        fontSize: 16,
        marginRight: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    addButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#6C63FF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#6C63FF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    addButtonText: {
        color: '#FFF',
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: -2,
    },
});

export default Home;
