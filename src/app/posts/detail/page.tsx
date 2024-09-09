"use client"
import {
    Carousel, Avatar, Card, Row, Col, Typography, Flex, Tag,
    Divider,
    Input,
    Button
} from 'antd'
import React, { useState } from 'react'
import { CommentOutlined, HeartOutlined, StarOutlined } from "@ant-design/icons"
const { Title, Text, Paragraph } = Typography
const contentStyle: React.CSSProperties = {
    margin: 0,
    height: '80vh',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
}
const Detail = () => {
    const [comment, setComment] = useState(false)
    const [submitValue,setSubmitValue] = useState("")
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSubmitValue(e.target.value)
    }
    const hanldeSumbit = () =>{
        console.log(submitValue)
    }
    return (
        <div style={{ margin: "5vh 10vw",height:"100vh" }} >
            <Card>
                <Row gutter={32}>
                    <Col xs={24} sm={24} md={12}>
                        <Carousel arrows infinite={false}>
                            <div>
                                <h3 style={contentStyle}>1</h3>
                            </div>
                            <div>
                                <h3 style={contentStyle}>2</h3>
                            </div>
                            <div>
                                <h3 style={contentStyle}>3</h3>
                            </div>
                            <div>
                                <h3 style={contentStyle}>4</h3>
                            </div>
                        </Carousel>
                    </Col>
                    <Col xs={24} sm={24} md={12} style={{ position: 'relative' }}>
                        <Flex gap={10}>
                            <Avatar></Avatar>
                            <Title level={5} className='!text-gray-400'>Jonh
                            </Title>
                        </Flex>
                        <div style={{ overflowY: "auto", height: "70vh" }}>
                            <Flex vertical>
                                <Title level={4} className='!font-bold' >The Importance of Time Management</Title>
                                <Paragraph className='text-l'>
                                    Time management is an essential skill that can significantly impact both personal and professional life. By effectively managing time, individuals can increase productivity, reduce stress, and achieve a better work-life balance. Prioritizing tasks, setting clear goals, and minimizing distractions are key strategies for improving time management. With proper planning, people can make the most of their day, ensuring they meet deadlines and have time for relaxation and personal pursuits. Ultimately, mastering time management leads to greater success and fulfillment in all areas of life.<Tag color="gold" bordered={false} className='w-auto'>Transportation</Tag>
                                </Paragraph>
                                <Text className='text-gray-400'>2023-12-19</Text>
                            </Flex>
                            <Divider plain />
                            <Text className='text-gray-400'>Comments(11)</Text>
                            <Flex gap={10} className='!mt-3'>
                                <Avatar></Avatar>
                                <Title level={5} className='!text-gray-400'>Jonh
                                </Title>
                            </Flex>
                            <Flex vertical>
                                <Text className='!mt-4'>Really like you!</Text>
                                <Text className='text-gray-400'>2023-12-19</Text>
                            <Flex gap={5}><HeartOutlined onClick={()=>console.log("点赞+1")}/>1
                                <CommentOutlined />2</Flex>
                            </Flex>
                            <Flex gap={10} className='!mt-3'>
                                <Avatar></Avatar>
                                <Title level={5} className='!text-gray-400'>Jonh
                                </Title>
                            </Flex>
                            <Text className='!mt-4'>Really like you!</Text>
                            <Flex gap={10} className='!mt-3'>
                                <Avatar></Avatar>
                                <Title level={5} className='!text-gray-400'>Jonh
                                </Title>
                            </Flex>
                            <Text className='!mt-4'>Really like you!</Text>
                            <Text className='text-gray-400'>2023-12-19</Text>
                            <Flex gap={10} className='!mt-3'>
                                <Avatar></Avatar>
                                <Title level={5} className='!text-gray-400'>Jonh
                                </Title>
                            </Flex>
                            <Text className='!mt-4'>Really like you!</Text>
                            <Flex gap={10} className='!mt-3'>
                                <Avatar></Avatar>
                                <Title level={5} className='!text-gray-400'>Jonh
                                </Title>
                            </Flex>
                            <Text className='!mt-4'>Really like you!</Text>
                        </div>
                        {comment?
                        <Flex vertical gap={3} style={{ position: 'absolute', bottom: 0, width: '90%', padding: '10px',background:"white" }}>
                            <Input style={{ borderRadius: "20px", padding: "10px" }} maxLength={200} showCount onChange={(e)=>handleInput(e)} value={submitValue}/>
                            <Flex gap={3} justify='end'>
                            <Button type='primary' danger onClick={()=>hanldeSumbit()}>Submit</Button>
                            <Button onClick={()=>setComment(false)}>Cancel</Button>
                            </Flex>
                        </Flex>
                        :<Flex gap={10}>
                            <div style={{ display: 'flex', alignItems: 'center', padding: '5px', backgroundColor: '#f5f5f5', borderRadius: '20px'}}>
                                <Avatar size={30} style={{ marginRight: '10px' }}></Avatar>
                                <Input placeholder='Leave a comment...'style={{width:"80%",background:"transparent"}} 
                                variant="borderless"
                                onClick={()=>setComment(true)}
                                />
                            </div>
                            <HeartOutlined onClick={()=>console.log("like+1")}/>11
                            <StarOutlined onClick={()=>console.log("collection+1")}/>5
                            <CommentOutlined onClick={()=>setComment(true)}/>2
                        </Flex>}
                    </Col>
                </Row>
            </Card>
        </div>
    )
}
export default Detail