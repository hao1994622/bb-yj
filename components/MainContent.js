import React, {useEffect, useState} from 'react';
import { Radio, Typography, Form, Input, Button, Result } from 'antd';
import {Flex} from 'rebass'
import "../styles/card.css"
import { UserOutlined, PhoneOutlined } from '@ant-design/icons';
import axios from 'axios'


const { Title, Text } = Typography;

const listInit = [
  '央著16日',
  '央著17日',
  '央誉18日',
  '央誉19日',
  '玉湖壹号20日',
  '磐龙府21日',
  '磐龙府22日'
]

const MainContent = () => {
  const [list, setList] = useState([]);
  const [showRes, setShowRes] = useState(false);
  const [resStatus, setResStatus] = useState({
    type: 'warning',
    msg: '服务器开小差~'
  });

  const onFinish = async values => {
    console.log('Success:', values);
    const {name, phone, session} = values;
    try {
      const res = await axios.post('/baoming/',{
        name, phone, session
      });
      console.log(res);
      if(res.data === 0) {
        setResStatus({
          type: 'success',
          msg: '成功'
        })
      } else if(res.data === 1) {
        setResStatus({
          type: 'info',
          msg: '该场次已满'
        })
      } else {
        setResStatus({
          type: 'warning',
          msg: '服务器开小差~'
        })
      }
      setShowRes(true)
    }catch (e) {
      console.log(e)
      setResStatus({
        type: 'warning',
        msg: '服务器开小差~'
      })
      setShowRes(true)
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.post('/shuliang/');
        console.log(res)
        setList(res.data.map(i => {
          const newI = i;
          newI.title = listInit[i.session];
          return newI;
        }))
      }catch (e) {
        console.log(e)
        setList([
            {
              title: '测试0', count: 0, session: 0
            }, {
              title: '测试1', count: 5, session: 1
            }, {
              title: '测试2', count: 1, session: 2
          }
          ]
        )
      }
    })()
  }, [])

  return (
    <>
      {showRes ? (
        <Result
          status={resStatus.type}
          title={resStatus.msg}
          extra={resStatus.type !== 'success' &&
            <Button type="primary" onClick={() => setShowRes(false)}>
              重选
            </Button>
          }
        />
      ) : (
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
                rules={[{
                  required: true, message: '必填项'
                },
                  {
                    pattern: /^1\d{10}( 1\d{10})*$/,
                    message: '手机号格式不正确',
                  }
                ]}
              >
                <Input prefix={<PhoneOutlined />} />
              </Form.Item>

              <br/>
              <Form.Item
                labelCol={{span: 24}}
                label={<Text strong>博饼日期</Text>}
                name="session"
                rules={[{ required: true, message: '必填项' }]}
              >
                <Radio.Group value={1}>
                  {list.map(item => (
                    <Radio key={item.session} className="radio_style" value={item.session}>
                      {item.title}（剩余{item.count}）
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
      )}

    </>
  )
}

export default MainContent
