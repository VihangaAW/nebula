import React, { Component } from "react";
// import Button from 'antd/lib/button';
import "./App.css";
import {
  Button,
  Layout,
  Menu,
  Icon,
  Breadcrumb,
  Switch,
  notification,
  Tree,
  Row,
  Col,
  Input,
  message
} from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
const { Header, Content, Footer, Sider } = Layout;
const messageNotification = "";
const messageTitle = "";

const TreeNode = Tree.TreeNode;

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentType: "upload",
      setTheme: "dark",
      buttonTheme: "",
      notificationMsg: "",
      notificationTitle: ""
    };
    this.menuUploadClick = this.menuUploadClick.bind(this);
    this.menuDownloadClick = this.menuDownloadClick.bind(this);
    this.menuAboutClick = this.menuAboutClick.bind(this);
    this.themeChange = this.themeChange.bind(this);
    this.fileUploadClick = this.fileUploadClick.bind(this);
    this.folderUploadClick = this.folderUploadClick.bind(this);
  }
  onSelect = (selectedKeys, info) => {
    console.log("selected", selectedKeys, info);
  };
  menuUploadClick(e) {
    this.setState({ contentType: "upload" });
    console.log("Upload button was clicked.");
  }
  fileUploadClick(e) {
    notification["success"]({
      message: "File Upload Completed!",
      description: "File upload completed. To view files go to Download Window."
    });
    console.log("File Upload button was clicked!");
  }
  folderUploadClick(e) {
    notification["error"]({
      message: "Folder Upload Error!",
      description:
        "Folder Upload did not succeed! Check your internet connection, and try again"
    });
    console.log("Folder upload button was clicked.");
  }
  menuDownloadClick(e) {
    this.setState({ contentType: "download" });
    console.log("Download button was clicked.");
  }
  menuAboutClick(e) {
    this.setState({ contentType: "about" });
    console.log("About button was clicked.");
  }
  themeChange(checked) {
    if (checked) {
      this.setState({ setTheme: "dark", buttonTheme: "" });
    } else {
      this.setState({ setTheme: "light", buttonTheme: "primary" });
    }
    console.log(checked);
  }

  render() {
    let InsideContent;
    if (this.state.contentType == "upload") {
      InsideContent = (
        <div>
          <Button
            type={this.state.buttonTheme}
            onClick={this.fileUploadClick}
            style={{ margin: 10 }}
            icon="file-add"
          >
            File Upload
          </Button>
          <Button
            type={this.state.buttonTheme}
            onClick={this.folderUploadClick}
            style={{ margin: 10 }}
            icon="folder-add"
          >
            Folder Upload
          </Button>
        </div>
      );
    } else if (this.state.contentType == "download") {
      InsideContent = (
        <div>
          <Row>
            <Col span={8}>
              <Tree
                showLine
                defaultExpandedKeys={["0-0-0"]}
                onSelect={this.onSelect}
              >
                <TreeNode title="parent 1" key="0-0">
                  <TreeNode title="parent 1-0" key="0-0-0">
                    <TreeNode title="leaf" key="0-0-0-0" />
                    <TreeNode title="leaf" key="0-0-0-1" />
                    <TreeNode title="leaf" key="0-0-0-2" />
                  </TreeNode>
                  <TreeNode title="parent 1-1" key="0-0-1">
                    <TreeNode title="leaf" key="0-0-1-0" />
                  </TreeNode>
                  <TreeNode title="parent 1-2" key="0-0-2">
                    <TreeNode title="leaf" key="0-0-2-0" />
                    <TreeNode title="leaf" key="0-0-2-1" />
                  </TreeNode>
                </TreeNode>
              </Tree>
            </Col>
            <Col span={12}>col-12</Col>
          </Row>
        </div>
      );
    } else {
      InsideContent = (
        <div>
          <img
            alt="logo"
            src="https://avatars0.githubusercontent.com/u/40120499?s=200&v=4"
          />
          <p>
            Nebula is an open-source project aimed at making decentralized file
            storage accessible to everyone. Built on Blockchain technologies and
            the IPFS peer-to-peer hypermedia protocol, it allows users to store
            an unlimited amount of files for free. Nebula provides an intuitive
            user experience, while making no compromises on security and
            privacy. All files are replicated across the network, to provide
            maximum resiliency. State-of-the-art encryption mechanisms ensure
            the files are kept private.
          </p>
        </div>
      );
    }
    return (
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu
            theme={this.state.setTheme}
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            style={{ lineHeight: "64px" }}
          >
            <Menu.Item key="1" onClick={this.menuUploadClick}>
              <Icon type="cloud-upload-o" />Upload
            </Menu.Item>
            <Menu.Item key="2" onClick={this.menuDownloadClick}>
              <Icon type="cloud-download-o" />Download
            </Menu.Item>
            <Menu.Item key="3" onClick={this.menuAboutClick}>
              <Icon type="info-circle-o" />About
            </Menu.Item>
            {/* <Menu.Item key="4"></Menu.Item> */}
          </Menu>
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
            <Switch
              defaultChecked
              onChange={this.themeChange}
              checkedChildren="Dark"
              unCheckedChildren="Light"
              style={{ float: "right" }}
            />
            {InsideContent}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Nebula ©2018 Made with <Icon type="heart" /> by CubeFuse
        </Footer>
      </Layout>
    );
  }
}

var greetingMsg = "";
var backendResponse = "";
var cusername = "";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.checkAuthorized = this.checkAuthorized.bind(this);
  }

  handleChangeUsername(event) {
    this.setState({ username: event.target.value });
  }
  handleChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  checkAuthorized(ausername, apassword) {
    cusername = this.state.username;
    console.log(ausername);
    console.log(apassword);
    axios
      .post("http://localhost:8090/login", {
        username: ausername,
        password: apassword
      })
      .then(function(response) {
        //console.log(response);
        console.log("FUCKING AWESOME");
        console.log(response.data[0].returnValue);
        backendResponse = response.data[0].returnValue;
        console.log(backendResponse);
        console.log(response);
      })
      .catch(function(error) {
        //console.log(error);
        console.log(error.data[0].returnValue);
      });

    if (backendResponse == "accessGranted") {
      // if(this.state.password=="1234"){
      var d = new Date();
      var n = d.getHours();
      if (n < 12) {
        greetingMsg = "Good Morning! " + this.state.username;
      } else if (n >= 12 && n <= 13) {
        greetingMsg = "Good Afternoon! " + this.state.username;
      } else {
        greetingMsg = "Good Evening! " + this.state.username;
      }
      //greetingMsg="Hi! Hello World";
      //js window.location?
      this.props.history.push("/dashboard");
    }
    //  }
    else {
      message.error("Invalid Username/Password", 4);
      // event.preventDefault();
    }

    console.log("Clicked Login button");
  }
  render() {
    //console.log(this.state.username);
    return (
      <div className="App" style={{ width: "100%", height: "100%" }}>
        <Row>
          <Col span={12}>height: 'auto'}}/></Col>
          <Col span={12} style={{ paddingLeft: 40 }}>
            <h1>Login</h1>
            <Input
              value={this.state.username}
              onChange={this.handleChangeUsername}
              style={{ width: 500, textAlign: "center", margin: 5 }}
              placeholder="username"
            />
            <br />
            <Input
              value={this.state.password}
              onChange={this.handleChangePassword}
              style={{ width: 500, textAlign: "center", margin: 5 }}
              type="password"
              placeholder="password"
            />
            <br />
            <Button
              onClick={this.checkAuthorized.bind(
                this,
                this.state.username,
                this.state.password
              )}
              type="primary"
            >
              Login
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}
