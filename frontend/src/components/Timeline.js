import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Dropdown from 'react-bootstrap/Dropdown'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import axios from 'axios'

import DatePicker from 'react-datepicker'
// import calendar style 
// You can customize style by copying asset folder.
import 'react-datepicker/dist/react-datepicker.css'

import img from './testimg.jpg'
import './Timeline.scss'

export default function TimelinePage() {
    useEffect(() => {
        let getTestData = async () => {
            let test = await axios.post('https://gqpv8i4fuk.execute-api.us-east-1.amazonaws.com/Stage/asset-api/echo',{'test':'data'})
            console.log(test)
        }
        getTestData()
    },[])
    return (
        <>
            <Navbar className="timeline-nav" fixed="top" bg="dark" variant="dark">
                <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                </Nav>
                <ButtonToolbar>
                    <IntelligentFilters />
                    <PhotoPropFilters />
                    <TimeFilters />
                </ButtonToolbar>
            </Navbar>
            <Container className="timeline-page">
                <h5>Add filter bar</h5>
                <Gallery />
            </Container>
        </>
    )
}

function Gallery() {
    let [imgs, setImgs] = useState([])
    useEffect(() => {
        let getImgs = async () => {
            let imgs = await axios.get('imgs.json')
            console.log(imgs)
            setImgs(imgs)
        }
        getImgs()
    },[])
    return (
        <div className="gallery-container">
            <Row className="interval-container">
                <Col><img src={img} className="img"/></Col>
                <Col><img src={img} className="img"/></Col>
                <Col><img src={img} className="img"/></Col>
                <Col><img src={img} className="img"/></Col>
            </Row>
        </div>
    )
}

function CustTooltip ({children, text}) {
    return (
        <OverlayTrigger
            key="bottom"
            placement="bottom"
            overlay={
                <Tooltip id={uuidv4()}>
                    {text}
                </Tooltip>
            }
        >
            {children}
        </OverlayTrigger>
    )
}

function BaseFilter({btnIcon, children, className, tooltipText}) {
    let uuid = uuidv4()
    let baseClass = 'filter-dropdown-container'
    let newClassName = baseClass + ' ' + className 

    const [showMenu, setShowMenu] = useState(false)

    let cb = (isOpen, event, meta) => {
        let source = meta.source
        if (source === 'click' || !source) {
            setShowMenu(isOpen)
        }
    }
    return (
        <Dropdown onToggle={cb} show={showMenu} className={newClassName}>
            {tooltipText ? (
                <CustTooltip text={tooltipText}>
                    <Dropdown.Toggle variant="outline-primary" id={uuid}>
                        {btnIcon}
                    </Dropdown.Toggle>
                </CustTooltip>
            ) : (
                <Dropdown.Toggle variant="outline-primary" id={uuid}>
                    {btnIcon}
                </Dropdown.Toggle>
            )}
            <Dropdown.Menu className="filter-dropdown-menu" alignRight>
                {children}
            </Dropdown.Menu>
        </Dropdown>
    )
}

function TimeFilters () {
    const [startDate, setStartDate] = useState(new Date('2014/02/08'))
    const [endDate, setEndDate] = useState(new Date('2014/02/10'))
    return (
        <BaseFilter className="time-filters" btnIcon={<i class="material-icons-sharp"> schedule </i>}>
            <Row noGutters={true}>
                <Col>
                    <h6>Start</h6>
                    <DatePicker
                        selected={startDate}
                        onChange={date => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                    />
                </Col>
                <Col>
                    <h6>End</h6>
                    <DatePicker
                        selected={endDate}
                        onChange={date => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                    />
                </Col>
            </Row>
            <Row noGutters={true} className="mt-3">
                <Col>
                    <h6>Zoom</h6>
                    <ButtonToolbar className="center">
                        <Button variant="outline-primary" size="md">
                            1 month
                        </Button>
                        <Button variant="outline-primary" size="md">
                            3 months
                        </Button>
                        <Button variant="outline-primary" size="md">
                            6 months
                        </Button>
                        <Button variant="outline-primary" size="md">
                            All
                        </Button>
                    </ButtonToolbar>
                </Col>
            </Row>
        </BaseFilter>
    )
}

function PhotoPropFilters () {
    return (
        <BaseFilter 
            className="time-filters"
            btnIcon={<i class="material-icons-sharp"> group_work </i>}
            tooltipText="Photo filters"
        >
            <Row noGutters={true}>
                <h4>Photo filters</h4>
            </Row>
        </BaseFilter>
    )
}

function IntelligentFilters () {
    return (
        <BaseFilter className="time-filters" btnIcon={<i className="material-icons-sharp"> filter_list </i>}>
            <Row noGutters={true}>
                <h4>Intelligent filters</h4>
            </Row>
        </BaseFilter>
    )
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r && 0x3 | 0x8)
        return v.toString(16)
    })
}
