class useResizeObserver {
  // 观察者
  private observer: ResizeObserver;
  // 监听列表
  private observe = new WeakMap<Element, Function[]>();

  constructor() {
    this.observer = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        // 遍历对应的监听列表进行调用
        this.observe.get(entry.target)?.forEach((fn) => {
          fn && fn();
        });
      });
    });
  }

  // 添加监听对象
  addResize(el: Element, fn: Function) {
    const fnList = this.observe.get(el) ?? [];
    this.observe.set(el, [...fnList, fn]);
    // 如果监听列表为空时开始监听
    if (fnList.length == 0) this.observer.observe(el);
  }

  // 移除监听对象
  removeResize(el: Element, removeFn: Function) {
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

const resizeObserver = new useResizeObserver();

export default resizeObserver;
