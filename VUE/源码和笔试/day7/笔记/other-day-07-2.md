# Promise经典面试题

## 题目1

```js
const promise = new Promise((resolve, reject) => {
    console.log(1)
    resolve()
    console.log(2)
})
promise.then(() => {
    console.log(3)
})
console.log(4)
```

记住 new Promise 里的参数函数，是同步被执行的，故而先输出 1，2.

resolve 后还需要等待进入下一个事件循环。then 把参数函数推入微任务队列，并不直接执行。

输出 4，接着事件循环进入下一轮，输出 3.

```
1
2
4
3
```

## 题目2

来自网易。给出一个 promise

```js
var promise = new Promise(function(resolve, reject){
  setTimeout(function() {
    resolve(1);
  }, 3000)
})
```

请问这三种有何不同？

```js
// 1
promise.then(() => {
  return Promise.resolve(2);
}).then((n) => {
  console.log(n)
});

// 2
promise.then(() => {
  return 2
}).then((n) => {
  console.log(n)
});

// 3
promise.then(2).then((n) => {
  console.log(n)
});
```

1. 输出2。Promise.resolve 就是一个 Promise 对象就相当于返回了一个新的 Promise 对象。然后在下一个事件循环里才会去执行 then
2. 输出2。和上一点不一样的是，它不用等下一个事件循环。
3. 输出1。then 和 catch 期望接收函数做参数，如果非函数就会发生 Promise 穿透现象，打印的是上一个 Promise 的返回。

## 题目3

来自快手的变态题目，好讨厌。得配合事件循环机制来看

```js
let a;
const b = new Promise((resolve, reject) => {
  console.log('promise1');
  resolve();
}).then(() => {
  console.log('promise2');
}).then(() => {
  console.log('promise3');
}).then(() => {
  console.log('promise4');
});

a = new Promise(async (resolve, reject) => {
  console.log(a);
  await b;
  console.log(a);
  console.log('after1');
  await a
  resolve(true);
  console.log('after2');
});

console.log('end');
```

我直到现在也没有想明白其中的一步，先贴答案

```
promise1
undefined
end
promise2
promise3
promise4
Promise { pending }
after1
```

第一个输出 promise1，是因为 Promise 里的方法立即执行。接着调用 resolve，只不过 then 里的方法等下一个周期

第二个输出 undefined，是因为立即执行执行 a 内部的方法，先 console.log(a)，但此时的 a 还没赋值给左边的变量，所以只能是 undefined。然后 await b 就得等下一个周期执行了。

第三个输出 end，自然不意外。

接着输出 promise2，promise3，promise4，是因为 await b 等待他执行完了，才轮到 a 内部继续执行。

输出 Promise { pending }，脑筋转了以下才想通，事件都进入了循环了，a 肯定已经被赋值成了 Promise 对象。所以第二遍 console.log(a)，自然就输出这个了。

输出 after1 不奇怪。

但是随后的 await a 是个什么奇怪的操作，想半天没搞懂为何最后不输出 after2，调试得知根本就执行不到 await a 以后的代码上，想不懂。

**更新**：和不少朋友交流后，我得出了结论，await a 时，a 是必须等待 Promise 的状态从 pending 到 fullfilled 才会继续往下执行，可 a 的状态是一直得不到更改的，所以无法执行下面的逻辑。只要在 await a 上面加一行 resolve() 就能让后面的 after 2 得到输出。

## 题目4

```js
const promise = new Promise((resolve, reject) => {
  resolve('success1');
  reject('error');
  resolve('success2');
});

promise
  .then((res) => {
    console.log('then: ', res);
  })
  .catch((err) => {
    console.log('catch: ', err);
  });
```

简单题，牢牢记住 Promise 对象的状态只能被转移一次，resolve('success1') 时状态转移到了 fullfilled 。后面 reject 就调用无效了，因为状态已经不是 pending。

## 题目5

```js
Promise.resolve()
  .then(() => {
    return new Error('error!!!')
  })
  .then((res) => {
    console.log('then: ', res)
  })
  .catch((err) => {
    console.log('catch: ', err)
  })
```

没有抛出错误和异常，只是 return 了一个对象，哪怕他是 Error 对象，那自然也是正常走 then 的链式调用下去了，不会触发 catch。

# 二、手写 Promise

参考[other-day-07-0.md]()

# 三、怎么取消掉 Promise

给你一个 promise，但是希望取消掉它。

```js
let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(123);
  }, 1000);
});
```

axios 倒是有 abort 方法，但面试里你肯定不得用。

promise 其实缺陷就是无法得知执行到了哪儿，也无法取消，只能被动的等 resolve 或者 reject 执行或者抛错。所以思路就是外部包裹一层 Promise，并对外提供 abort 方法，这个 abort 方法可以用来 reject 内部的 Promise 对象。

```js
function wrap(p) {
  let resol = null;
  let abort = null;

  let p1 = new Promise((resolve, reject) => {
    resol = resolve;
    abort = reject;
  });

  p1.abort = abort;
  p.then(resol, abort);

  return p1;
}

let newPromise = wrap(promise);

newPromise.then(res => console.log)
newPromise.abort()
```

# 四、顺序输出

不使用 async/await，给你若干个 promise 对象，你怎么保证它是顺序执行的？

```js
var makePromise = function(value, time) {
  return new Promise(function(resolve, reject){
    setTimeout(function() {
      resolve(value);
    }, time)
  })
};

function order(promises) {
}

order([
  makePromise('a', 3000),
  makePromise('b', 5000),
  makePromise('c', 2000),
]);
```

思路是 then 里返回下一个

```js
function order(promises) {
  let dataArr = []
  let promise = Promise.resolve();
  for (let i = 0; i < promises.length; i++) {
    promise = promise.then((data) => {
      if (data) {
        dataArr.push(data);
        console.log(data);
      }
      return promises[i];
    });
  }
  return promise.then(data => {
    console.log(data);
  })
}
```

其实这么做有个问题，数组里的 promise 三项其实还是并发的，只不过输出的顺序的确符合期望，但是间隔的时间会比较奇怪，3s 后输出 a，再间隔 2s 连着输出了 b 和 c。

要想让间隔时间也完全符合串行的话，那么还是在 then 里制造下一个 Promise 对象并返回吧。

# 五、并发做异步请求，限制频率

举个例子，有 8 张图片 url，你需要并发去获取它，并且任何时刻同时请求的数量不超过 3 个。也就是说第 4 张图片一定是等前面那一批有一个请求完毕了才能开始，以此类推。

```js
var urls = [
  'https://www.kkkk1000.com/images/getImgData/getImgDatadata.jpg',
  'https://www.kkkk1000.com/images/getImgData/gray.gif',
  'https://www.kkkk1000.com/images/getImgData/Particle.gif',
  'https://www.kkkk1000.com/images/getImgData/arithmetic.png',
  'https://www.kkkk1000.com/images/getImgData/arithmetic2.gif',
  'https://www.kkkk1000.com/images/getImgData/getImgDataError.jpg',
  'https://www.kkkk1000.com/images/getImgData/arithmetic.gif',
  'https://www.kkkk1000.com/images/wxQrCode2.png',
];

function loadImg(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      console.log('一张图片加载完成', url);
      resolve();
    };
    img.onerror = reject;
    img.src = url;
  });
}

function limitload(urls, limit) {
  
}


limitload(urls, 2);
```

解法就是前 3 个放入一个外部的 promise 里同时进行，then 方法指定去请求后面的图片。

```js
function limitload(urls, limit) {
  let index = limit;
  function execNewPromise() {
    index += 1;
    if (index < urls.length) {
      return loadImg(urls[index]).then(() => execNewPromise());
    }
    
  }
  var promise = Promise.resolve();
  promise.then(() => {
    for (let i = 0; i < limit; i++) {
      loadImg(urls[i]).then(() => execNewPromise());  
    }
  });
  
}
```

使用Promise.all实现

```js
var urls = [
        "https://www.kkkk1000.com/images/getImgData/getImgDatadata.jpg",
        "https://www.kkkk1000.com/images/getImgData/gray.gif",
        "https://www.kkkk1000.com/images/getImgData/Particle.gif",
        "https://www.kkkk1000.com/images/getImgData/arithmetic.png",
        "https://www.kkkk1000.com/images/getImgData/arithmetic2.gif",
        "https://www.kkkk1000.com/images/getImgData/getImgDataError.jpg",
        "https://www.kkkk1000.com/images/getImgData/arithmetic.gif",
        "https://www.kkkk1000.com/images/wxQrCode2.png",
      ];

      function loadImg(url) {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => {
            console.log("一张图片加载完成", url);
            resolve(url);
          };
          img.onerror = reject;
          img.src = url;
        });
      }
      
      function limitload(urls, limit) {
        //当传入的urls数组的长度>0就执行下面的逻辑
        if(urls.length>0){
          //从传入的默认数组中取limit个
          let nextUrls = []
          let loadUrls = urls.filter((item,index) => {
            if(index<=limit-1){
              return true
            }else{
              nextUrls.push(item)
              return false
            }
          })
          //通过promise.all来等待这几个图片加载完成
          let loadUrlsNew = loadUrls.map(item => {
            return loadImg(item)
          })
          
          
          Promise.all(loadUrlsNew).then(res => {
            console.log(res)
            console.log('加载了'+loadUrls.length+'个图片')
            //将剩下的数组和limit传入此函数递归调用
            limitload(nextUrls,limit)
          })
        } 
      }
      limitload(urls, 3);
```

