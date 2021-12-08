import React, { useState } from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Table from 'react-bootstrap/Table'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import Button from 'react-bootstrap/Button'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'

import './Acc.scss'

export default function AccPage({}) {
    const now = 60
    const [value, setValue] = useState([])
    const handleChange = val => setValue(val)

    let planTable = () => {
        return (
            <>
                <Table responsive striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Plan</th>
                            <th>Price</th>
                            <th>Allocation*</th>
                            <th>Approx. # Photos</th>
                            <th>Additional storage costs</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Basic</td>
                            <td>Free</td>
                            <td>1 Gigabyte</td>
                            <td>200</td>
                            <td>Not allowed*</td>
                        </tr>
                        <tr>
                            <td>Hobbyist</td>
                            <td>10$/mo</td>
                            <td>250 Gigabytes</td>
                            <td>25,000</td>
                            <td>$0.045/GB*</td>
                        </tr>
                        <tr>
                            <td>Professional</td>
                            <td>15$/mo</td>
                            <td>500 Gigabytes</td>
                            <td>50,000</td>
                            <td>$0.025/GB*</td>
                        </tr>
                    </tbody>
                </Table>
                <p>*Clients using the free plan or with hard limits turn on will have media scaled and compressed which may result in quality loss. You will not be billed- usage for these assets storage usage.</p>
            </>
        )
    }
    let addressForm = () => {
        return (
            <>
                <Form>
                    <Form.Row>
                        <Col>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Email</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl type="email" placeholder="Email" />
                            </InputGroup>
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col>
                            <Form.Group controlId="exampleForm.ControlInput1">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="John Doe" />
                            </Form.Group>
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col>
                            <Form.Group controlId="exampleForm.ControlInput1">
                                <Form.Label>Street</Form.Label>
                                <Form.Control type="text" placeholder="1999 anywhere st" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="exampleForm.ControlInput1">
                                <Form.Label>Unit</Form.Label>
                                <Form.Control type="text" placeholder="(Optional) Apt 320" />
                            </Form.Group>
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col>
                            <Form.Group controlId="exampleForm.ControlInput1">
                                <Form.Label>City</Form.Label>
                                <Form.Control type="text" placeholder="City" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="exampleForm.ControlInput2">
                                <Form.Label>State</Form.Label>
                                <Form.Control type="text" placeholder="State" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="exampleForm.ControlInput3">
                                <Form.Label>Zip</Form.Label>
                                <Form.Control type="text" placeholder="zip" />
                            </Form.Group>
                        </Col>
                    </Form.Row>
                    
                </Form>
                
            </>
        )
    }
    let managePlan = () => {
        return (
            <ButtonToolbar className="center">
                <Button variant="primary" size="lg">
                    Manage subscription
                </Button>
                <ToggleButtonGroup type="checkbox" value={value} onChange={handleChange}>
                    <ToggleButton variant="outline-danger" value={1}>{(value[0]===1) ? 'Enable Storage Limit' : 'Disable Storage Limit'}</ToggleButton>
                </ToggleButtonGroup>
            </ButtonToolbar>
        )
    }
    let connections = () => {
        return (
            <ButtonToolbar className="center">
                <Button variant="outline-primary" size="lg">
                    GDrive
                </Button>
                <Button variant="outline-primary" size="lg">
                    ICloud
                </Button>
                <Button variant="outline-primary" size="lg">
                    Instagram
                </Button>
                <Button variant="outline-primary" size="lg">
                    Facebook
                </Button>
            </ButtonToolbar>
        )
    }
    let dangerzone = () => {
        return (
            <ButtonToolbar className="center">
                <Button variant="outline-danger" size="lg">
                    Reset password
                </Button>
                <Button variant="outline-danger" size="lg">
                    Download your data
                </Button>
                <Button variant="outline-danger" size="lg">
                    Delete your account
                </Button>
            </ButtonToolbar>
        )
    }
    return (
        <Container className="p-3 acc-page">
            <Row>
                <Col>
                    <Jumbotron>
                        <h4>Current Usage: 600 of 1000MB (Free plan)</h4>
                        <ProgressBar className="mb-3" now={now} />
                        <h4>Plans</h4>
                        {planTable()}
                        <h4>Manage Your Plan</h4>
                        {managePlan()}
                    </Jumbotron>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Jumbotron>
                        <Row>
                            <Col xs={12} className="center">
                                <i class="material-icons-sharp hero-icon"> account_box </i>
                            </Col>
                        </Row>
                        
                        <h4>Account Details</h4>
                        {addressForm()}
                        <h4>Your Connections</h4>
                        {connections()}
                        <h4>Danger Zone</h4>
                        {dangerzone()}
                    </Jumbotron>
                </Col>
            </Row>
        </Container>
    )
}