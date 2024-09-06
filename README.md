# Locaboo Frontend Challenge

Hello Michael, this is my approach to the Frontend Challenge you asked me to do.

## Notes

You gave me the freedom to use an UI library, I decided to use Vuetify.

I haven't used it in a while, but it is quite easy and intuitive to use, and comes with a lot of useful tools.

Local developrment server is Vite.

I know you did not requrire to implement testing, but an application withoun any kind of test, is not professional.
I tool the liberty to implement a test using Cypress. This is a simple application, so I am using a simple test.

I decided to simulate a fake api request with a loading screen at the beginning while "fetching" the data, to make it more like a real app.

Also, INHO, the list of filters should be all checked at the beginning, because we are showing all the items in the list.
You will understand what I mean when you play with the app :)

## 💿 Install

To install the application, just run 

```bash
npm i
```

## 💡 Usage

To start the development server with hot-reload, run the following command. The server will be accessible at [http://localhost:3000](http://localhost:3000):

```bash
npm run dev
```

### Building for Production

To build your project for production, use:

```bash
npm run build
```

(Repeat for npm, pnpm, and bun with respective commands.)

Once the build process is completed, your application will be ready for deployment in a production environment.

## 💡 Run cypress

In order to run the tests, first start the application, then open a second terminal window and run:


```bash
npm run e2e
```

If you want a visual proof of the test, run the command:

```bash
npm run cy:open
```

You will be prompted with a browser window.

Select "E2E Testing", then choose a browser (you should get 3 options, Chrome, Electron and Firefox).

Then you will see a view with the tests. There is only one test file called "filterItems.cy.js".

Just click on it and you will see the test runing in front of you.



I hope you had as much fun checking this, as I had impelmenting it ;)
