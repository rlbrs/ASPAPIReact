import React from 'react';
import SalesView from './SalesView';
import DeleteRecord from './DeleteRecord';
import SalesForm from './SalesForm';

export default class Sales extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isAddSales:false,
            isEditSales:false,
            isLoaded:false,
            editSalesId:'',
            isDeleteSales:false,
            closeForm:false,
            singleSales:{},
            deleteId:{},
            users:{}
        }
        
    }

    onCreate = () => {
        console.log("is add customer true ")
        this.setState({isAddSales:true})
    }

    onFormControl = () =>{
        this.setState({
            isAddSales:false,
            isEditSales:false
        })
    }

    onDeleteClick = salesId => {
        const headerTitle = "Sales";
        console.log("onDeleteClick")
        this.setState({
            isDeleteSales:true,
            deleteId:{
                ID:salesId,
                title:headerTitle,
                open:true
            }
        });
    }

    //New Customer record
    onAddFormSubmit = data => {

        console.log("In add form submit")
        console.log(data)

        let salesApi = 'https://localhost:44351/api/Sales';
        let method = '';

        if(this.state.isEditSales){
            console.log("In Edit api")
            console.log(this.state.editSalesId)
            salesApi = 'https://localhost:44351/api/Sales/' + this.state.editSalesId;
            method = 'PUT'
            
        }else{
            console.log("In Add api")
            salesApi = 'https://localhost:44351/api/Sales';
            method = 'POST'
            
        }
        
        const myHeader = new Headers({
            'Accept':'application/json',
                'Content-type':'application/json'
        });

        fetch(salesApi,{
            method:method,
            headers:myHeader,
            body:JSON.stringify(data)
        })
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isEditSales:false,
                    isAddSales:false,
                })
            },(error) => {
                this.setState({ error });
            }
        )
    }

    //Edit customer record
    onEditSales = salesId => {
        
        console.log("Sales Id" + salesId)
        //Get ID, name and address
        this.setState({
            editSalesId:salesId
        });
        
        const salesApi = 'https://localhost:44351/api/Sales/'+parseInt(salesId);

        const myHeader = new Headers({
            'Accept':'application/json',
                'Content-type':'application/json; charset=utf-8'
        });

        fetch(salesApi,{
            method:'GET',
            headers:myHeader
            
        })
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isEditSales:true,
                    isAddSales:false,
                    singleSales:{
                        sale:result,
                        isEditSales:true
                    }
                })
            },(error) => {
                this.setState({ error });
            }
        )

    }

    //Delete Customer

    onDeleteRecord = salesId => {

        const salesApi = 'https://localhost:44351/api/Sales/'+salesId;

        const myHeader = new Headers({
            'Accept':'application/json',
                'Content-type':'application/json; charset=utf-8'
        });

        fetch(salesApi,{
            method:'DELETE',
            headers:myHeader
            
        })
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isDeleteSales:false
                })
            },(error) => {
                this.setState({ error });
            }
        )
    }

    render() {
    
        let form;
        if(this.state.isAddSales && !this.state.isEditSales){
            form = <SalesForm onAddFormSubmit={this.onAddFormSubmit}
            isAddSales = {this.state.isAddSales}
            />
        }else if(this.state.isEditSales && !this.state.isAddSales){
            form = <SalesForm onAddFormSubmit={this.onAddFormSubmit}
            singleSales = {this.state.singleSales}
            />
        }else if(this.state.isDeleteSales){
            form = <DeleteRecord onDeleteRecord={this.onDeleteRecord}
            deleteId = {this.state.deleteId}
            />
        }

        return (
            <div>
                {form}
                <br/>
                <SalesView 
                    allSales = {this.state.sale}
                    onEditSales = {this.onEditSales} 
                    onCreate = {this.onCreate} 
                    onDeleteClick = {this.onDeleteClick}/>
            </div>
        )
    }

}