import React, { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import SearchBar from '../components/SearchBar';
import useResults from '../hooks/useResults';
import ResultsList from '../components/ResultsList';

export default function SearchScreen() {
  const [searchApi, results, errorMessage] = useResults();
  const [term, setTerm] = useState('');

  const filterResultsByPrice = (price) => {
    return results.filter((result) => {
      return result.price === price;
    });
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <SearchBar
        term={term}
        onTermChange={setTerm}
        onTermSubmit={() => searchApi(term)}
      />
      {errorMessage ? (
        <Text style={styles.error}>{errorMessage}</Text> // Hata mesajı rengi
      ) : (
        <>
          {results.length === 0 ? (
            <></>
          ) : (
            <>
              <ResultsList
                title="Ucuz Restoranlar"
                results={filterResultsByPrice('₺')}
              />
              <ResultsList
                title="Uygun Restoranlar"
                results={filterResultsByPrice('₺₺')}
              />
              <ResultsList
                title="Pahalı Restoranlar"
                results={filterResultsByPrice('₺₺₺')}
              />
            </>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e76f51', // Arka plan rengi
    color: '#00B2AD', // Yazı rengi
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  error: {
    color: '#00B2AD', // Hata mesajı rengi
    textAlign: 'center',
    marginTop: 10,
  },
});
