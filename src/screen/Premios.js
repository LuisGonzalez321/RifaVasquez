import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Dimensions, ScrollView} from 'react-native';
import MenuContainer from '../components/elements/MenuContainer';
import ALL_AWARDS from '../database/models/modelPremio';

const widthScreen = Dimensions.get('window').width;

const Premios = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    ALL_AWARDS()
      .then((dataPromise) => {
        setData(dataPromise);
      })
      .catch((err) => setData(null));
  }, []);

  return (
    <View style={styles.container}>
      <MenuContainer {...props} title="Premios" />
      <View style={styles.rect4}>
        <View style={styles.montoRow}>
          <Text style={styles.monto}>Monto</Text>
          <Text style={styles.premio}>Premio</Text>
        </View>
      </View>
      <ScrollView>
        {data ? (
          data.map((item, i) => {
            return (
              <View key={item.ID + i} style={styles.rect6}>
                <Text style={styles.loremIpsum3}>{item.monto} CORDOBAS</Text>
                <Text style={styles.loremIpsum4}>--&gt;</Text>
                <Text style={styles.c7}>C$ {item.premio}</Text>
              </View>
            );
          })
        ) : (
          <Text>Por favor verifique la conexion</Text>
        )}
      </ScrollView>
      <View style={styles.group}>
        <Text style={styles.nota}>
          Nota: El premio puede diferir dependiendo del monto{'\n'}con el que el
          jugador desee, estos solo son los{'\n'}premios y precios estandares.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rect4: {
    height: 32,
    backgroundColor: 'rgba(255,255,255,1)',
    borderBottomRightRadius: 0,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    elevation: 6,
    shadowOpacity: 1,
    shadowRadius: 2,
    width: widthScreen,
    flexDirection: 'row',
    marginTop: 13,
  },
  monto: {
    fontFamily: 'roboto-regular',
    color: 'rgb(5,26,40)',
    height: 17,
    width: 51,
  },
  premio: {
    fontFamily: 'roboto-regular',
    color: 'rgb(5,26,40)',
    width: 54,
    height: 17,
    marginLeft: 130,
  },
  montoRow: {
    height: 17,
    flexDirection: 'row',
    flex: 1,
    marginRight: 64,
    marginLeft: 64,
    marginTop: 7,
  },
  rect: {
    height: 504,
    justifyContent: 'flex-start',
    marginTop: 8,
  },
  rect6: {
    height: 66,
    backgroundColor: 'rgba(255,255,255,1)',
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  loremIpsum3: {
    fontFamily: 'roboto-regular',
    color: '#121212',
    height: 20,
    width: 60,
    textAlign: 'center',
  },
  loremIpsum4: {
    fontFamily: 'roboto-regular',
    color: '#121212',
    height: 23,
    width: 71,
    textAlign: 'center',
  },
  c7: {
    fontFamily: 'roboto-regular',
    color: '#121212',
    height: 23,
    width: 71,
    textAlign: 'center',
  },
  rect5: {
    height: 66,
    backgroundColor: 'rgba(204,224,231,1)',
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  loremIpsum2: {
    fontFamily: 'roboto-regular',
    color: '#121212',
    height: 23,
    width: 90,
    textAlign: 'center',
  },
  loremIpsum1: {
    fontFamily: 'roboto-regular',
    color: '#121212',
    height: 23,
    width: 71,
    textAlign: 'center',
  },
  c000: {
    fontFamily: 'roboto-regular',
    color: '#121212',
    height: 23,
    width: 71,
    textAlign: 'center',
  },
  group: {
    width: widthScreen,
    height: 100,
    backgroundColor: 'rgba(1,138,189,1)',
    alignItems: 'center',
    alignSelf: 'flex-end',
    justifyContent: 'center',
  },
  nota: {
    fontFamily: 'roboto-regular',
    color: 'rgba(255,255,255,1)',
    textAlign: 'left',
  },
});

export default Premios;
