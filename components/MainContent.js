import React, {useEffect, useState} from 'react';
import { Radio, Typography, Form, Input, Button, Result, Select } from 'antd';
import {Flex} from 'rebass'
import "../styles/card.css"
import { UserOutlined, PhoneOutlined, HomeOutlined } from '@ant-design/icons';
import { get, post } from 'axios'

const { Title, Text } = Typography;
const { Option } = Select;

// const listInit = [
//   '央著16日',
//   '央著17日',
//   '央誉18日',
//   '央誉19日',
//   '玉湖壹号20日',
//   '磐龙府21日',
//   '磐龙府22日'
// ]

const MainContent = () => {
  const [list, setList] = useState([]);
  const [currentRoom, setCurrentRoom] = useState('yangzhu');
  const [showRes, setShowRes] = useState(false);
  const [resStatus, setResStatus] = useState({
    type: 'warning',
    msg: '服务器开小差~'
  });

  const onFinish = async values => {
    console.log('Success:', values);
    const {name, phone, room, xiaoqu, session} = values;
    try {
      const res = await axios.post('/baoming/',{
        name, phone, room, xiaoqu, session
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
      } else if(res.data === 2) {
        setResStatus({
          type: 'info',
          msg: '房间号与人名不符合'
        })
      } else if(res.data === 3) {
        setResStatus({
          type: 'info',
          msg: '已经预约过了'
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
        const wxConfig = await get('/weixin_config/');
        // const shareInfo = await get('/share_info/');
        console.log(wxConfig.data)
        // console.log(shareInfo.data)
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，
          jsApiList: ['onMenuShareAppMessage','onMenuShareTimeline'], // 必填，需要使用的JS接口列表
          ...wxConfig.data
        });
        wx.ready(function(){
          wx.onMenuShareAppMessage({
            // ...shareInfo.data,
            desc: "博饼预约盛大启动",
            imgUrl: "http://www.0lianchao.com/static/pic/timg1.jpg",
            link: "http://www.0lianchao.com/runoob/",
            title: "建发磐龙府中秋博饼预约",
            success: function () {
              alert("分享微信好友成功！");
            },
            cancel: function () {
              alert('分享微信好友失败');
            }
          });
          wx.onMenuShareTimeline({
            // ...shareInfo.data,
            desc: "博饼预约盛大启动",
            imgUrl: "http://www.0lianchao.com/static/pic/timg1.jpg",
            link: "http://www.0lianchao.com/runoob/",
            title: "建发磐龙府中秋博饼预约",
            success: function () {
              alert("分享微信好友成功！");
            },
            cancel: function () {
              alert('分享朋友圈失败');
            }
          });
        });
      }catch (e) {
        console.log(e)
      }
      try {
        const res = await post('/shuliang/');
        console.log(res)
        setList(res.data)
      }catch (e) {
        console.log(e)
      }
    })()
  }, [])

  return (
    <>
      {showRes && (
        <Result
          status={resStatus.type}
          title={resStatus.msg}
          extra={resStatus.type !== 'success' &&
            <Button type="primary" onClick={() => setShowRes(false)}>
              重选
            </Button>
          }
        />
      )}
      <Flex style={{display: showRes && 'none'}} bg='#fff' className='card_contain' sx={{minHeight: ['100vh', '100vh', 'auto']}}>
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
            <Form.Item
              labelCol={{span: 24}}
              label={<Text strong>房号</Text>}
              name="room"
              rules={[
                { required: true, message: '必填项' },
                {
                  pattern: /^[0-9]+#[0-9]+$/,
                  message: '房号格式不正确',
                }
              ]}
            >
              <Input placeholder="1#203" prefix={<HomeOutlined />} />
            </Form.Item>
            <br/>


            <Form.Item
              labelCol={{span: 24}}
              label={<Text strong>博饼日期</Text>}
            >
              {/*<Radio.Group value={1}>*/}
              {/*  {list.map(item => (*/}
              {/*    <Radio key={item.session} className="radio_style" value={item.session}>*/}
              {/*      {item.title}（剩余{item.count}）*/}
              {/*    </Radio>*/}
              {/*  ))}*/}
              {/*</Radio.Group>*/}

              <Form.Item
                labelCol={{span: 24}}
                name="xiaoqu"
                rules={[{ required: true, message: '必填项' }]}
              >
                <Select placeholder="选择小区" onChange={val => setCurrentRoom(val)}>
                  <Option value="0">央著</Option>
                  <Option value="1">央誉</Option>
                  <Option value="2">玉湖壹号</Option>
                  <Option value="3">磐龙府</Option>
                </Select>
              </Form.Item>

              <Form.Item
                labelCol={{span: 24}}
                name="session"
                rules={[{ required: true, message: '必填项' }]}
              >
                {list.length > 0 ? (
                  <Radio.Group>
                    {currentRoom === '0' && (<>
                      <Radio value={0}>16日（余{list[0].count}）</Radio>
                      <Radio name="session" value={1}>17日（余{list[1].count}）</Radio>
                    </>)}
                    {currentRoom === '1' && (<>
                      <Radio value={2}>18日（余{list[2].count}）</Radio>
                      <Radio value={3}>19日（余{list[3].count}）</Radio>
                    </>)}
                    {currentRoom === '2' && (<>
                      <Radio value={4}>20日（余{list[4].count}）</Radio>
                    </>)}
                    {currentRoom === '3' && (<>
                      <Radio value={5}>21日（余{list[5].count}）</Radio>
                      <Radio value={6}>22日（余{list[6].count}）</Radio>
                    </>)}
                  </Radio.Group>
                ) : <Text type='danger'>服务器开小差，请刷新重试</Text>}
              </Form.Item>


              {/*{list.length > 0 && (*/}
              {/*  <>*/}
              {/*    <Input.Group compact>*/}
              {/*      <Form.Item noStyle>*/}
              {/*        <Select placeholder="选择小区" defaultValue='yangzhu' onChange={val => setCurrentRoom(val)}>*/}
              {/*          <Option value="yangzhu">央著</Option>*/}
              {/*          <Option value="yangyu">央誉</Option>*/}
              {/*          <Option value="yuhu">玉湖壹号</Option>*/}
              {/*          <Option value="panlong">磐龙府</Option>*/}
              {/*        </Select>*/}
              {/*      </Form.Item>*/}
              {/*      <br/>*/}
              {/*      <br/>*/}
              {/*      <Radio.Group onChange={val => setDate(val)}>*/}
              {/*        {currentRoom === 'yangzhu' && (<>*/}
              {/*          <Radio value={0}>16日（余{list[0].count}）</Radio>*/}
              {/*          <Radio name="session" value={1}>17日（余{list[1].count}）</Radio>*/}
              {/*        </>)}*/}
              {/*        {currentRoom === 'yangyu' && (<>*/}
              {/*          <Radio value={2}>18日（余{list[2].count}）</Radio>*/}
              {/*          <Radio value={3}>19日（余{list[3].count}）</Radio>*/}
              {/*        </>)}*/}
              {/*        {currentRoom === 'yuhu' && (<>*/}
              {/*          <Radio value={4}>20日（余{list[4].count}）</Radio>*/}
              {/*        </>)}*/}
              {/*        {currentRoom === 'panlong' && (<>*/}
              {/*          <Radio value={5}>21日（余{list[5].count}）</Radio>*/}
              {/*          <Radio value={6}>22日（余{list[6].count}）</Radio>*/}
              {/*        </>)}*/}
              {/*      </Radio.Group>*/}
              {/*    </Input.Group>*/}
              {/*    {!date && <Text type="danger">请选择日期</Text>}*/}
              {/*  </>*/}
              {/*)}*/}

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
    </>
  )
}

export default MainContent
