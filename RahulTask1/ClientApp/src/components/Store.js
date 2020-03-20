import React from 'react';
import StoreView from './StoreView';
import DeleteRecord from './DeleteRecord';
import StoreForm from './StoreForm';

export default class Store extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isAddStore:false,
            isEditStore:false,
            editStoreId:'',
            isDeleteStore:false,
            closeForm:false,
            singleStore:{},
            deleteId:{},
            users:{}
        }
        
    }

    onCreate = () => {
        console.log("is add customer true ")
        this.setState({isAddStore:true})
    }

    onFormControl = () =>{
        this.setState({
            isAddStore:false,
            isEditStore:false
        })
    }

    onDeleteClick = storeId => {
        const headerTitle = "Customer";
        console.log("onDeleteClick")
        this.setState({
            isDeleteStore:true,
            deleteId:{
                ID:storeId,
                title:headerTitle,
                open:true
            }
        });
    }

    //New Customer record
    onAddFormSubmit = data => {

        console.log("In add form submit")
        console.log(data)

        let storeApi = 'https://localhost:44351/api/Stores';
        let method = '';

        if(this.state.isEditStore){
            console.log("In Edit api")
            console.log(this.state.editStoreId)
            storeApi = 'https://localhost:44351/api/Stores/' + this.state.editStoreId;
            method = 'PUT'
            
        }else{
            console.log("In Add api")
            storeApi = 'https://localhost:44351/api/Stores';
            method = 'POST'
            
        }
        
        const myHeader = new Headers({
            'Accept':'application/json',
                'Content-type':'application/json'
        });

        fetch(storeApi,{
            method:method,
            headers:myHeader,
            body:JSON.stringify(data)

        })
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isEditStore:false,
                    isAddStore:false,
                })
            },(error) => {
                this.setState({ error });
            }
        )
    }

    //Edit customer record
    onEditStore = storeId => {
        
        //Get ID, name and address
        this.setState({
            editStoreId:storeId
        });
        
        const storeApi = 'https://localhost:44351/api/Stores/'+storeId;

        const myHeader = new Headers({
            'Accept':'application/json',
                'Content-type':'application/json; charset=utf-8'
        });

        fetch(storeApi,{
            method:'GET',
            headers:myHeader
            
        })
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isEditStore:true,
                    isAddStore:false,
                    singleStore:{
                        store:result,
                        isEditStore:true
                    }
                })
            },(error) => {
                this.setState({ error });
            }
        )

    }

    //Delete Customer

    onDeleteRecord = storeId => {

        const storeApi = 'https://localhost:44351/api/Stores/'+storeId;

        const myHeader = new Headers({
            'Accept':'application/json',
                'Content-type':'application/json; charset=utf-8'
        });

        fetch(storeApi,{
            method:'DELETE',
            headers:myHeader
            
        })
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isDeleteStore:false
                })
            },(error) => {
                this.setState({ error });
            }
        )
    }

    render() {
    
        let form;
        if(this.state.isAddStore && !this.state.isEditStore){
            form = <StoreForm onAddFormSubmit={this.onAddFormSubmit}
            isAddStore = {this.state.isAddStore}
            onFormControl = {this.onFormControl}/>
        }else if(this.state.isEditStore && !this.state.isAddStore){
            form = <StoreForm onAddFormSubmit={this.onAddFormSubmit}
            singleStore = {this.state.singleStore}
            onFormControl = {this.onFormControl}/>
        }else if(this.state.isDeleteStore){
            form = <DeleteRecord onDeleteRecord={this.onDeleteRecord}
            deleteId = {this.state.deleteId}
            />
        }

        return (
            <div>
                {form}
                <br/>
                <StoreView 
                    onEditStore = {this.onEditStore} 
                    onCreate = {this.onCreate} 
                    onDeleteClick = {this.onDeleteClick}/>
            </div>
        )
    }

}