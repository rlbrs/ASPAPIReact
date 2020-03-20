import React, { Component } from 'react';
import { Menu,Container } from 'semantic-ui-react';
import { NavLink, BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Customer from "./Customer";
import Product from "./Product";
import Store from "./Store";
import Sales from "./Sales";

export default class NavigationBar extends Component {
    state = {activeItem:'customer'}

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state

        const Main = () => (
            <main>
                <div>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                <Switch>
                    <Route exact path="/customer">
                        <Customer />
                    </Route>

                    <Route path="/product">
                        <Product />
                    </Route>

                    <Route path="/store">
                        <Store />
                    </Route>

                    <Route path="/Sales">
                        <Sales />
                    </Route>
                </Switch>
                </div>
            </main>
        );

        return (
            <Router>
                <div>
                    <Menu fixed='top' inverted>
                        <Menu.Item
                            as={NavLink} to='Customer'
                            name='customer'
                            active={activeItem === 'customer'}
                            onClick={this.handleItemClick}
                        >
                            Customers
                    </Menu.Item>
                        <Menu.Item
                            as={NavLink} to='Product'
                            name='product'
                            active={activeItem === 'product'}
                            onClick={this.handleItemClick}
                        >
                            Product
                    </Menu.Item>
                        <Menu.Item
                            as={NavLink} to='Store'
                            name='store'
                            active={activeItem === 'store'}
                            onClick={this.handleItemClick}
                        >
                            Store
                    </Menu.Item>
                        <Menu.Item
                            as={NavLink} to='Sales'
                            name='sales'
                            active={activeItem === 'sales'}
                            onClick={this.handleItemClick}
                        >
                            Sale
                    </Menu.Item>
                    </Menu>
                    <Container>
                    <Main />
                    </Container>
                </div>
            </Router>
        )
    }
}   

