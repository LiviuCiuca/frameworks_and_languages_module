**Technical Report**
================



**Server Framework Features**
-------------------------

### Middleware Support

For the purpose of providing functionality and performing data checks, middleware enables the addition of pre- and post-processing to requests and responses, it essentially wraps around existing code.

```Typescript
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //enables cors
  app.enableCors({
    methods: ['GET','POST','DELETE']
});
}
bootstrap();
```
Its benefits are checks and balances,authorising requests, applying middleware to different parts of code results in less written code.

A problem when creating a custom middleware in NestJs possibly in expressJS too, that the current middleware function must call next() in order to transfer control to the following middleware function, if it does not stop the request-response cycle within 1.5 seconds. If not, the request will be stuck in a loop for a maximum of 30 seconds, resulting in a time out

<!-- <img src="https://user-images.githubusercontent.com/78021925/203947251-ae41b37c-9611-4750-9db2-3775c408f522.PNG" alt="Still_Processing_middleware" width="800" height="250" /> -->
Referances:
- [NestJs middleware](https://docs.nestjs.com/middleware#middleware)
- [code snippet](https://github.com/LiviuCiuca/frameworks_and_languages_module/blob/main/server/src/main.ts)
- [request run time, maximum time](https://www.smashingmagazine.com/2022/04/next-js-middleware-feature/)

### Pipes/Validation
Before a method is called, Nest inserts the desired pipe that takes the arguments intended for the method and performs operations on them. typically these operations are:
- Validation: inspects input data, determine whether it is valid, and if so, pass it to the method unchanged; if not, throw an exception if the data is unreliable.
- Transformation: transform input data to the desired form, or throws an exception if the conversion fails. (example below, from string to integer)

```Typescript
 @Get('/item/:id')
 //ParseIntPipe --> built in pipe that transforms "id" then runs the controller --> piping is a middleware feature
    findItemByID(@Param('id', ParseIntPipe) id : number):Items_Interface{
      return this.ItemsService.findItemsById(Number(id));
    }
```

```Typescript
 @Post('/item')
 //using UsePipes --> is a custom pipe, see <details> for context
    @UsePipes(ValidationPipe)
    createItem(@Body() Create_Item: ItemClassDto ):Items_Interface{
      return this.ItemsService.CreateItem(Create_Item);
    }
```

Pipes are a benefit usually, but in my case i have a problem, which is : Pipes run inside the exceptions zone, meaning that when a Pipe throws an exception it is handled by the exceptions layer, as a result no controller method is performed(Details bellow).

<details>

```Typescript
 @Post('/item')
 //using UsePipes --> is a custom pipe
    @UsePipes(ValidationPipe)
    createItem(@Body() Create_Item: ItemClassDto ):Items_Interface{
      return this.ItemsService.CreateItem(Create_Item);
    }
```
removing @UsePipe(ValidationPipe) passes the ✅test_POST_405

```Typescript
 CreateItem(Create_ItemClassDto : ItemClassDto):Items_Interface{
        //distracting the dto object
        const{user_id,keywords,description,image,lat,lon} = Create_ItemClassDto;
        const temClassDto : Items_Interface = {
        id : this.auto_Id(),
        user_id,
        keywords,
        description,
        image,
        lat,
        lon,
        date_from: this.iso_date(),
    };
    // if the object.lon is NaN then return 405 status code
    // if not empty push the new item to array  
        if(isNaN(temClassDto.lon)){
            throw new MethodNotAllowedException();
        }
            this.items.push(temClassDto)
            return temClassDto;
    }
```

```Typescript
//implementation of ValidationPipe
import {  IsNotEmpty, IsString } from "class-validator";
//https://docs.nestjs.com/techniques/validation
//added validation
export class ItemClassDto
 {
  @IsNumberString()
  id:number;

  @IsString()
  @IsNotEmpty()
  user_id: string;
  .
  .
  .
 }
```
## Output
image when gitpot works
</details>

Piping provides a best-practice method for validating data from external sources at the system border, which is one advantage of adopting it.
Referances:
- [NestJS Pipes](https://docs.nestjs.com/pipes)
- [code snippets-item_controller](https://github.com/LiviuCiuca/frameworks_and_languages_module/blob/main/server/src/items/items.controller.ts)
- [-item_DTO](https://github.com/LiviuCiuca/frameworks_and_languages_module/blob/main/server/src/items/ClassDTO/itemsClass.dto.ts)
- [-item_service](https://github.com/LiviuCiuca/frameworks_and_languages_module/blob/main/server/src/items/items.service.ts)



### Custom route decorators
##### The **similarities** between JavaScript and Python continue to increase over time 

A Python decorator is a function that accepts another function and modifies the latter function's behavior without changing the original functionality.<br/>
 A decorator is an expression that accepts three arguments: a target, a name, and a property descriptor, returning a function. We recognize it by the prefix **"@"** present at the top of the functions in our code.

##### Pthyton Decorator example
<img src ="https://miro.medium.com/max/640/1*Np2xWAiiQmq9LfwOquDOuQ.webp" alt="Python-decorator" width="300" height="250" />

##### NestJs Decorator examples
```Typescript
@Controller('')
export class ItemsController 
...
  @Get('')
    firstPage(){}
...
  @Delete('/item/:id')
    removeItemById(@Param('id',ParseIntPipe) id: number):void{}
...
```

Decorators come very handy for anything you wish to add extra functionality. These include logging, timing operations, imposing access control and authentication, also NestJS provides a set of useful param decorators that you can use together with the HTTP route handlers(see code snipets).<br/>
Everything that we can do with decorators we can do with plain JS, developers have different opinions about using decorators,as they should increse flexibility and recomposability, but in practice this dosen`t happen with decorators. They can make it hard to debug code, because they can change the way a function or class is called or executed, and can add additional layers of indirection and abstraction. This can make it difficult to track down errors or issues, and can hinder the use of debugging tools and techniques.<br/>
Referances:
- [NestJS decorator](https://docs.nestjs.com/custom-decorators)
- [Different opinions](https://www.reddit.com/r/typescript/comments/w772vv/is_anyone_against_using_decorators/)
- [Code snipets](https://github.com/LiviuCiuca/frameworks_and_languages_module/blob/main/server/src/items/items.controller.ts)



**Server Language Features**
-----------------------

A typed superset of JavaScript, TypeScript compiles to standard JavaScript. It provides classes, modules, and interfaces to aid in the development of durable components.

### Typescript --> **IntelliSense**

To help create code more quickly and accurately, IntelliSense provides you with intelligent code completion, hover information, and signature assistance. As we type intelliSense gives a pop up, where if by continuing typing characters, the list of members (variables, methods, etc.) is filtered to only include members containing the typed characters. 

<img src="https://user-images.githubusercontent.com/37383113/177110097-54ebdb00-1a7a-48f2-abf0-8a0a8215b42b.png" alt="intelliSense" width="300" height="250" />

This feature is a massive help to our productivity, bug prevention, although in some cases it could hinder the developer`s speed by suggesting the wrong snippet, or in the case below not suggesting anything.

```Typescript
interface IObject {
  foo: string;
  bar: number;
}
type A = Pick<IObject, "suggestion_snippet_here">; // works
interface S extends Pick<IObject, "____"> {} // is not suggesting anything
```  
Referances:
- [Code snippet, and img](https://github.com/microsoft/TypeScript/issues/49786)
- [IntelliSense ](https://code.visualstudio.com/docs/languages/typescript#_intellisense)


### Error handling 
In typescript the error handling strategy is the syntax-based *try/catch* method, that allowes the program to deviate from its intended course in the event of an error.
The try/catch syntax-based error management method offered by Typescript enables programmers to deviate from the program's intended course in the event of mistakes.

```Typescript
try {
  try {
    throw new Error("oops");
  } finally {
    console.log("finally");
  }
} catch (ex) {
  console.error("outer", ex.message);
}

// Logs:
// "finally"
// "outer" "oops"
```
Problems with this approch are:
- unexpected errors "can travel" until the catch block, where in some cases can crash the application.
- errors can cause side effects, they are not part of the return value of the function, and can affect other functions.
- every function can potentially throw errors, and its hard to debug generalised errors.
Referances:
[Code snipet](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch)

**Client Framework Features**
-------------------------

### Conditional Rendering

Conditional rendering in React refers to the practice of only rendering components or elements if certain conditions are met. This can be useful for showing or hiding content based on user input, data from an API, or other factors. There are several ways to implement conditional rendering in React, depending on the specific use case and requirements. Here are some examples:<br/>
```JavaScript
//We can use the if statement to check for a condition and render a component or element only if the condition is true.
import React from "react";

const MyComponent = (props) => {
  if (props.show) {
    return <div>This will be shown if props.show is true</div>;
  }
  return null;
};

import React from "react";

//the && operator to conditionally render a component or element based on a boolean expression.
const MyComponent = (props) => {
  return props.show && <div>This will be shown if props.show is true</div>;
};
 there is also the *ternary* operator and switch statement, tehniques
```
We can use these techniques, or combine them, to create components that are dynamic and flexible, and that can adapt to different conditions and inputs.<br/>
Conditional rendering can create subtle bugs or edge cases that are difficult to detect and diagnose, due to the complex interactions and dependencies between different components and conditions.<br/>
Referances:
- [react-conditional-doc](https://reactjs.org/docs/conditional-rendering.html)


### Lifecycle methods
Functions called at particular times during a component's lifespan are known as lifecycle methods. With the help of these methods, you can run code at various times throughout a component's lifecycle, such as when it is first formed or just before it is destroyed.<br/>
Examples:<br/>
componentDidMount: This is called after the component has been rendered to the DOM. This is a good place to instantiate the network request.
```JavaScript
componentDidMount() {
        Axios.get('/api/user/name')
        .then(response => {
            this.setState({ name: response.data.name })
        })
    }
```
shouldComponentUpdate: This is called before the component is re-rendered, is not called for the initial render.
```JavaScript
componentDidUpdate(prevProps) {
  // Typical usage (don't forget to compare props):
  if (this.props.userID !== prevProps.userID) {
    this.fetchData(this.props.userID);
  }
}
```
componentWillUnmount: This is called just before the component is destroyed and removed from the DOM. typicaly used to perform any necessary cleanup.<br/>

In some cases, the lifecycle methods provided by React may not offer the flexibility we need to implement certain features or behaviors.
Some lifecycle methods have been deprecated in favor of new methods, an example is the useEffect it can replace the componentDidMount, componentDidUpdate, and componentWillUnmount combined.<br/>
Overall, while there are potential downsides to using lifecycle methods, they can be a powerful tool for managing the state and behavior of a React component and can help to improve the structure, performance, and maintainability of your code.<br/>

Referances:
- [componentDidMount code](https://stackoverflow.blog/2021/10/20/why-hooks-are-the-best-thing-to-happen-to-react/)
- [react doc](https://reactjs.org/docs/react-component.html#componentdidmount)

### HOOKS

React state and lifecycle aspects can be "hooked onto" from function component code via hooks. Hooks replace the use of classes therefore they are not functional inside classes, beacause they are using composition instead of ingeritance, relying on functions.<br/>
Theres multiple hooks, each with different, specific functionality and use case:
- Basic Hooks
- - useState
- - useEffect
- - useContext
- Additional Hooks
- - useReducer
- - useCallback
- - useMemo
...
- Library Hooks
- - useSyncExternalStore
- - useInsertionEffect
```JavaScript
const [state, setState] = useState(initialState); //Returns a stateful value, and a function to update it.
//initial render => state = initial state
setState(newState); //setState function is used to update the state. It accepts a new state value and enqueues a re-render of the component.
```
Hooks were introduced in [React Conf 2018](https://www.youtube.com/watch?v=dpw9EHDh2bM) by Sophie Alpert to address common issues facing developers today, including:
hooks come to solve these nowadays problems are:
- - Wrapper hell (caused by design patterns: HOC, render prop, drilling prop)
- - Huge components (that are hard to test and maintain, hard to co-locate code)
- - Confusing classes (this keyword, hard to make it reusable)
Additional benefits:
- *backwards-compatible*
- *opt-in*, meaning we can try Hooks in a few components without rewriting any existing code, but to optimise it, we must rewrite code.<br/>
<br/>
Referances:
- [React-Hooks, code snipet](https://reactjs.org/docs/hooks-intro.html)
- [React Conf 2018](https://www.youtube.com/watch?v=dpw9EHDh2bM)

**Client Language Features**
------------------------

### JSX

It stands for JavaScript Syntax eXtension,. It is a add-on that enables us to define the object tree of React using syntax akin to an HTML template, rather than having to use React's JavaScript-based syntax for creating elements.

```JSX
import React from 'react'
function Greet(){
  return <h1>Hello World!</h1>
}

...
results into 

import React from 'react'
function Greet() {
  return React.createElement("h1", {}, "Hello, World!")
}
```
One problem that Jsx is solving is making the developement and debugging process easier and can make the code more readable and clean., being an add-on is not a necessity to use JSX.<br/>
A possible limitation would be that developers and designers complain about complications in learning JSX and the consequent hard learning curve.

<img src="https://media.geeksforgeeks.org/wp-content/uploads/20220204143529/react-300x274.jpg" alt="Generalised-limitation" width=300px height=250px /><br/>
Referances:
- [JSX-doc](https://www.typescriptlang.org/docs/handbook/jsx.html)
- [Code snipet](https://www.telerik.com/blogs/how-jsx-react-works-under-hood)
- [Possible limitation, img](https://www.geeksforgeeks.org/what-are-the-limitations-of-react-js/)


### Modules-Typescript

A module is a way to organize and group related code together. Modules can contain variables, functions, and classes, and can be exported and imported by other modules.<br/>
There are two main ways to use modules in TypeScript:
- External modules: External modules are used to organize code that is intended to be consumed by other programs or libraries. They are defined in separate files and are imported using the import keyword.
- Internal modules: Internal modules are a way to organize code within a single file. They are defined using the namespace keyword and are useful for organizing code within a larger file or for creating a logical separation between different parts of your code.

```Typescript
// math.ts

export function add(x: number, y: number): number {
  return x + y;
}

export function subtract(x: number, y: number): number {
  return x - y;
}
```
example of how we can import the functions from the math module in another file:
```Typescript
// main.ts

import { add, subtract } from "./math";

console.log(add(1, 2)); // 3
console.log(subtract(1, 2)); // -1
```
Example of internal module
```Typescript
// main.ts

namespace Math {
  export function add(x: number, y: number): number {
    return x + y;
  }

  export function subtract(x: number, y: number): number {
    return x - y;
  }
}

console.log(Math.add(1, 2)); // 3
console.log(Math.subtract(1, 2)); // -1

```
Modules can be a powerful tool for organizing and reusing code, but there are a few potential issues to be aware of:
- Modules can make it more difficult to write unit tests, as we may need to mock or stub out dependencies that are imported from other modules.
- Modules can be a source of performance overhead, especially if we are using a lot of small modules or if we are using a module bundler that has to perform tree shaking to remove unused exports.

Referances
- [Code](https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export)
- [Namespace-internal modules](https://www.typescriptlang.org/docs/handbook/namespaces.html)
- [tree-shaking](https://webpack.js.org/guides/tree-shaking/)
- [Modules](https://www.typescriptlang.org/docs/handbook/modules.html)

**Critique of Server/Client prototype**
---------------------

### CallBack hell
```javaScript
fs.readdir(source, function (err, files) {
  if (err) {
    console.log('Error finding files: ' + err)
  } else {
    files.forEach(function (filename, fileIndex) {
      console.log(filename)
      gm(source + filename).size(function (err, values) {
        if (err) {
          console.log('Error identifying file size: ' + err)
        } else {
          console.log(filename + ' : ' + values)
          aspect = (values.width / values.height)
          widths.forEach(function (width, widthIndex) {
            height = Math.round(width / aspect)
            console.log('resizing ' + filename + 'to ' + height + 'x' + height)
            this.resize(width, height).write(dest + 'w' + width + '_' + filename, function(err) {
              if (err) console.log('Error writing file: ' + err)
            })
          }.bind(this))
        }
      })
    })
  }
})
```
Callbacks are functions that are executed after an input/output (I/O) operation has completed. They can be added to an event queue and will be run in the main thread once it becomes available. When multiple callbacks are nested within each other, it can make the code difficult to read and understand, leading to a phenomenon known as "callback hell". According to the [Author](http://callbackhell.com/) there are 3 rules to follow to avoid this: 
- Naming the functions, the benefits are: 1) makes code easier to read 2)when exceptions happen you will get stacktraces that reference actual function names 3) we can reuse and export the functions
- Modularize, some benefits of doing so, are: 1) easier for new developers to understand 2) can get used in other places without duplicating code
- Handle every single error

Referances:
- [Code](http://callbackhell.com/)

### ConcurrentMode
```Typescript
import { unstable_ConcurrentMode as ConcurrentMode } from 'react';

function App() {
  return (
    <ConcurrentMode>
      {/* App components go here */}
    </ConcurrentMode>
  );
}

```
Concurrent mode is an experimental feature in React that allows the component tree to be rendered asynchronously, potentially improving the performance of an application. It introduces new lifecycle methods that allow components to be suspended and resumed, allowing the main thread to be more efficiently utilized. It all sounds good but, there are also some potential drawbacks to using concurrent mode:
- Concurrent mode introduces additional complexity to the application.
- Is still a work in progress, and many features that are available in normal mode are not yet supported in concurrent mode. This can limit the usefulness of concurrent mode in certain applications.
- May not work well with certain third-party libraries or other advanced features, such as the context API or the useDebugValue hook.

Referance:
- [Context](https://reactjs.org/docs/context.html)
- [useDebugValue](https://reactjs.org/docs/hooks-reference.html#usedebugvalue)
- [concurrentMode](https://17.reactjs.org/docs/concurrent-mode-intro.html)

**Future Technology Suggestions**
-----------------------------

### Progressive Web Applications

Are web applications that can be installed on a device and behave like native mobile apps. They offer offline functionality, push notifications, and other features that are typically only available in native apps.

This type of web app can be used offline, which is a key advantage for users who may not have a stable or reliable internet connection. Because progressive web apps are built using technologies like service workers, which allow the application to be cached and loaded more quickly, they are designed to be fast and responsive.<br/>
They have cross-platform compatibility, which means they can be installed on a device and behave like a native app. While PWAs can offer many of the same features as native apps, they do not have the same level of access to native device features. For example they dont have access to the sensors or camera and have limited access to the file system.<br/>
While PWAs have gained a lot of traction in recent years, they are still not as widely used as traditional web applications or native apps.<br/>
Referances:
- [PWA](https://web.dev/what-are-pwas/)
- [Pro-Cons](https://www.d-tt.nl/en/articles/pwa-progressive-web-apps-pros-cons)


### Virtual reality and augmented reality

AR and VR are emerging technologies that allow users to interact with computer-generated environments and content in immersive and interactive ways. VR involves the use of a headset or other device to create a fully immersive, computer-generated environment that the user can interact with. AR involves the overlay of digital information on the real world, using devices like smartphones or glasses.<br/>

VR and AR can offer a highly immersive and engaging experience that is not possible with traditional media, they  can be used to improve productivity in a variety of industries, such as manufacturing, construction, and education.<br/>
Building VR and AR applications can be more complex than building traditional web or mobile applications, as it requires a deeper understanding of 3D graphics, animation, and other specialized technologies.<br/>
However, they are still relatively new technologies, and they face a number of challenges and problems.

Referances:
- [AR-VR](https://blog.csssr.com/en/article/augmented-and-virtual-reality/)

### Single Page Applications

Single page applications (SPAs) are web applications that are designed to load all of their resources and functionality within a single web page. Instead of loading new pages like traditional web applications, SPAs dynamically update the current page with new data from the web server. This allows for a more seamless and responsive user experience, as the page does not need to be reloaded each time the user interacts with the application. They are built using client-side technologies like JavaScript, HTML, and CSS, and are intended to provide a seamless and responsive user experience.<br/>

Single page applications can offer improved performance, enhanced user experience, and better offline support, but they can also be complex to develop, have search engine optimization issues, be limited on older devices, and have security risks.<br/>

Referances:
- [SPA](https://www.bloomreach.com/en/blog/2018/what-is-a-single-page-application?spz=article_var)
- [Pro-Cons](https://www.netsolutions.com/insights/single-page-application/)