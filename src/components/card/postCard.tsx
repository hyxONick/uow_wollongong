import React from 'react';
import { Card, Tag, Avatar, Row, Col } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';

const styles = {
  cardContainer: {
    backgroundColor: '#1E1E2E',
    color: 'white',
    borderRadius: 10,
    padding: '20px',
    marginBottom: '20px',
  },
  innerCard: {
    backgroundColor: '#2F2F3F',
    borderRadius: 10,
    color: 'white',
    padding: '10px',
    textAlign: 'center' as const,
  },
  title: {
    color: 'white',
    fontSize: '1.2rem',
    marginBottom: '15px',
  },
  tag: {
    marginBottom: '10px',
  },
  userInfoText: {
    color: 'white',
    marginLeft: '10px',
  },
  statsText: {
    color: 'white',
    fontSize: '16px',
    marginRight: '20px',
  },
  priceText: {
    fontSize: '1.5rem',
    color: '#fff',
    fontWeight: 'bold',
    marginTop: '10px',
  },
  priceChangeText: {
    fontSize: '1rem',
    color: '#5EDA99',
    marginTop: '5px',
  },
};

type PostCardProps = {
  title: string;
  tags: string[];
  author: string;
  avatar: string;
  views: number;
  likes: number;
  comments: number;
  time: string;
  image: string;
  liked?: boolean;
};

const PostCard: React.FC<PostCardProps> = ({
  title,
  tags,
  author,
  avatar,
  views,
  likes,
  comments,
  time,
  image,
  liked = false,
}) => {
  return (
    <Card style={styles.cardContainer}>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={6}>
          <Card
            style={styles.innerCard}
            cover={
              <div
                style={{
                  backgroundImage: `url(${image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: '150px',
                  borderRadius: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              ></div>
            }
            bodyStyle={{ padding: 0 }}
          />
        </Col>

        <Col xs={24} md={18}>
          <Row justify="space-between">
            <Col>
              <h2 style={styles.title}>{title}</h2>
            </Col>
            <Col>
              {liked ? (
                <HeartFilled style={{ fontSize: '24px', color: 'red' }} />
              ) : (
                <HeartOutlined style={{ fontSize: '24px', color: '#6D6D7A' }} />
              )}
            </Col>
          </Row>

          <div style={styles.tag}>
            {tags.map((tag, index) => (
              <Tag color="blue" key={index}>
                {tag}
              </Tag>
            ))}
          </div>

          <Row justify="space-between" style={{ marginTop: '20px' }}>
            <Col>
              <Avatar size={54} src={avatar} />
              <span style={styles.userInfoText}>{author} • {time}</span>
            </Col>
            <Col>
              <span style={styles.statsText}>{views.toLocaleString()} Views</span>
              <span style={styles.statsText}>{likes.toLocaleString()} Likes</span>
              <span style={styles.statsText}>{comments} comments</span>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default PostCard;
