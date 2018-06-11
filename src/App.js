import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import "antd/dist/antd.css";
import "./App.css";
import { Table, Card, Divider, Icon, Popconfirm } from "antd";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invoices: []
    };
    this.columns = [
      {
        title: "Create",
        dataIndex: "date_created",
        key: "create",
        render: text => <a href="javascript:;">{text}</a>
      },
      {
        title: "id",
        dataIndex: "id",
        key: "id"
      },
      {
        title: "Supply",
        dataIndex: "date_supply",
        key: "supply"
      },
      {
        title: "Comment",
        dataIndex: "comment",
        width: "30%",
        key: "comment"
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => {
          return (
            <span>
              <Link to={`/update/${record.id}`}>Edit</Link>
              <Divider type="vertical" />
              <Popconfirm
                title="Sure to delete?"
                onConfirm={() => this.onDelete(record.id)}
              >
                <a href="javascript:;">Remove</a>
              </Popconfirm>
            </span>
          );
        }
      }
    ];
  }

  async componentDidMount() {
    const res = await fetch("http://localhost:8000/invoices");
    const getInvoices = await res.json();
    this.setState({ invoices: getInvoices });
  }

  onEdit = key => {
    return fetch("http://localhost:8000/invoices/" + key, {
      method: "get",
      mode: "cors"
    }).then(resp => resp.json());
  };

  onDelete = key => {
    return fetch("http://localhost:8000/invoices/" + key, {
      method: "delete",
      mode: "cors"
    })
      .then(resp => resp.json())
      .then(resp => {
        console.log("the list after deleting...", resp);
        this.setState({
          invoices: this.state.invoices.filter(item => item.id !== key)
        });
      });
  };

  render() {
    return (
      <div style={{ padding: 24, minHeight: 280, background: "#f5f5f5" }}>
        <Divider orientation="left">Invoices</Divider>
        <Card bordered={false} style={{ width: 1400 }}>
          <p style={{ color: "#000000" }}>Actions</p>
          <Button type="primary">
            <Link to="/create">Add new</Link>
          </Button>
        </Card>
        <br />
        <div>
          <Card bordered={false} style={{ width: 1400 }}>
            <p style={{ color: "#000000" }}>Invoices</p>
            <Table
              rowKey="id"
              columns={this.columns}
              dataSource={this.state.invoices}
            />
          </Card>
        </div>
      </div>
    );
  }
}

export default App;
