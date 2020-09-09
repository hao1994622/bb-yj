import React, {useEffect, useState} from 'react';
import { Radio, Typography, Form, Input, Button } from 'antd';
import {Flex} from 'rebass'
import "../styles/card.css"
import { UserOutlined, PhoneOutlined } from '@ant-design/icons';
import axios from 'axios'


const { Title, Text } = Typography;
const MainContent = () => {
  const [list, setList] = useState([]);

  const onFinish = async values => {
    console.log('Success:', values);
    const {name, phone, session} = values;
    const res = await axios.post('/baoming/',{
      name, phone, session
    });
    console.log(res);
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.post('/shuliang/');
        console.log(res)
        setList(res.data)
      }catch (e) {
        console.log(e)
        setList([{count: 0, session: 0}, {count: 5, session: 1}, {count: 1, session: 2}, {count: 0, session: 3}, {count: 0, session: 4}, {count: 0, session: 5}, {count: 0, session: 6}])
      }
    })()
  }, [])

  return (
    <Flex bg='#fff' className='card_contain' sx={{minHeight: ['100vh', '100vh', 'auto']}}>
        <Flex width={1} className='height100' flexDirection="column">
          <div style={{marginBottom: 50}}>
            <Title level={4}>建发磐龙府中秋博饼预约</Title>
            <Text  type="secondary">选择您所需要预约的信息，我们将在第一时间为您安排。</Text>
          </div>


          <Form
            name="basic"
            onFinish={onFinish}
          >
            <Form.Item
              labelCol={{span: 24}}
              label={<Text strong>姓名</Text>}
              name="name"
              rules={[{ required: true, message: '必填项' }]}
            >
              <Input prefix={<UserOutlined />} />
            </Form.Item>
            <Form.Item
              labelCol={{span: 24}}
              label={<Text strong>手机</Text>}
              name="phone"
              rules={[{ required: true, message: '必填项' }]}
            >
              <Input prefix={<PhoneOutlined />} />
            </Form.Item>


            <Form.Item
              labelCol={{span: 24}}
              label={<Text strong>博饼日期</Text>}
              name="session"
              rules={[{ required: true, message: '必填项' }]}
            >
              <Radio.Group value={1}>
                {list.map(item => (
                  <Radio key={item.session} className="radio_style" value={item.session}>
                    测试{item.session}（剩余{item.count}）
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>


            <Form.Item>
              <Flex justifyContent="center">
                <Button type="primary" htmlType="submit">
                  提交
                </Button>
              </Flex>

            </Form.Item>
          </Form>
        </Flex>
    </Flex>
  )
}

export default MainContent
