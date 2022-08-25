import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import ListItem from './src/components/ListItem/ListItem';
import { configureStore } from '@reduxjs/toolkit';
import contactReducer from './src/store/services/contactSlice';

const store = configureStore({
  reducer:contactReducer
})
export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
          <ListItem/>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop:60
  },
});
