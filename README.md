# Simple To-Do App

A clean and modern To-Do application built with React Native and Expo. This app allows users to manage their tasks with features like adding, toggling completion, and deleting tasks. It uses `AsyncStorage` for local data persistence.

## Getting Started

### Installation

1.  Clone the repository (or navigate to the project directory):
    ```bash
    cd assignment-1
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

### Running the App

Start the development server:
```bash
npx expo start
```

## Project Structure

-   `app/`: Main entry point and routing (Expo Router).
-   `todo/`: Contains the core To-Do app logic.
    -   `src/screens/Home.js`: Main screen with state and logic.
    -   `src/components/TaskItem.js`: Reusable task list item component.

