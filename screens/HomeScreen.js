import { Button, StyleSheet, Text, View  } from "react-native";


const HomeScreen = ({navigation}) => {
  return (
      <View style={styles.container}>
          <Text>Welcome to home screen</Text>
          <Button
              title="Go to Details"
              onPress={() => navigation.navigate('Login')}
        ></Button>
              </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
