import React from 'react';
import { Button, Form, Icon, Modal } from 'semantic-ui-react';

export default class ProductForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showCreateForm: false,
            addOrdit:false,
            id: "",
            name: '',
            price: '',
            formData: {},
            record: {}
        };
        if (props.isAddProduct){
            this.state.showCreateForm = props.isAddProduct;
        }
        else if (props.singleProduct) {
            this.state.id = props.singleProduct.product.productId;
            this.state.name = props.singleProduct.product.name;
            this.state.price = props.singleProduct.product.price;
            this.state.showCreateForm = props.singleProduct.isEditProduct;
            this.state.addOrdit = props.singleProduct.isEditProduct;
            console.log(this.state.name)
            
        }else if(props.closeForm){
            this.state.showCreateForm = props.closeForm;
        }

    }

    handleSubmit = event => {
        event.preventDefault();
        
        if(this.state.addOrdit){
            this.setState({
                record: {
                    productId: parseInt(this.state.id),
                    name: this.state.name, 
                    price: this.state.price
                }
            }, () => {
                this.props.onAddFormSubmit(this.state.record);
              });

        }else{
            this.setState({ 
                formData: {
                    name: this.state.name, 
                    price: this.state.price
                } 
            }, () => {
                this.props.onAddFormSubmit(this.state.formData);
              });
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

        let formTitle;
        let buttonName;
        if (this.state.addOrdit) {
            formTitle = "Edit Product";
            buttonName = "Edit";
        } else {
            formTitle = "New Product";
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
                                <label>Name</label>
                                <input type="text" placeholder='Name' name="name"
                                    value={this.state.name}
                                    onChange={(e) => this.setState({name: e.target.value})} />
                            </Form.Field>

                            <Form.Field>
                                <label>Price</label>
                                <input type="text" placeholder='Price' name="price"
                                    value={this.state.price}
                                    onChange={(e) => this.setState({price: parseInt(e.target.value)})} />
                            </Form.Field>

                            <br />
                            <Button type='submit' icon labelPosition='right'  
                                floated='right' color='green'>
                                    <Icon name='check'/>
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
