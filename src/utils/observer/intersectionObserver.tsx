class UseIntersectionObserver {
  // 观察者
  private observer: IntersectionObserver;
  // 监听列表
  private observe = new WeakMap<Element, Function[]>();

  constructor(options: IntersectionObserverInit = {}) {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // 遍历对应的监听列表进行调用
        this.observe.get(entry.target)?.forEach((fn) => {
          fn && fn();
        });
      });
    }, options);
  }

  // 添加监听对象
  addIntersect(el: Element, fn: Function) {
    const fnList = this.observe.get(el) ?? [];
    this.observe.set(el, [...fnList, fn]);
    // 如果监听列表为空时开始监听
    if (fnList.length == 0) this.observer.observe(el);
  }

  // 移除监听对象
  removeIntersect(el: Element, removeFn: Function) {
    const fnList = this.observe.get(el) ?? [];
    const index = fnList.findIndex((fn) => fn == removeFn);
    fnList.splice(index, 1);
    // 当监听列表为空时取消监听
    if (fnList.length == 0) {
      this.observer.unobserve(el);
      console.log(el, "取消监听成功");
    }
  }

  // 销毁全部
  destory() {
    this.observer.disconnect();
  }
}

const intersectionObserver = new UseIntersectionObserver();

export { UseIntersectionObserver, intersectionObserver };
