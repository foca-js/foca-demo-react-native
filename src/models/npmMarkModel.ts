import { defineModel } from 'foca';

const initialState: string[] = [];

export const npmMarkModel = defineModel('npmMarks', {
  initialState,
  effects: {
    // 私有方法，只能在内部使用。类型提示安全，运行时安全。
    async _sleep() {
      return new Promise((resolve) => {
        setTimeout(resolve, 200);
      });
    },
    async toggle(pkg: string, tag: string) {
      await this._sleep();

      this.setState((state) => {
        const key = this.combineKey(pkg, tag);

        if (state.includes(key)) {
          return state.filter((item) => item !== key);
        }

        return void state.push(key);
      });
    },
    combineKey(pkg: string, tag: string) {
      return `${pkg}|${tag}`;
    },
  },
  skipRefresh: true,
  persist: {
    version: 1,
  },
});
