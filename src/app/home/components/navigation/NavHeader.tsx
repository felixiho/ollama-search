"use client";

import { Flex, Typography } from "antd";

export default function NavHeader() {
  const { Title } = Typography;
  return (
    <Flex>
      <Title level={2}>Ollama Search</Title>
    </Flex>
  );
}
