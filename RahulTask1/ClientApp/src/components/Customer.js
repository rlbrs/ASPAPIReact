import React from 'react';

import AddCustomer from './AddCustomer';
import CustomerView from './CustomerView';
import DeleteRecord from './DeleteRecord';

export default class Customer extends React.Component {
    static displayName = Customer.name;

    constructor(props) {
        super(props);
        this.state = {
            isAddCustomer:false,
            isEditCustomer:false,
            isDeleteCustomer:false,
            editCustomerId:'',
            closeForm:false,
            singleCustomer:{},
            deleteId:{},
            users:{}
        }
        
    }

    onCreate = () => {
        console.log("is add customer true ")
        this.setState({isAddCustomer:true})
    }

    onFormControl = () =>{
        this.setState({
            isAddCustomer:false,
            isEditCustomer:false
        })
    }

    onDeleteClick = customerId => {
        const headerTitle = "Customer";
        console.log("onDeleteClick")
        this.setState({
            isDeleteCustomer:true,
            deleteId:{
                ID:customerId,
                title:headerTitle,
                open:true
            }
        });
    }

    //New Customer record
    onAddFormSubmit = data => {

        console.log("In add form submit")
        console.log(data)

        let customerApi = 'https://localhost:44351/api/Customers';
        let method = '';

        if(this.state.isEditCustomer){
            console.log("In Edit api")
            console.log(this.state.editCustomerId)
            customerApi = 'https://localhost:44351/api/Customers/' + this.state.editCustomerId;
            method = 'PUT'
            
        }else{
            console.log("In Add api")
            customerApi = 'https://localhost:44351/api/Customers';
            method = 'POST'
            
        }
        
        const myHeader = new Headers({
            'Accept':'application/json',
                'Content-type':'application/json'
        });

        fetch(customerApi,{
            method:method,
            headers:myHeader,
            body:JSON.stringify(data)

        })
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    users:result,
                    isAddCustomer:false,
                    isEditCustomer:false
                })
            },(error) => {
                this.setState({ error });
            }
        )
    }

    //Edit customer record
    onEditCustomer = customerId => {
        
        //Get ID, name and address
        this.setState({
            editCustomerId:customerId
        });
        
        const customerApi = 'https://localhost:44351/api/Customers/'+customerId;

        const myHeader = new Headers({
            'Accept':'application/json',
                'Content-type':'application/json; charset=utf-8'
        });

        fetch(customerApi,{
            method:'GET',
            headers:myHeader
            
        })
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isEditCustomer:true,
                    isAddCustomer:false,
                    singleCustomer:{
                        customer:result,
                        isEditCustomer:true
                    }
                })
            },(error) => {
                this.setState({ error });
            }
        )

    }

    //Delete Customer

    onDeleteRecord = customerId => {

        const customerApi = 'https://localhost:44351/api/Customers/'+customerId;

        const myHeader = new Headers({
            'Accept':'application/json',
                'Content-type':'application/json; charset=utf-8'
        });

        fetch(customerApi,{
            method:'DELETE',
            headers:myHeader
            
        })
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    users:result,
                    isDeleteCustomer:false
                })
            },(error) => {
                this.setState({ error });
            }
        )
    }

    render() {
    
        let form;
        if(this.state.isAddCustomer && !this.state.isEditCustomer){
            console.log("Add")
            form = <AddCustomer onAddFormSubmit={this.onAddFormSubmit}
            isAddCustomer = {this.state.isAddCustomer}
            onFormControl = {this.onFormControl}/>
        }else if(this.state.isEditCustomer && !this.state.isAddCustomer){
            console.log("Edit")
            form = <AddCustomer onAddFormSubmit={this.onAddFormSubmit}
            singleCustomer = {this.state.singleCustomer}
            onFormControl = {this.onFormControl}/>
        }else if(this.state.isDeleteCustomer){
            console.log("Delete")
            console.log(this.state.deleteId)
            form = <DeleteRecord onDeleteRecord={this.onDeleteRecord}
            deleteId = {this.state.deleteId}
            />
        }

        return (
            <div>
                {form}
                <br/>
                <CustomerView 
                    onEditCustomer = {this.onEditCustomer} 
                    onCreate = {this.onCreate} 
                    onDeleteClick = {this.onDeleteClick}/>
            </div>
        )
    }

}