import React  from "react";
import { Layout, Row, Col } from 'antd';
import {Box} from 'rebass'
import MainContent from "../components/MainContent";

const { Content } = Layout;
const Index = () => {
  return (
    <>
      <Layout style={{minHeight: '100vh'}}>
        <Layout>
          <Content>
            <Box marginY={[0,0,30,30]}>
              <Row justify="center">
                <Col xs={24} sm={24} md={18} lg={14}>
                  <MainContent />
                </Col>
              </Row>
            </Box>
          </Content>
        </Layout>
      </Layout>
    </>
  )
}



export default Index
