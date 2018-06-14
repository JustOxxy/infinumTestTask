import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import {
  Button,
  Card,
  Col,
  Divider,
  DatePicker,
  Form,
  Icon,
  Input,
  Row
} from "antd";
import moment from "moment";
import uuidv4 from "uuid/v4";

const dateFormat = "D MMMM YYYY";
const { TextArea } = Input;

const FormItem = Form.Item;

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateCreated: moment(),
      number: "",
      dateSupply: moment(),
      comment: "",
      redirect: false
    };
    this.handleClick = this.handleClick.bind(this);

    this.handleDateCreatedChange = this.handleDateCreatedChange.bind(this);
    this.handleNumberChange = this.handleNumberChange.bind(this);
    this.handleDateSupplyChange = this.handleDateSupplyChange.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
  }

  handleClick(event) {
    event.preventDefault();

    fetch("http://localhost:8000/invoices", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date_created: this.state.dateCreated.format("D MMMM YYYY"),
        number: this.state.number,
        date_supply: this.state.dateSupply.format("D MMMM YYYY"),
        comment: this.state.comment,
        id: uuidv4()
      })
    })
      .then(res => {
        this.setState({
          redirect: true
        });
        return res.json();
      })
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }

  handleDateCreatedChange(event) {
    this.setState({ dateCreated: event });
  }

  handleNumberChange(event) {
    parseInt(this.setState({ number: event.target.value }), 10);
  }

  handleDateSupplyChange(event) {
    this.setState({ dateSupply: event });
  }

  handleCommentChange(event) {
    this.setState({ comment: event.target.value });
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
  };

  render() {
    return (
      <div style={{ background: "#f5f5f5" }}>
        {this.renderRedirect()}
        <div style={{ padding: 24, minHeight: 280 }}>
          <Divider orientation="left">Create Invoice </Divider>

          <Form>
            <Card bordered={false} style={{ width: 1400 }}>
              <Card style={{ width: 1340 }}>
                <Row gutter={16}>
                  <Col span={12}>Number:</Col>
                  <Col span={12}>Invoice Date:</Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <FormItem>
                      <Input
                        addonAfter={<Icon type="setting" />}
                        value={this.state.number}
                        onChange={this.handleNumberChange}
                      />
                    </FormItem>
                  </Col>

                  <Col span={12}>
                    <FormItem>
                      <DatePicker
                        style={{ width: 630 }}
                        value={this.state.dateCreated}
                        format={dateFormat}
                        onChange={this.handleDateCreatedChange}
                      />
                    </FormItem>
                  </Col>
                </Row>
                <br />

                <Row>
                  <Col span={12}>Supply Date:</Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <DatePicker
                      format={dateFormat}
                      value={this.state.dateSupply}
                      onChange={this.handleDateSupplyChange}
                      style={{ width: 630 }}
                    />
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col span={12}>Comment:</Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <TextArea
                      value={this.state.comment}
                      onChange={this.handleCommentChange}
                      rows={2}
                    />
                  </Col>
                </Row>
              </Card>
              <br />

              <Button
                style={{ position: "relative", left: 1278 }}
                type="primary"
                htmlType="submit"
                onClick={this.handleClick}
              >
                Save
              </Button>
            </Card>
          </Form>
        </div>
      </div>
    );
  }
}

export default Create;
