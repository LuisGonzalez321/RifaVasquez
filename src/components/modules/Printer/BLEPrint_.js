import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';

//Impresora
import {BLEPrinter} from 'react-native-thermal-receipt-printer';

let BLEPrinter_ = ({onAction, Ticket, onHabilitate}) => {
  const [conectado, setConectado] = useState(false);
  const [printers, setPrinters] = useState([]);
  const [currentPrinter, setCurrentPrinter] = useState(undefined);

  useEffect(() => {
    BLEPrinter.init()
      .then(() => {
        BLEPrinter.getDeviceList().then(setPrinters);
      })
      .catch((err) => {
        console.warn(err);
        setPrinters([]);
      });
  });

  let _connectPrinter = (printer) => {
    BLEPrinter.connectPrinter(
      printer.inner_mac_address,
      printer.vendorID,
      printer.productId,
    )
      .then((printer) => {
        setConectado(true);
        setCurrentPrinter(printer);
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  let printTextTest = () =>
    onHabilitate ? currentPrinter && BLEPrinter.printText(Ticket) : null;

  return (
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <View style={{margin: 20}}>
        {printers.map((printer) => (
          <TouchableOpacity
            style={{marginBottom: 20}}
            key={printer.inner_mac_address}
            onPress={() => _connectPrinter(printer)}>
            <Text
              style={{
                backgroundColor: '#018abd',
                color: 'white',
                paddingVertical: 10,
                paddingHorizontal: 10,
                borderRadius: 10,
              }}>{`Nombre: ${printer.device_name}, direccion_mac: ${printer.inner_mac_address}`}</Text>
          </TouchableOpacity>
        ))}
        {conectado ? (
          <TouchableOpacity
            style={[styles.container, styles.materialButtonViolet]}
            onPress={() => {
              onAction();
              printTextTest();
            }}>
            <Text style={styles.ingresar}>Generar Ticket</Text>
          </TouchableOpacity>
        ) : (
          <Text style={{textAlign: 'center', marginTop: 10}}>
            Seleccione la impresora
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  materialButtonViolet: {
    height: 36,
    width: 303,
    backgroundColor: 'rgba(1,138,189,1)',
    marginBottom: 30,
    alignSelf: 'center',
  },
  container: {
    backgroundColor: '#3F51B5',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    elevation: 2,
    minWidth: 88,
    paddingLeft: 16,
    paddingRight: 16,
  },
  ingresar: {
    color: '#fff',
    fontSize: 14,
  },
});

export default BLEPrinter_;
