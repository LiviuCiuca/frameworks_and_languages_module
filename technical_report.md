**Technical Report**
================

(intro)


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

Pipes are a benefit usually, but in my case i have a problem,that is : Pipes run inside the exceptions zone, meaning that when a Pipe throws an exception it is handled by the exceptions layer, as a result no controller method is performed(Details bellow).

<details>
## Context

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
Everything that we can do with decorators we can do with plain JS, developers have different opinions about using decorators,as they should increse flexibility and recomposability, but in practice this dosen`t happen with decorators.

- [NestJS decorator](https://docs.nestjs.com/custom-decorators)
- [Different opinions](https://www.reddit.com/r/typescript/comments/w772vv/is_anyone_against_using_decorators/)
- [Code snipets](https://github.com/LiviuCiuca/frameworks_and_languages_module/blob/main/server/src/items/items.controller.ts)



**Server Language Features**
-----------------------

A typed superset of JavaScript, TypeScript compiles to standard JavaScript. It provides classes, modules, and interfaces to aid in the development of durable components.

### Typescript --> **IntelliSense**

To help create code more quickly and accurately, IntelliSense provides you with intelligent code completion, hover information, and signature assistance. As we type intelliSense gives a pop up, where if by continuing typing characters, the list of members (variables, methods, etc.) is filtered to only include members containing the typed characters. 

<img src="https://user-images.githubusercontent.com/37383113/177110097-54ebdb00-1a7a-48f2-abf0-8a0a8215b42b.png" alt="intelliSense" width="300" height="250" />

this feature is a massive help to our productivity, bug prevention, although in some cases it could hinder the developer`s speed by suggesting the wrong snippet, or in the case below not suggesting anything.

```Typescript
interface IObject {
  foo: string;
  bar: number;
}
type A = Pick<IObject, "suggestion_snippet_here">; // works
interface S extends Pick<IObject, "____"> {} // is not suggesting anything
```  

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

[Code snipet](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch)

**Client Framework Features**
-------------------------

### Conditional Rendering

Use JavaScript operators like *if or the conditional operator* to create elements representing the current state, and JSX will update the UI to match them.
(A code block snippet example demonstrating the feature - 1 mark)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words - 1 mark)
(Provide reference urls to your sources of information about the feature - required)


### JSX

It stands for JavaScript Syntax eXtension,. It is a add-on that enables us to define the object tree of React using syntax akin to an HTML template.

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
The problem that Jsx is solving is making the developement and debugging process easier and can make the code more readable and clean., being an add-on is not a necessity to use JSX.<br/>
A possible limitation would be that developers and designers complain about complications in learning JSX and the consequent hard learning curve.

<img src="https://media.geeksforgeeks.org/wp-content/uploads/20220204143529/react-300x274.jpg" alt="Generalised-limitation" width=300px height=250px />

- [JSX-doc](https://www.typescriptlang.org/docs/handbook/jsx.html)
- [Code snipet](https://www.telerik.com/blogs/how-jsx-react-works-under-hood)
- [Possible limitation, img](https://www.geeksforgeeks.org/what-are-the-limitations-of-react-js/)


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
as Sophie Alpert said in [React Conf 2018](https://www.youtube.com/watch?v=dpw9EHDh2bM):
hooks come to solve these nowadays problems are:
- - Wrapper hell (caused by design patterns: HOC, render prop, drilling prop)
- - Huge components (that hard to test and maintain, hard to co-locate code)
- - Confusing classes (this keyword, hard to make it reusable)
Additional benefits:
- *backwards-compatible*
- *opt-in*, meaning we can try Hooks in a few components without rewriting any existing code, but to optimise it, we must rewrite code.<br/>
Referances
- [React-Hooks, code snipet](https://reactjs.org/docs/hooks-intro.html)

**Client Language Features**
------------------------

### (name of Feature 1)

(Technical description of the feature - 40ish words - 1 mark)
(A code block snippet example demonstrating the feature - 1 mark)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words - 1 mark)
(Provide reference urls to your sources of information about the feature - required)

### (name of Feature 2)

(Technical description of the feature - 40ish words - 1 mark)
(A code block snippet example demonstrating the feature - 1 mark)
(Explain the problem-this-is-solving/why/benefits/problems - 40ish words - 1 mark)
(Provide reference urls to your sources of information about the feature - required)


**Critique of Server/Client prototype**
---------------------

### (name of Issue 1)

(A code snippet example demonstrating the feature - 1 mark)
(Explain why this pattern is problematic - 40ish words 1 mark)

### (name of Issue 2)

(A code snippet example demonstrating the feature - 1 mark)
(Explain why this pattern is problematic - 40ish words 1 mark)


**Future Technology Suggestions**
-----------------------------

### (name of technology/feature 1)

(Description of a feature or tool - 40ish words - 1 mark)
(Why/benefits/problems with using this - 40ish words - 1 mark)
(Provide reference urls to your source of information about this technology - required)


### (name of technology/feature 2)

(Description of a feature or tool - 40ish words - 1 mark)
(Why/benefits/problems with using this - 40ish words - 1 mark)
(Provide reference urls to your source of information about this technology - required)


### (name of technology/feature 3)

(Description of a feature or tool - 40ish words - 1 mark)
(Why/benefits/problems with using this - 40ish words - 1 mark)
(Provide reference urls to your source of information about this technology - required)