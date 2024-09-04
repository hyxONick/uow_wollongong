import { Button, Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";

const LobbyLayout = () => {
  return (
    <Layout>
      <Header>header</Header>

      <Layout>
        <Sider>sider</Sider>
        <Content>
          <Button type="primary">hello world</Button>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LobbyLayout;
