import React, {useEffect} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Acerca from '../screen/Acerca';
import AjustesNavigation from './AjustesNavigation';

import MainPrincipal from '../screen/MainPrincipal';
import TabTicketNavigation from './TabTicketNavigation';
import Ventas from '../screen/Ventas';
import Premios from '../screen/Premios';
import Reporte from '../screen/Reporte';
import TotalVenta from '../screen/TotalVenta';
import Ganador from '../screen/Ganador';

import NavigatorDrawer from './NavigatorDrawer';

const Drawer = createDrawerNavigator();

const NavigateMain = () => {

  useEffect(()=>{

  },[])

  return (
    <Drawer.Navigator
      initialRouteName="MainPrincipal"
      drawerContent={(props) => <NavigatorDrawer {...props} />}>
      <Drawer.Screen name="Acerca" component={Acerca} />
      <Drawer.Screen name="Ajustes" component={AjustesNavigation} />
      <Drawer.Screen name="MainPrincipal" component={MainPrincipal} />
      <Drawer.Screen name="MainTicket" component={TabTicketNavigation} />
      <Drawer.Screen name="Ventas" component={Ventas} />
      <Drawer.Screen name="Ganador" component={Ganador} />
      <Drawer.Screen name="Premios" component={Premios} />
      <Drawer.Screen name="Reporte" component={Reporte} />
      <Drawer.Screen name="TotalVenta" component={TotalVenta} />
    </Drawer.Navigator>
  );
};

export default NavigateMain;
