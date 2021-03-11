import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button, Paragraph} from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

//database
import {
  EditarHoraCierre,
  ValidarHoraCierre,
} from '../database/models/modelHoraCierre';

const AjusteNumeros = (props) => {
  const [hMañana, setHMañana] = useState({});
  const [hTarde, setHTarde] = useState({});
  const [hNoche, setHNoche] = useState({});

  useEffect(() => {
    CargarHorario();

    return ()=>{
      setHMañana({})
      setHTarde({})
      setHNoche({})
    }
  }, []);

  const CargarHorario = () => {
    ValidarHoraCierre('Mañana')
      .then((horario_) => {
        const {Hora, Minuto} = horario_;
        setHMañana({...hMañana, Hora, Minuto});

        ValidarHoraCierre('Tarde')
          .then((horario_) => {
            const {Hora, Minuto} = horario_;
            setHTarde({...hTarde, Hora, Minuto});

            ValidarHoraCierre('Noche')
              .then((horario_) => {
                const {Hora, Minuto} = horario_;
                setHNoche({...hNoche, Hora, Minuto});
              })
              .catch((err) => {
                setHNoche({});
              });
          })
          .catch((err) => {
            setHTarde({});
          });
      })
      .catch((err) => {
        setHMañana({});
      });
  };

  const Example = ({horario, TypeHora}) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [cierre, setCierre] = useState({});

    useEffect(() => {
      
    }, []);

    const editarHoraCierre = (hora, minuto, horario) => {
      EditarHoraCierre(hora, minuto, horario)
        .then(() => {
          console.info('Horario Editado');
          setCierre({hora, minuto});
        })
        .catch(() => {
          console.info('Error');
          setCierre({});
        });
    };

    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
      let hora_ = date.getHours().toString();
      let minuto_ = date.getMinutes().toString();
      editarHoraCierre(hora_, minuto_, horario);
      hideDatePicker();
      props.navigation.navigate('Ajustes');
    };

    return (
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 50,
        }}>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Paragraph style={{fontSize: 19}}>Horario: {horario}</Paragraph>
          <View style={{flexDirection: 'row'}}>
            <Text>{TypeHora.Hora}:</Text>
            <Text>{TypeHora.Minuto}</Text>
          </View>
        </View>
        <Button onPress={showDatePicker}>Editar Hora de cierre</Button>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="time"
          onConfirm={(date) => handleConfirm(date)}
          onCancel={hideDatePicker}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Paragraph style={{fontSize: 21, marginBottom: 50}}>
        Hora actual de cierre de la venta.
      </Paragraph>
      <Example horario={'Mañana'} TypeHora={hMañana} />
      <Example horario={'Tarde'} TypeHora={hTarde} />
      <Example horario={'Noche'} TypeHora={hNoche} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
  },
});

export default AjusteNumeros;
