import React from 'react';
import { Button, Modal, Icon } from 'semantic-ui-react';

export default class DeleteRecord extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ID:'',
            title: "",
            open: false
        }
        if(props.deleteId){
            console.log(props.deleteId)
            this.state.ID = props.deleteId.ID;
            this.state.title = props.deleteId.title;
            this.state.open = props.deleteId.open;
        }

    }

    //On cancel button click close Create user form
    closeCreateForm = () => {
        console.log("Clicked")
        this.setState({ open: false })
    }

    //Open Create new Customer form
    openCreateCustomer = () => {
        this.setState({ open: true })
    }

    render() {
        const title = "Delete " + this.state.title;

        return (
            <div>
                <Modal size='small' 
                closeOnTriggerMouseLeave={false} 
                open={this.state.open}>
                    <Modal.Header>
                        {title}
                    </Modal.Header>
                    <Modal.Content>
                        <br />

                        Are you sure?
                        
                        <br />
                        <br />
                        <Button floated='right' icon labelPosition='right' color='red'
                            value='true'
                            onClick={() => this.props.onDeleteRecord(this.state.ID)}
                        >
                            <Icon name='close' />
                            Delete
                        </Button>
                        <Button floated='right' color='black'
                            value='false'
                            onClick={this.closeCreateForm}
                        >Cancel</Button>

                        <br />
                        <br />
                    </Modal.Content>
                </Modal>
            </div>
        )
    }

}
