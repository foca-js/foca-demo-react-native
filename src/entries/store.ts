import { Middleware, store } from 'foca';
import { createLogger } from 'redux-logger';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { counterModel } from '../models/counterModel';
import { npmMarkModel } from '../models/npmMarkModel';

const middleware: Middleware[] = [];

if (process.env.NODE_ENV !== 'production') {
  middleware.push(
    // 使用控制台可查看redux日志
    createLogger({
      collapsed: true,
      diff: true,
      duration: true,
      logErrors: true,
    }),
  );
}

store.init({
  middleware,
  // 需要安装软件 react-native-debugger 代替浏览器的debugger能看到日志
  // https://github.com/jhen0409/react-native-debugger
  compose: 'redux-devtools',
  persist: [
    {
      key: 'rn_foca_demo',
      version: 1,
      engine: AsyncStorage,
      models: [counterModel, npmMarkModel],
    },
  ],
});
