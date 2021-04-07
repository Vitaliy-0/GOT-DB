import React from 'react';
import { Row, Col } from 'reactstrap';

const RowBlock = ({left, right}) => {
    return (
        <>
            <Row>
            <Col lg={{size: 5, offset: 0}}>
                {left}
            </Col>
            <Col lg={{size: 5, offset: 0}}>
                {right}
            </Col>
            </Row>
        </>
    )
}

export default RowBlock;