import React from 'react';
import { Row, Col } from 'antd';
import PostCard from './postCard'; 

const ParentComponent: React.FC = () => {
  const postData = [
    {
      title: 'Blockchain developer best practices on innovationchain',
      tags: ['finance', 'bitcoin', 'crypto'],
      author: 'Pavel Gvay',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      views: 651324,
      likes: 366545,
      comments: 56,
      time: '3 weeks ago',
      image: 'https://example.com/bitcoin-chart.png',
      liked: true,
    },
    {
      title: 'The 4-step SEO framework that led to a 1000% increase in traffic.',
      tags: ['seo', 'blogging', 'traffic'],
      author: 'AR Jakir',
      avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
      views: 244564,
      likes: 10920,
      comments: 184,
      time: '3 days ago',
      image: 'https://example.com/seo-chart.png',
      liked: false,
    },
  ];

  return (
    <div>
      <Row gutter={[16, 16]} style={{ width: '80%', maxWidth: '1200px', margin: '0 auto' }}>
        {postData.map((post, index) => (
          <Col xs={24} key={index}>
            <PostCard {...post} />
          </Col>
        ))}
      </Row>
    </div>

  );
};

export default ParentComponent;
