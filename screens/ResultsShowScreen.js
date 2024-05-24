import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useEffect, useState } from 'react';
import yelp from '../api/yelp';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export default function ResultsShowScreen({ route }) {
  const [result, setResult] = useState(null);
  const id = route.params.id;

  const getResult = async (id) => {
    const response = await yelp.get(`/${id}`);
    console.log(response.data);
    setResult(response.data);
  };

  useEffect(() => {
    getResult(id);
  }, []);
  if (!result) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{result.name}</Text>
      <Text style={styles.phoneLabel}>Telefon:</Text>
      <Text style={styles.phone}>{result.phone}</Text>
      <View style={styles.icon}>
        {result.is_closed ? (
          <AntDesign name="closecircleo" size={30} color="red" />
        ) : (
          <MaterialIcons name="delivery-dining" size={30} color="green" />
        )}
      </View>
      <Text style={styles.photoTitle}>Fotoğraflar</Text>
      <FlatList
        data={result.photos}
        keyExtractor={(photo) => photo}
        renderItem={({ item }) => {
          return <Image style={styles.image} source={{ uri: item }} />;
        }}
        contentContainerStyle={styles.photoList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f8f8f8',
  },
  image: {
    height: 180,
    margin: 10,
    borderRadius: 20,
  },
  title: {
    alignSelf: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 15,
    color: '#333',
  },
  phoneLabel: {
    alignSelf: 'center',
    fontSize: 20,
    color: '#666',
    marginTop: 10,
  },
  phone: {
    alignSelf: 'center',
    fontSize: 16,
    marginBottom: 10,
    color: '#666',
  },
  icon: {
    alignSelf: 'center',
    marginVertical: 10,
  },
  photoTitle: {
    alignSelf: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 15,
    color: '#333',
  },
  photoList: {
    paddingVertical: 20,
  },
});
