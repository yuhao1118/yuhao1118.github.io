---
typora-root-url: ../react
typora-copy-images-to: ../react
---

# React 源码学习-理念篇

## React15架构

React15架构可以分为两层：

- `Reconciler`（协调器）—— 负责找出变化的组件
- `Renderer`（渲染器）—— 负责将变化的组件渲染到页面上

### Reconciler

在React15中，`Reconciler`的更新是同步的操作。这也就意味着这样的更新流程一旦开始，就无法打断，直至更新完成。当更新层级很深，或是更新内容过多导致更新时间超过16ms（一帧时间），那么就会出现可察觉的卡顿。

![更新流程](./v15.png)

这个例子说明了React15中，`Reconciler`和`Renderer`是**交替**运行的。假使我们强行中断了`Reconciler`的操作，就会出现渲染不完全的问题。

### Renderer

`React`自身是跨平台的Library。在不同平台上，React有不同的`Renderer`实现。我们比较熟悉的`Renderer`有：

- [ReactDOM](https://www.npmjs.com/package/react-dom) -- 负责在浏览器中渲染DOM组件
- [ReactNative](https://www.npmjs.com/package/react-native) -- 负责在Android, iOS等平台渲染原生组件

## React16新架构

React16架构可以分为三层：

- `Scheduler`（调度器）—— 调度任务的优先级，高优任务优先进入**Reconciler**
- `Reconciler`（协调器）—— 负责找出变化的组件
- `Renderer`（渲染器）—— 负责将变化的组件渲染到页面上

相较于React15，React16中新增了`Scheduler`，同时针对`Reconciler`也进行了比较大的改动，以便**异步可中断**的更新组件。

### Scheduler

既然我们以浏览器是否有剩余时间作为任务中断的标准，那么我们需要一种机制，当浏览器有剩余时间时通知我们。

其实部分浏览器已经实现了这个API，这就是[requestIdleCallback](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestIdleCallback)。但是由于以下因素，`React`放弃使用：

- 浏览器兼容性
- 触发频率不稳定，受很多因素影响。比如当我们的浏览器切换tab后，之前tab注册的`requestIdleCallback`触发的频率会变得很低

基于以上原因，`React`实现了功能更完备的`requestIdleCallback`polyfill，这就是`Scheduler`。除了在空闲时触发回调的功能外，`Scheduler`还提供了多种调度优先级供任务设置。

> [`Scheduler`](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/scheduler/README.md)是独立于`React`的库

### Reconciler

我们知道，在React15中`Reconciler`是递归处理虚拟DOM (Fiber) 的。每次循环都会调用`shouldYield`判断当前是否有剩余时间。

```js
/** @noinline */
function workLoopConcurrent() {
  // Perform work until Scheduler asks us to yield
  while (workInProgress !== null && !shouldYield()) {
    workInProgress = performUnitOfWork(workInProgress);
  }
}
```

由于异步可中断的设计，在React16中，`Reconciler`与`Renderer`不再是交替工作，因而可以解决更新渲染不完全的问题。当`Scheduler`将任务交给`Reconciler`后，`Reconciler`会为变化的虚拟DOM打上代表增/删/更新的标记，类似这样：

```js
export const Placement = /*             */ 0b0000000000010;
export const Update = /*                */ 0b0000000000100;
export const PlacementAndUpdate = /*    */ 0b0000000000110;
export const Deletion = /*              */ 0b0000000001000;
```

### Renderer

其实Renderer的实现我们一般不太关心，这是因为其功能和平台环境密切相关。比如ReactDom里就实现了大量浏览器相关的Dom操作（以及一些兼容性处理）。

![更新流程](./process.png)

其中红框中的步骤随时可能由于以下原因被中断：

- 有其他更高优任务需要先更新
- 当前帧没有剩余时间

`Scheduler`和`Reconciler`的所有操作都在内存中进行，因而在任何一步被打断时，都不会改变页面上的渲染结果。换句话说，到渲染阶段`Renderer`拿到的Dom树（实际上就是Fiber树）已经是确定的。
