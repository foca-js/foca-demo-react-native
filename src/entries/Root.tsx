import './store';

import React, { FC, memo } from 'react';
import { Text, View } from 'react-native';
import { FocaProvider } from 'foca';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import counter from '../pages/counter';
import npm from '../pages/npm';

const Tab = createBottomTabNavigator();

const Root: FC = () => {
  return (
    <FocaProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="计数器" options={{}} component={counter} />
          <Tab.Screen name="搜索npm" component={npm} />
        </Tab.Navigator>
      </NavigationContainer>
    </FocaProvider>
  );
};

export default memo(Root);
