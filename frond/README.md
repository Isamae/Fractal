# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


### Config
npx create-react-app my-app
npm i react-router-dom
npm i bootstrap
npm i axios
npm i lodash

### Back
Spring Boot
### Frond
React, MongoDB

## Description


We would like to see the following:
1) Integrate with MongoDB.
2) Create a nav bar with two menu options:
    1. Orders
    2. Products
3) Handle Orders Management
    1. An Order should have the following fields:
        ● Order number
        ● Status(Pending, Completed, Rejected)
        ● Date
        ● Customer
        ● Taxes amounts
        ● Total Taxes
        ● Total Amount
        ● List of order items
    2. Create a UI to list the orders in a table.
        a. The table must include pagination*
    3. Create a UI to create an order.
    4. Create a UI to edit an order and change its status.
        a. A Pending order can be changed to Completed or Rejected.
        b. Add a table to add/edit/delete order items.
    5. Calculate taxes for the order on the server-side.
        a. Apply to the order the following taxes:
            i. City Tax: 10%
            ii. County Tax: 5%
            iii. State Tax: 8%
            iv. Federal Tax: 2%
        b. Use compound calculation. This means that the tax considers the subtotal
        and previous taxes amounts.
            E.G.:
            Subtotal = $100
            City tax=$100*10%=$10
            County tax= $110*5%=$5.5
            State tax=$115.50*8%=$9.24
            Federal tax=$124.74*2%=$2.49
            Total taxes=$10+$5.5+$9.24+$2.49=$27.23
            Total=$127.23
4) Handle Product Management
    1. A Product should have the following attributes:
        ○ Name
        ○ Category(Cookies, Candies, Cakes, Desserts, Drinks)**
        ○ Unit Price
        ○ Active
    2. Create a UI to list products in a table.
        ○ The table must include pagination*
    3. Create a UI to add/edit/delete products.


