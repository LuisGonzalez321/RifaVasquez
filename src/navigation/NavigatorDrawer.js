import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Caption, Drawer, Title} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';

//redux
import {connect} from 'react-redux';
import AuthenticationReducer from '../redux/reducer/AuthReducer/AuthReducer';
import {UsuarioAction, CLEAN_USER} from '../redux/actions/AuthAction/AuthAction';
import {CLEAN_TICKET} from '../redux/actions/Ticket/NewTicketAction'
//database
import {auth} from '../database/firebase';

const mapStateToProps = (state) => {
  return {
    ...state,
    DataUser: AuthenticationReducer(state, UsuarioAction),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      CLEAN_USER: dispatch( CLEAN_USER()),
      CLEAN_TICKET: dispatch(CLEAN_TICKET())
  }
}

const NavigatorDrawer = (props) => {
  const {nombre, rol} = props.DataUser.AuthenticationReducer.User;

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'column', marginTop: 20}}>
              <Image
                style={styles.image}
                source={require('../assets/img/logo_.png')}
                size={50}
              />
              <View style={{marginLeft: 15, flexDirection: 'column'}}>
                <Title style={styles.title}>{rol}</Title>
                <Caption style={styles.caption}>{nombre}</Caption>
              </View>
            </View>
            <Drawer.Section style={styles.drawerSection}>
              <DrawerItem
                icon={({color, size}) => (
                  <Icon name="home-outline" color={color} size={size} />
                )}
                label="Inicio"
                inactiveTintColor={'#004581'}
                onPress={() => {
                  props.navigation.navigate('MainPrincipal');
                }}
              />
              <DrawerItem
                icon={({color, size}) => (
                  <Icon name="calculator-outline" color={color} size={size} />
                )}
                inactiveTintColor={'#004581'}
                label="Nueva Ticket"
                onPress={() => {
                  props.navigation.navigate('MainTicket');
                }}
              />
              <DrawerItem
                icon={({color, size}) => (
                  <Icon name="trophy-outline" color={color} size={size} />
                )}
                inactiveTintColor={'#004581'}
                label="Premios"
                onPress={() => {
                  props.navigation.navigate('Premios');
                }}
              />

              <DrawerItem
                icon={({color, size}) => (
                  <Icon
                    name="document-text-outline"
                    color={color}
                    size={size}
                  />
                )}
                inactiveTintColor={'#004581'}
                label="Ventas"
                onPress={() => {
                  props.navigation.navigate('Ventas');
                }}
              />
              <DrawerItem
                icon={({color, size}) => (
                  <Icon name="cash-outline" color={color} size={size} />
                )}
                inactiveTintColor={'#004581'}
                label="Ganadores"
                onPress={() => {
                  props.navigation.navigate('Ganador');
                }}
              />

              {rol === 'usuario' ? null : (
                <>
                  <DrawerItem
                    icon={({color, size}) => (
                      <Icon name="folder-outline" color={color} size={size} />
                    )}
                    inactiveTintColor={'#004581'}
                    label="Reportes"
                    onPress={() => {
                      props.navigation.navigate('Reporte');
                    }}
                  />
                  <DrawerItem
                    icon={({color, size}) => (
                      <Icon name="settings-outline" color={color} size={size} />
                    )}
                    inactiveTintColor={'#004581'}
                    label="Ajustes"
                    options={{headerShown: false}}
                    onPress={() => {
                      props.navigation.navigate('Ajustes');
                    }}
                  />
                </>
              )}

              <DrawerItem
                icon={({color, size}) => (
                  <Icon name="help-circle-outline" color={color} size={size} />
                )}
                inactiveTintColor={'#004581'}
                label="Acerca de"
                onPress={() => {
                  props.navigation.navigate('Acerca');
                }}
              />
            </Drawer.Section>
          </View>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="log-in-outline" color={color} size={size} />
          )}
          inactiveTintColor={'#004581'}
          label="Cerrar Sesion"
          onPress={async () => {
            await auth()
              .signOut()
              .then(() => {
                  props.CLEAN_TICKET();
                  props.CLEAN_USER();
              })
              .catch((err) => {});
          }}
        />
      </Drawer.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 5,
    lineHeight: 20,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  image: {
    width: 230,
    height: 39,
  },
});

export default connect(mapStateToProps, null)(NavigatorDrawer);
