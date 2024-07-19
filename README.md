# World of Tanks for Browser
## About World of Tanks
World of Tanks is a team-based, MMO tank battle game made by Wargaming. Play in the browser on desktop or on mobile and master the art of armored warfare in over 800 mid-20th century vehicle.

### ***Note that this version of the game is currently being made outside of the official Wargaming.net company and is not yet done!***

## About World of Tanks Online project

I started working on this project because I had an interesting idea to make my favourite game, World of Tanks, available in the browser, so that you didn't have to download the whole game every time you wanted to play it, and so that everyone could actually try out the game before actually installing it on their computer.

The idea behind the project is to make World of Tanks available on even more platforms, to reach a wider audience and to let potential players try the game in a browser.

This project should eventually become part of the Wargaming.net infrastructure and an another way to access the game, and if you are really curious, [you can check out the beta right now!](https://worldoftanksonline.netlify.app)

The game is currently built on Node.js® JavaScript runtime, Three.js and Vite, but is undergoing big changes and that also means that I am going to completely rewrite the game to use more advanced technology.

### ***New technology that is going to be used from now on***

1. The frontend (aka. client-side)
    * **Game's GUI structure** - HTML
    * **GUI styling and appearance** - Sass CSS preprocessor (I could use native CSS but it doesn't support CSS nesting on older devices)
    * **Client-side logic and GUI interactivity** - TypeScript

2. The backend (aka. server-side)
    * **Server runtime and server logic** - Node.js® Javascript runtime
    * **Package and dependecy installer and manager** - NPM (Node Package Manager)
    * **Deployment package module bundler** - Webpack
    * **NoSQL online database** - Firebase Firestore (When Wargaming.net provides any kind of database, it will be used instead)
    * **Authentication service** - Firebase Auth (Wargaming API will later replace firebase)

3. APIs

    * **Graphics engine (WebGL and WebGPU)** - Babylon.js
        * Renderer logic will use WebAssembly compiled from JavaScript to get native execution speed just like any C language
        * Babylon.js developers are currently working on adding Ray Tracing to the engine, so we'll see later
    * **Sound engine** - WebAudio API
    * **Physics engine** - Babylon.js Havok physics plugin
    * **Wargaming API**
