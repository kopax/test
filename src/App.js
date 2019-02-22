import React, { Component } from "react";
import { Resource } from "react-admin";
import authProvider from "./my_node_modules/ra-auth-provider";
import dataProviderFactory from "./my_node_modules/ra-data-provider";
import fakeServerFactory from "./my_node_modules/ra-fake-server";

import "./App.css";
import Admin from "./Admin";
import sagas from "./sagas";
import themeReducer from "./themeReducer";
import { Login, Layout, Menu } from "./containers/Layout";
import { Dashboard } from "./containers/Dashboard";
import customRoutes from "./routes";
import englishMessages from "./i18n/en";

import visitors from "./resources/visitors";
import orders from "./resources/orders";
import products from "./resources/products";
import categories from "./resources/categories";
import reviews from "./resources/reviews";

const i18nProvider = locale => {
  if (locale === "fr") {
    return import("./i18n/fr").then(messages => messages.default);
  }

  // Always fallback on english
  return englishMessages;
};

class App extends Component {
  state = { dataProvider: null };

  async componentWillMount() {
    this.restoreFetch = await fakeServerFactory("rest");

    const dataProvider = await dataProviderFactory("rest");

    this.setState({ dataProvider });
  }

  componentWillUnmount() {
    this.restoreFetch();
  }

  render() {
    const { dataProvider } = this.state;

    if (!dataProvider) {
      return (
        <div className="loader-container">
          <div className="loader">Loading...</div>
        </div>
      );
    }

    return (
      <Admin
        title=""
        dataProvider={dataProvider}
        customReducers={{ theme: themeReducer }}
        customSagas={sagas}
        customRoutes={customRoutes}
        authProvider={authProvider}
        dashboard={Dashboard}
        loginPage={Login}
        appLayout={Layout}
        menu={Menu}
        locale="en"
        i18nProvider={i18nProvider}
      >
        <Resource name="customers" {...visitors} />
        <Resource name="commands" {...orders} options={{ label: "Orders" }} />
        <Resource name="products" {...products} />
        <Resource name="categories" {...categories} />
        <Resource name="reviews" {...reviews} />
      </Admin>
    );
  }
}

export default App;
