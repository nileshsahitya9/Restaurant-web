import React , { Component} from 'react';
import { Card, CardImg, CardText , CardBody,
    CardTitle,Breadcrumb,BreadcrumbItem,Modal,ModalBody,Button,ModalHeader,Row,Label,Col  } from 'reactstrap';
    import { Link } from 'react-router-dom'; 
    import { Control, LocalForm, Errors} from 'react-redux-form';
    import { Loading } from './LoadingComponent';
    import { baseUrl } from '../shared/baseUrl';
    import { FadeTransform, Fade } from 'react-animation-components';
    const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
    class CommentForm extends Component
    {
        constructor(props)
        {
            super(props);
            this.state =
            {
                isModalOpen: false
            };
            this.toggleModal = this.toggleModal.bind(this);
            this.handlesubmit = this.handlesubmit.bind(this);
        }
        toggleModal() {
            this.setState({
              isModalOpen: !this.state.isModalOpen
            });
          }
          handlesubmit(values)
          {
            this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
            console.log('Current State is: ' + JSON.stringify(values));
          }
          render()
          {
              return(
                  <div>
                <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Button</Button>
                <Modal isOpen={this.state.isModalOpen} >
                <ModalHeader toggle={this.toggleModal}>Submit Button</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values) => this.handlesubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={12}>Rating</Label>
                                <Col md={12}>
                                    <Control.select model=".rating" id="rating" name="rating"
                                        className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                        </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="name" md={12}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".name" id="name" name="name"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required,minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        className="form-control" rows="6">
                                        </Control.textarea>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10}}>
                                    <Button type="submit" color="primary">
                                    Submit
                                    </Button>
                                </Col>
                            </Row>
                            </LocalForm>
                            </ModalBody>
                            </Modal>
                            </div>
              );
          }
    }
   
    function RenderDish({dish})
    {
           return(
            <FadeTransform
            in
            transformProps={{
                exitTransform: 'scale(0.5) translateY(-50%)'
            }}>
                <Card>
                     <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                    </CardBody>
                    </Card>
                    </FadeTransform>
            );
        }
        function RenderComments({comment,postComment, dishId}){
            console.log("rendercomment in dish details");
            const all_comments = comment.map((comment)=>{
                
                return (
                    <Fade in>
                    <div key={comment.id}>
                    <ul className = "list-unstyled">
                    <li>{comment.comment}</li>
                    <li>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</li>
                    </ul>
                    </div>
                    </Fade>

                    
                );
            });
           
    
            return(
                <div>
                <h4>Comments</h4>
                {all_comments}
                <CommentForm dishId={dishId} postComment={postComment}/>
                </div>
            );
            
        }
        
        const DishDetail = (props) =>
        {
            if (props.isLoading) {
                return(
                    <div className="container">
                        <div className="row">            
                            <Loading />
                        </div>
                    </div>
                );
            }
            else if (props.errMess) {
                return(
                    <div className="container">
                        <div className="row">            
                            <h4>{props.errMess}</h4>
                        </div>
                    </div>
                );
            }
            else if (props.dish != null){
                return (
                    <div className="container">
                <div className="row">
                    <Breadcrumb>

                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                    <div className = "row">
                    <div className = "col-12 col-md-5 m-1">
                        <RenderDish dish = {props.dish}/>
                        </div>
                    <div className = "col-12 col-md-5 m-1 ">
                            <RenderComments comment = {props.comments}
                            postComment={props.postComment}
                            dishId={props.dish.id}/>
                        </div>
                       
                        </div>
                </div>
                )
            }
            else{
                return( 
                    <div></div>
                );
            }
        }
export default DishDetail;