"use client";

import { useSearchStore } from "@/store/search";
import { Flex, Typography } from "antd";

export default function NavHeader() {
  const { Title } = Typography;
  const [searchInput] = useSearchStore((s) => [s.searchInput]);

  if (searchInput) return null
  return (
    <Flex>
      <Title level={2}>Ollama Search</Title>
    </Flex>
  );
}
