import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Contacts from './screens/Contacts';
import Profile from './screens/Profile';
import Favorites from './screens/Favorites';
import User from './screens/User';
import Options from './screens/Options';
import { Ionicons } from '@expo/vector-icons';
import colors from './utils/colors';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

const getTabBarIcon = (icon) => ({ color }) => (
  <Ionicons name={icon} size={26} color={color} />
);

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const Drawer = createDrawerNavigator();

const ContactsScreens = () => {
  return (
    <Stack.Navigator
      initialRouteName="Contacts"
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: 'tomato' },
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen name="Contacts" component={Contacts} options={{ title: 'Contacts' }} />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={({ route }) => {
          const { contact } = route.params;
          const { name } = contact;
          return {
            title: name.split(' ')[0],
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: colors.blue,
            },
          };
        }}
      />
    </Stack.Navigator>
  );
};

const FavoritesScreens = () => {
  return (
    <Stack.Navigator initialRouteName="Favorites">
      <Stack.Screen name="Favorites" component={Favorites} options={{ title: 'Favorites' }} />
      <Stack.Screen name="Profile" component={Profile} options={{ title: 'Profile' }} />
    </Stack.Navigator>
  );
};

const UserScreens = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="User">
      <Stack.Screen
        name="User"
        component={User}
        options={{
          headerTitle: 'Me',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: colors.blue,
          },
          headerRight: () => (
            <Ionicons
              name="settings"
              size={24}
              style={{ color: 'white', marginRight: 10 }}
              onPress={() => navigation.navigate('Options')}
            />
          ),
        }}
      />
      <Stack.Screen name="Options" component={Options} options={{ title: 'Options' }} />
    </Stack.Navigator>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Contacts">
      <Drawer.Screen name="Contacts" component={ContactsScreens} />
      <Drawer.Screen name="Favorites" component={FavoritesScreens} />
      <Drawer.Screen name="Me" component={UserScreens} />
    </Drawer.Navigator>
  );
};


const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Contacts') {
            iconName = 'list';
          } else if (route.name === 'Favorites') {
            iconName = 'star';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.blue,
        tabBarInactiveTintColor: colors.greyDark,
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarStyle: {
          backgroundColor: 'white',
        },
      })}
    >
      <Tab.Screen name="Contacts" component={ContactsScreens} />
      <Tab.Screen name="Favorites" component={FavoritesScreens} />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
};

export default App;
