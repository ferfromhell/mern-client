import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Button,Segment, Header } from 'semantic-ui-react';
import { addPost } from '../../actions/postActions';

// import DrawArea from './DrawArea';

class PostForm extends Component {
  constructor(props){
    super(props);
    this.state ={
      text: '',
      tittle: '',
      errors: {}
    }
  }
  componentWillReceiveProps(newProps){
    console.log(newProps);
  }
  onSubmit =(e) =>{
    e.preventDefault()
    console.log(this.state);
    const { user } =this.props.auth;
    const newPost = {
      tittle: this.state.tittle,
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    };
    console.log(this.props);
    this.props.addPost(newPost);
    this.setState({tittle:'',text:''});
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  }
  render() {
    return (
      <Segment placeholder compact inverted color='grey'>
        <Header>
          Post something!
        </Header>
        <Form onSubmit={this.onSubmit}>
                <Form.Field>
                    <Form.Input type="text" name="tittle" onChange={this.onChange} placeholder='Tittle'/>
                    <Form.TextArea name="text" onChange={this.onChange} type="text" placeholder='Message'/>
                </Form.Field>
                <Form.Group widths='equal'>
                    {/* <DrawArea/> */}
                    {/* <DropImage/> */}
                </Form.Group>
                <Button type='submit' primary fluid>Post</Button>
        </Form>
      </Segment>
    )
  }
}

PostForm.propTypes ={
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired

}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default  connect(mapStateToProps, { addPost })(PostForm);