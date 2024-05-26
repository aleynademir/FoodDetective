import React from 'react';
import { View, Image, StyleSheet, Button } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  const handlePress = () => {
    navigation.replace('Search');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Button 
        title="Uygulamaya Giriş" 
        onPress={handlePress} 
        color="#00B2AD" // Buton rengi
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e76f51',
  },
  logo: {
    width: 400,
    height: 400,
    marginBottom: 20,
  },
});

export default WelcomeScreen;
