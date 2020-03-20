import React from 'react';

import ProductForm from './ProductForm';
import ProductView from './ProductView';
import DeleteRecord from './DeleteRecord';

export default class Product extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isAddProduct:false,
            editProductId:'',
            isEditProduct:false,
            isDeleteProduct:false,
            closeForm:false,
            singleProduct:{},
            deleteId:{},
            users:{}
        }
        
    }

    onCreate = () => {
        console.log("is add customer true ")
        this.setState({isAddProduct:true})
    }

    onFormControl = () =>{
        this.setState({
            isAddProduct:false,
            isEditProduct:false
        })
    }

    onDeleteClick = productId => {
        const headerTitle = "Product";
        this.setState({
            isDeleteProduct:true,
            deleteId:{
                ID:productId,
                title:headerTitle,
                open:true
            }
        });
    }

    //New Customer record
    onAddFormSubmit = data => {

        console.log("In add form submit")
        console.log(data)

        let productApi = 'https://localhost:44351/api/Products';
        let method = '';

        if(this.state.isEditProduct){
            productApi = 'https://localhost:44351/api/Products/' + this.state.editProductId;
            method = 'PUT'
            
        }else{
            console.log("In Add api")
            productApi = 'https://localhost:44351/api/Products';
            method = 'POST'
            
        }
        
        const myHeader = new Headers({
            'Accept':'application/json',
                'Content-type':'application/json'
        });

        fetch(productApi,{
            method:method,
            headers:myHeader,
            body:JSON.stringify(data)

        })
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    users:result,
                    isAddProduct:false,
                    isEditProduct:false
                })
                console.log("in ")
            },(error) => {
                this.setState({ error });
            }
        )
    }

    //Edit customer record
    onEditProducts = productId => {
        
        //Get ID, name and address
        this.setState({
            editProductId:productId
        });
        
        const productApi = 'https://localhost:44351/api/Products/'+productId;

        const myHeader = new Headers({
            'Accept':'application/json',
                'Content-type':'application/json; charset=utf-8'
        });

        fetch(productApi,{
            method:'GET',
            headers:myHeader
            
        })
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isEditProduct:true,
                    isAddProduct:false,
                    singleProduct:{
                        product:result,
                        isEditProduct:true
                    }
                })
            },(error) => {
                this.setState({ error });
            }
        )

    }

    //Delete Customer

    onDeleteRecord = productId => {

        const productApi = 'https://localhost:44351/api/Products/'+productId;

        const myHeader = new Headers({
            'Accept':'application/json',
                'Content-type':'application/json; charset=utf-8'
        });

        fetch(productApi,{
            method:'DELETE',
            headers:myHeader
            
        })
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isDeleteProduct:false
                })
            },(error) => {
                this.setState({ error });
            }
        )
    }

    render() {
    
        let form;
        if(this.state.isAddProduct && !this.state.isEditProduct){
            console.log("Add")
            form = <ProductForm onAddFormSubmit={this.onAddFormSubmit}
            isAddProduct = {this.state.isAddProduct}
            onFormControl = {this.onFormControl}/>
        }else if(this.state.isEditProduct && !this.state.isAddProduct){
            console.log("Edit")
            form = <ProductForm onAddFormSubmit={this.onAddFormSubmit}
            singleProduct = {this.state.singleProduct}
            onFormControl = {this.onFormControl}/>
        }else if(this.state.isDeleteProduct){
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
                <ProductView 
                    onEditProducts = {this.onEditProducts} 
                    onCreate = {this.onCreate} 
                    onDeleteClick = {this.onDeleteClick}/>
            </div>
        )
    }

}