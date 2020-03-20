import React from 'react';
import { Button, Form, Icon, Modal, Dropdown } from 'semantic-ui-react';

export default class SalesForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showCreateForm: false,
            salesId:'',
            customer:[],
            customerId:'',
            product:[],
            productId:'',
            store:[],
            storeId:'',
            dateSold:'',
            addSale:{},
            editSales:{}
        }
        if(props.isAddSales){
            this.state.showCreateForm = props.isAddSales;
        }else if(props.singleSales){
            
            this.state.customerId = this.props.singleSales.sale.customer.customerId;
            this.state.productId = this.props.singleSales.sale.product.productId;
            this.state.storeId = this.props.singleSales.sale.store.storeId;
            this.state.salesId = this.props.singleSales.sale.salesId;
            this.state.showCreateForm = this.props.singleSales.isEditSales;
            this.state.addOrdit = this.props.singleSales.isEditSales;
            
        }

    }

    componentWillMount(){
        const customerApi = 'https://localhost:44351/api/Customers';
        const storeApi = 'https://localhost:44351/api/Stores';
        const productApi = 'https://localhost:44351/api/Products';

        const myHeader = new Headers();
        myHeader.append('Content-type', 'application/json');
        myHeader.append('Accept', 'application/json');
        myHeader.append('Origin', 'https://localhost:44351');

        const options = {
            method: 'GET',
            myHeader
        };

        fetch(customerApi, options)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        customer: result
                    });
                }
            )

            fetch(productApi, options)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        product: result
                    });
                }
            )

            fetch(storeApi, options)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        store: result
                    });
                }
            )
    }

    handleChangeCustomer = (event, {value}) => {
        this.setState({customerId:value});
    }

    handleChangeProduct = (event, {value}) => {
        this.setState({productId:value});
    }

    handleChangeStore = (event, {value}) => {
        this.setState({storeId:value});
    }

    handleSubmit = event => {
        event.preventDefault();
        if(this.state.addOrdit){
            this.setState({
                editSales: {
                    salesId:parseInt(this.state.salesId),
                    customerRefId: parseInt(this.state.customerId),
                    productRefId: parseInt(this.state.productId),
                    storeRefId: parseInt(this.state.storeId),
                    dateSold: this.state.dateSold
                }
            }, () => {this.props.onAddFormSubmit(this.state.editSales);});
        }else{
            this.setState({
                addSale: {
                    customerRefId: parseInt(this.state.customerId),
                    productRefId: parseInt(this.state.productId),
                    storeRefId: parseInt(this.state.storeId),
                    dateSold: this.state.dateSold
                }
            }, () => {this.props.onAddFormSubmit(this.state.addSale);});
        }
    }

    //On cancel button click close Create user form
    closeCreateForm = () => {
        this.setState({ showCreateForm: false })
        this.props.onFormControl();
    }

    //Open Create new Customer form
    openCreateCustomer = () => {
        this.setState({ showCreateForm: true })
    }

    render() {

        const {customer, product, store} = this.state;
        
        console.log("Customer ID " + this.state.customerId)

        let formTitle;
        let buttonName;
        if (this.state.addOrdit) {
            formTitle = "Edit Customer";
            buttonName = "Edit";
        } else {
            formTitle = "New Customer";
            buttonName = "Create";
        }

        return (
            <div>
                <Modal size='small'
                    closeOnTriggerMouseLeave={false}
                    open={this.state.showCreateForm}>
                    <Modal.Header>
                        {formTitle}
                    </Modal.Header>
                    <Modal.Content>
                        <Form onSubmit={this.handleSubmit}>
                        <Form.Field>
                            <label>Date sold</label>
                            <input type="text" placeholder='DD MON YYYY' name="date"
                                   value={this.state.dateSold}
                                   onChange={(e) => this.setState({dateSold: e.target.value})} />
                            </Form.Field>
                            <Form.Field>
                            <label>Customer</label>
                                <Dropdown
                                    defaultValue={this.state.customerId}
                                    placeholder=''
                                    selection
                                    options={customer.map(({ customerId, name }) => ({ key:customerId, value: customerId, text: name }))}
                                    onChange={this.handleChangeCustomer}
                                    
                                />
                            </Form.Field>
                            <Form.Field>
                            <label>Product</label>
                                <Dropdown
                                    defaultValue={this.state.productId}
                                    placeholder=''
                                    selection
                                    options={product.map(({ productId, name }) => ({ key:productId, value: productId, text: name }))}
                                    onChange={this.handleChangeProduct}
                                />
                            </Form.Field>
                            <Form.Field>
                            <label>Store</label>
                                <Dropdown
                                    defaultValue={this.state.storeId}
                                    placeholder=''
                                    selection
                                    options={store.map(({ storeId, name }) => ({ key:storeId, value: storeId, text: name }))}
                                    onChange={this.handleChangeStore}
                                />
                            </Form.Field>

                            <br />
                            <Button type='submit' icon labelPosition='right'
                                floated='right' color='green'>
                                <Icon name='check' />
                                {buttonName}
                            </Button>

                            <Button floated='right'
                                onClick={this.closeCreateForm} color='black'>
                                Cancel
                            </Button>

                            <br />
                        </Form>

                    </Modal.Content>
                </Modal>

            </div>
        )
    }

}
