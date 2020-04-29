// outsource dependencies
import React, {memo} from 'react';
import {Provider} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

// local dependencies
import store from './store';
import Home from './screens/Home';
import Index from './screens/Filter';
import {ROUTES} from './constans/routes';


const Stack = createStackNavigator();

const NavigationMiddleware = memo(() => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName={ROUTES.DRINKS} screenOptions={{gestureEnabled: true}}>
      <Stack.Screen name={ROUTES.DRINKS} component={Home} />
      <Stack.Screen name={ROUTES.FILTERS} component={Index} />
    </Stack.Navigator>
  </NavigationContainer>
));

const App = memo(() => (
  <Provider store={store}>
    <NavigationMiddleware />
  </Provider>
));

export default App;
