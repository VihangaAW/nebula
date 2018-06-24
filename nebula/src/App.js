import React, { Component } from 'react';
import Button from 'antd/lib/button';
import './App.css';
import { Layout, Menu, Icon, Breadcrumb } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {contentType: "upload"}
    this.menuUploadClick = this.menuUploadClick.bind(this);
    this.menuDownloadClick = this.menuDownloadClick.bind(this);
    this.menuAboutClick = this.menuAboutClick.bind(this);
  }
  menuUploadClick(e) {
       this.setState({contentType: "upload"});
       console.log('Upload button was clicked.');
  }
  menuDownloadClick(e) {
    this.setState({contentType: "download"});
    console.log('Download button was clicked.');
  }
  menuAboutClick(e) {
    this.setState({contentType: "about"});
    console.log('About button was clicked.');
  }
  render() {
    let InsideContent;
    if (this.state.contentType=="upload") {
      InsideContent =
       <div>
       <Button  style={{margin:10}} icon="file-add" >File Upload</Button>
       <Button  style={{margin:10}} icon="folder-add" >Folder Upload</Button>
      </div>      
      ;
    } else if(this.state.contentType=="download"){
      InsideContent = <p>Download</p>;
    }else{
      InsideContent = 
     <div>
        <img alt="logo" src="https://avatars0.githubusercontent.com/u/40120499?s=200&v=4" />
      <p>Nebula is an open-source project aimed at making decentralized file storage accessible to everyone. Built on Blockchain technologies and the IPFS peer-to-peer hypermedia protocol, it allows users to store an unlimited amount of files for free.

      Nebula provides an intuitive user experience, while making no compromises on security and privacy. All files are replicated across the network, to provide maximum resiliency. State-of-the-art encryption mechanisms ensure the files are kept private.</p>
      </div>
      ;
    }
    return (
      <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="1" onClick={this.menuUploadClick}><Icon type="cloud-upload-o" />Upload</Menu.Item>
          <Menu.Item key="2" onClick={this.menuDownloadClick}><Icon type="cloud-download-o" />Download</Menu.Item>
          <Menu.Item key="3" onClick={this.menuAboutClick}><Icon type="info-circle-o" />About</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
        {InsideContent}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Nebula ©2018 Made with <Icon type="heart"/> by CubeFuse
      </Footer>
    </Layout>
    );
  }
}

export default App;