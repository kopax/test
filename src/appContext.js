import React, { createContext } from "react";
import PropTypes from "prop-types";

/**
 * @public
 * @name AppContext
 * @description
 * The AppContext created with React.createContext();
 * If you are building a module, you should add this dependency as peerDependency and devDependencies for store uniqueness
 * @type {React.Context<any>}
 */
export const AppContext = createContext();

/**
 * @public
 * @name AppContextConsumer
 * @description
 * It is used for retrieving context values within your application
 * @example
 * <AppContextConsumer>
 *  {({ message }) => <div>{message}</div>}
 * </AppContextConsumer>
 * @type {React.Consumer<any>}
 */
export const AppContextConsumer = AppContext.Consumer;

/**
 * @name AppContextProvider
 * @description
 * AppContextProvider can feed the application context using any props */
export default class AppContextProvider extends React.PureComponent {
  static propTypes = {
    /** Usually your react application node */
    children: PropTypes.any.isRequired
  };

  /**
   * @private
   * @description
   * It does pass all the props except children to the state for later being injected in the context
   */
  componentWillMount() {
    const { children, ...contextValues } = this.props;
    this.setState({
      contextValues
    });
  }

  /**
   * @private
   * @description
   * Return the app wrapper in a context provider
   * @returns {node<React.Provider>} the application context
   */
  render() {
    const { children } = this.props;
    const { contextValues } = this.state;

    return (
      <AppContext.Provider value={contextValues}>
        {children}
      </AppContext.Provider>
    );
  }
}
