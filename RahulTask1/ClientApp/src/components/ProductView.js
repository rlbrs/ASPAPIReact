import React from 'react';
import { Table,Icon, Button,Dropdown } from 'semantic-ui-react';

export default class ProductView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            deleteTitle: "customer",
            isLoaded: false,
            formClose: false,
            singleCustomer: [],
            users: [],
            showMore: 2,
            currentPage: 1
        }
    }

    //fetch data 
    componentDidMount() {

        const productApi = 'https://localhost:44351/api/Products';

        const myHeader = new Headers();
        myHeader.append('Content-type', 'application/json');
        myHeader.append('Accept', 'application/json');
        myHeader.append('Origin', 'https://localhost:44351');

        const options = {
            method: 'GET',
            myHeader
        };

        fetch(productApi, options)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        users: result,
                        isLoaded: true
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: false,
                        error
                    });
                }
            )
    }

    showMoreRecord = (e, { value }) => {
        console.log(value)
        this.setState({
            currentPage:Number(value)
        });
    }

    render() {
        const { users, showMore,currentPage } = this.state;

        // Logic for displaying no of record per page
        const indexOfLastTodo = currentPage * showMore;
        const indexOfFirstTodo = indexOfLastTodo - showMore;
        const currentUsers = users.slice(indexOfFirstTodo, indexOfLastTodo);

        let noOfPages = [];
        for (var i = 1; i <= Math.ceil(users.length / showMore); i++) {
            noOfPages.push(i);
        }
        let showRecord = currentUsers.map(user => (
            <Table.Row key={user.productId}>
                <Table.Cell>{user.name}</Table.Cell>
                <Table.Cell>{user.price}</Table.Cell>

                <Table.Cell>
                    <Button color='yellow' icon labelPosition='right' 
                        onClick={() => this.props.onEditProducts(user.productId)}>
                            <Icon name='edit outline'/>
                            Edit</Button>
                </Table.Cell>

                <Table.Cell>
                    <Button color='red' icon labelPosition='right' 
                        onClick={() => this.props.onDeleteClick(user.productId)}>
                            <Icon name='trash alternate'/>
                            Delete</Button>
                </Table.Cell>

            </Table.Row>
        ))

        return (
            <div>
                
                <Button color='blue' onClick={() => this.props.onCreate()}>New Product</Button>
                <br/>
                <br/>
                <Table celled textAlign='center'>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Price</Table.HeaderCell>
                            <Table.HeaderCell>Action</Table.HeaderCell>
                            <Table.HeaderCell>Action</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body >
                        {
                            showRecord
                        }
                    </Table.Body>

                    <Table.Footer>
                        <Table.Row>
                            <Table.HeaderCell colSpan='3' textAlign='left'>
                            <Dropdown 
                                    selection
                                    compact
                                    options={noOfPages.map(noOfPages => ({ key: noOfPages, text: noOfPages, value: noOfPages }))}
                                    onChange={this.showMoreRecord}
                                />
                            </Table.HeaderCell>
                        <Table.HeaderCell floated='left'>
                        <label >{currentPage}</label>
                        </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>

            </div>
        )
    }

}
