import React, { Component } from "react";
import { Admin as ReactAdmin } from "react-admin";
import merge from "deepmerge";
import SiteServiceCollection from "./my_node_modules/site-service/SiteServiceCollection";
import getPages from "@yeutech-lab/react-router-dom-utils/lib/getPages";

import AppContextProvider from "./appContext";

export default class Admin extends Component {
  static defaultProps = {
    siteServiceCollection: new SiteServiceCollection(),
    loadingComponent: () => <div>loading...</div>,
    appContext: {},
    customRoutes: [],
    customReducers: {},
    children: null,
    initialState: {}
  };

  render() {
    const {
      siteServiceCollection: ssc,
      appContext,
      loadingComponent,
      customRoutes,
      customReducers,
      children,
      initialState,
      ...rest
    } = this.props;
    const { roles, routes, pages, ...restAppContext } = appContext;
    console.log();
    return (
      <AppContextProvider
        pages={merge.all([pages || {}, getPages(routes || []), ssc.getPages()])}
        roles={Object.assign({}, ssc.getRoles(), roles)}
        routes={(routes || []).concat(ssc.getRoutesConfig())}
        loading={loadingComponent}
        {...restAppContext}
      >
        <ReactAdmin
          customRoutes={customRoutes.concat(ssc.getCustomRoutes())}
          customReducers={merge.all([customReducers, ssc.getCustomReducers()])}
          initialState={merge.all([initialState])}
          {...rest}
        >
          {permissions =>
            ssc
              .getResourcesRoutes(permissions)
              .concat(React.Children.toArray(children))
          }
        </ReactAdmin>
      </AppContextProvider>
    );
  }
}
