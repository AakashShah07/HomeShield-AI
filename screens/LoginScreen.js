import { Button, StyleSheet, Text, View  } from "react-native";



const LoginScreen = () => {
  return (

      <View style={styles.container}>
          <Text>Welcome to Login screen</Text>
          <Button
              title="Login"
              onPress={() => alert('Button Pressed!')}
        ></Button>
              </View>
  )
}


export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
