import React from 'react';
import { Button, Form, Icon, Modal } from 'semantic-ui-react';

export default class AddCustomer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showCreateForm: false,
            addOrdit:false,
            id: "",
            name: "",
            address: "",
            formData: {},
            record: {}
        }
        if (props.isAddCustomer){
            this.state.showCreateForm = props.isAddCustomer;
        }
        else if (props.singleCustomer) {
            console.log("Single customer")
            console.log(props.singleCustomer)
            this.state.id = props.singleCustomer.customer.customerId;
            this.state.name = props.singleCustomer.customer.name;
            this.state.address = props.singleCustomer.customer.address;
            this.state.record = props.singleCustomer.customer;
            this.state.showCreateForm = props.singleCustomer.isEditCustomer;
            this.state.addOrdit = props.singleCustomer.isEditCustomer;
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
                    customerId: this.state.id,
                    name: this.state.name, 
                    address: this.state.address
                }
            },() => {
                this.props.onAddFormSubmit(this.state.record);
            });

        }else{
            this.setState({
                formData: {
                    name: this.state.name, 
                    address: this.state.address
                }
            },() => {
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
                                <label>Name</label>
                                <input type="text" placeholder='Name' name="name"
                                    value={this.state.name}
                                    onChange={(e) => this.setState({name: e.target.value})} />
                            </Form.Field>

                            <Form.Field>
                                <label>Address</label>
                                <input type="text" placeholder='Address' name="address"
                                    value={this.state.address}
                                    onChange={(e) => this.setState({address: e.target.value})} />
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
