import React, { Component, createContext } from 'react'

// context
const RootContext = createContext();

//Provider (Penyedia)
const Provider = RootContext.Provider;
const GlobalProvider = (Children) => {
    return (
        class ParentProvider extends Component {
            constructor() {
                super();
                this.state = {
                    sidebar: false,
                    smallSidebar: false
                    // loggedIn: true
                }
            }

            dispatch = (action) => {
                if (action.type === 'HANDLER_SIDEBAR') {
                    return this.setState({
                        sidebar: !this.state.sidebar
                    })
                }
                if (action.type === 'SMALL_SIDEBAR') {
                    return this.setState({
                        smallSidebar: !this.state.smallSidebar
                    })
                }
                // if (action.type === 'LOGOUT') {
                //     sessionStorage.removeItem('token')
                //     return this.setState({
                //         loggedIn: false
                //     })
                // }
            }
            render() {
                return (
                    <Provider value={
                        {
                            state: this.state,
                            dispatch: this.dispatch
                        }
                    }>
                        <Children {...this.props} />
                    </Provider>
                )
            }
        }
    )
}

export default GlobalProvider;

// Consumer (Penerima/ Pengguna)
const Consumer = RootContext.Consumer;
export const GlobalConsumer = (Children) => {
    return (
        class ParentConsumer extends Component {
            render() {
                return (
                    <Consumer>
                        {
                            value => {
                                return (
                                    <Children {...this.props} {...value} />
                                )
                            }
                        }
                    </Consumer>
                )
            }
        }
    )
}




