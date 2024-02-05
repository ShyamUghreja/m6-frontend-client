import React from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import '../search-box/search-box.sass';

function SearchBox() {
    return (
        <section>
          <div className="padding-section">
            <Container className='default-container'>
            <Row>
              <Col>
                <div className="search-input position-relative">
                  <i className="search-icon ri-search-line"></i>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Control className='w-100' type="email" placeholder="Search by key term, topic, author" />
                  </Form.Group>
                </div>
              </Col>
            </Row>
            </Container>
          </div>
        </section>
    );
}

export default SearchBox;
