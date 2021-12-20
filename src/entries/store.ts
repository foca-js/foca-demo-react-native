import { Middleware, store } from 'foca';
import { createLogger } from 'redux-logger';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { counterModel } from '../models/counterModel';
import { npmMarkModel } from '../models/npmMarkModel';

const middleware: Middleware[] = [];

if (process.env.NODE_ENV !== 'production') {
  middleware.push(
    // 使用chrome控制台可查看redux日志
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
  // 需要安装chrome插件才能看到日志
  // https://github.com/zalmoxisus/redux-devtools-extension
  compose: process.env.NODE_ENV === 'production' ? void 0 : 'redux-devtools',
  persist: [
    {
      key: 'rn_foca_demo',
      version: 1,
      engine: AsyncStorage,
      models: [counterModel, npmMarkModel],
    },
  ],
});
