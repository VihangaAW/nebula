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

const DemoBox = props => (
  <p className={`height-${props.value}`}>{props.children}</p>
);

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentType: "summary",
      setTheme: "dark",
      buttonTheme: "",
      notificationMsg: "",
      notificationTitle: "",
      greeting: greetingMsg
    };
    this.menuUploadClick = this.menuUploadClick.bind(this);
    this.menuDownloadClick = this.menuDownloadClick.bind(this);
    this.menuAboutClick = this.menuAboutClick.bind(this);
    this.themeChange = this.themeChange.bind(this);
    this.fileUploadClick = this.fileUploadClick.bind(this);
    this.folderUploadClick = this.folderUploadClick.bind(this);
    this.menuSummaryClick = this.menuSummaryClick.bind(this);
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
  menuSummaryClick(e) {
    this.setState({ contentType: "summary" });
    console.log("Summary button was clicked.");
  }
  logoutSession(e) {
    this.props.history.push("/app");
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
    } else if (this.state.contentType == "summary") {
      InsideContent = (
        <div>
          <h1> {this.state.greeting}</h1>
          <Button
            type="danger"
            onClick={this.logoutSession.bind()}
            style={{ float: "right", marginTop: 30 }}
          >
            Logout
          </Button>
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
            <Menu.Item key="1" onClick={this.menuSummaryClick}>
              <Icon type="cloud-upload-o" />Summary
            </Menu.Item>
            <Menu.Item key="2" onClick={this.menuUploadClick}>
              <Icon type="cloud-upload-o" />Upload
            </Menu.Item>
            <Menu.Item key="3" onClick={this.menuDownloadClick}>
              <Icon type="cloud-download-o" />Download
            </Menu.Item>
            <Menu.Item key="4" onClick={this.menuAboutClick}>
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
    this.state = {
      username: "",
      password: "",
      userEmail: "",
      loginReg: "login"
    };
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.checkAuthorized = this.checkAuthorized.bind(this);
    this.moveToRegister = this.moveToRegister.bind(this);
    this.moveToLogin = this.moveToLogin.bind(this);
    this.registerUser = this.registerUser.bind(this);
    this.handleChangeUserEmail = this.handleChangeUserEmail.bind(this);
  }

  handleChangeUsername(event) {
    this.setState({ username: event.target.value });
  }
  handleChangePassword(event) {
    this.setState({ password: event.target.value });
  }
  handleChangeUserEmail(event) {
    this.setState({ userEmail: event.target.value });
  }
  moveToRegister(event) {
    this.setState({ loginReg: "register" });
  }
  moveToLogin(event) {
    this.setState({ loginReg: "login" });
  }
  checkAuthorized(ausername, apassword) {
    cusername = this.state.username;
    console.log(ausername);
    console.log(apassword);
    if (ausername == "") {
      message.error("Please enter an username", 4);
    } else if (apassword == "") {
      message.error("Please enter an password", 4);
    } else {
      axios
        .post("http://localhost:8090/login", {
          username: ausername,
          password: apassword
        })
        .then(function(response) {
          //console.log(response);
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
      else if (backendResponse == "invalidPassword") {
        console.log("inside invalid pasword");
        message.error("Invalid Password", 4);
        // event.preventDefault();
      } else if (backendResponse == "invalidUsername") {
        console.log("inside invalid pasword");
        message.error("Invalid Username", 4);
        // event.preventDefault();
      }
    }
    console.log("Clicked Login button");
  }
  registerUser(ausername, apassword, aemail) {
    cusername = this.state.username;
    console.log(ausername);
    console.log(apassword);
    console.log(aemail);
    if (ausername == "") {
      message.error("Please enter an username", 4);
    } else if (apassword == "") {
      message.error("Please enter an password", 4);
    } else if (aemail == "") {
      message.error("Please enter an email address", 4);
    } else {
      axios
        .post("http://localhost:8090/register", {
          username: ausername,
          password: apassword,
          userEmail: aemail
        })
        .then(function(response) {
          //console.log(response);
          console.log(response.data[0].returnValue);
          backendResponse = response.data[0].returnValue;
          console.log(backendResponse);
          console.log(response);
        })
        .catch(function(error) {
          //console.log(error);
          console.log(error.data[0].returnValue);
        });

      if (backendResponse == "registered") {
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
      else if (backendResponse == "usernameExists") {
        console.log(backendResponse);
        message.error("Username is already exists! Try another one", 4);
        // message.error("Invalid Username/Password", 4);
        // event.preventDefault();
      } else if (backendResponse == "emailExists") {
        message.error("Email address is already exists.", 4);
        console.log(backendResponse);
      }
    }
    console.log("Clicked Login button");
  }
  render() {
    let InsideLoginRegister;
    if (this.state.loginReg == "login") {
      InsideLoginRegister = (
        <div>
          <img
            alt="logo"
            src="https://avatars0.githubusercontent.com/u/40120499?s=200&v=4"
          />
          <h1>Login</h1>
          <Input
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            value={this.state.username}
            onChange={this.handleChangeUsername}
            style={{ width: 350, textAlign: "center", margin: 5 }}
            placeholder="username"
          />
          <br />
          <Input
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            value={this.state.password}
            onChange={this.handleChangePassword}
            style={{ width: 350, textAlign: "center", margin: 5 }}
            type="password"
            placeholder="password"
          />
          <br />
          <Row>
            <Col>
              <Button
                style={{ margin: 5 }}
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
            <Col>
              <Button onClick={this.moveToRegister.bind()}>
                Need an account? Sign Up
              </Button>
            </Col>
          </Row>
        </div>
      );
    } else {
      InsideLoginRegister = (
        <div>
          <img
            alt="logo"
            src="https://avatars0.githubusercontent.com/u/40120499?s=200&v=4"
          />
          <h1>Register</h1>
          <Input
            prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
            value={this.state.userEmail}
            onChange={this.handleChangeUserEmail}
            style={{ width: 350, textAlign: "center", margin: 5 }}
            placeholder="email"
            type="email"
          />
          <br />
          <Input
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            value={this.state.username}
            onChange={this.handleChangeUsername}
            style={{ width: 350, textAlign: "center", margin: 5 }}
            placeholder="username"
          />
          <br />
          <Input
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            value={this.state.password}
            onChange={this.handleChangePassword}
            style={{ width: 350, textAlign: "center", margin: 5 }}
            type="password"
            placeholder="password"
          />
          <br />
          <Row>
            <Col>
              <Button
                style={{ margin: 5 }}
                onClick={this.registerUser.bind(
                  this,
                  this.state.username,
                  this.state.password,
                  this.state.userEmail
                )}
                type="primary"
              >
                Register
              </Button>
            </Col>
            <Col>
              <Button onClick={this.moveToLogin.bind()}>
                Already a member? Sign in
              </Button>
            </Col>
          </Row>
        </div>
      );
    }
    //console.log(this.state.username);
    return (
      <div className="App" style={{ width: "100%", height: "100%" }}>
        <Row type="flex" justify="space-around" align="middle">
          <Col span={8}>
            <DemoBox value={50}>{InsideLoginRegister}</DemoBox>
          </Col>
        </Row>
      </div>
    );
  }
}
