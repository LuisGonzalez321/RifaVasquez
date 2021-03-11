import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import MainTicket from '../screen/MainTicket';
import TotalVenta from '../screen/TotalVenta';

const Tab = createMaterialBottomTabNavigator();

const TabTicketNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="MainTicket"
      activeColor="white"
      barStyle={{backgroundColor: '#018abd'}}>
      <Tab.Screen
        name="MainTicket"
        component={MainTicket}
        options={{
          tabBarLabel: 'Ticket',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="ticket-confirmation"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="TotalVenta"
        component={TotalVenta}
        options={{
          tabBarLabel: 'Total Venta',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="library" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabTicketNavigation;
