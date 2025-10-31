"use client";

import Head from "next/head";
import Link from "next/link";
import { Input, Button, List, Space, Typography } from "antd";
import {
  SearchOutlined,
  BellOutlined,
  HomeOutlined,
  DesktopOutlined,
  MobileFilled,
  CameraOutlined,
  CarOutlined,
  CoffeeOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import { cssBase, cssVar } from "../../shared/ui/colors"; // 경로 확인 필요
import { useState, useMemo } from "react";

const categories = [
  {
    key: "appliances",
    label: "가전 (세탁기, 냉장고 등)",
    icon: <HomeOutlined />,
  },
  {
    key: "electronics",
    label: "전자기기 (TV, PC, 노트북)",
    icon: <DesktopOutlined />,
  },
  {
    key: "mobile",
    label: "스마트폰 / 태블릿",
    icon: <MobileFilled />,
  },
  {
    key: "camera",
    label: "카메라",
    icon: <CameraOutlined />,
  },
  {
    key: "auto",
    label: "자동차",
    icon: <CarOutlined />,
  },
  {
    key: "kitchen",
    label: "주방가전 (오븐, 밥솥 등)",
    icon: <CoffeeOutlined />,
  },
  {
    key: "other",
    label: "기타 (가구, 악기 등)",
    icon: <ShopOutlined />,
  },
];

const dummyData = [
  {
    id: 1,
    brand: "LG",
    model: "ThinQ-ABC",
    name: "LG ThinQ 세탁기 사용설명서",
    category: "appliances",
  },
  {
    id: 2,
    brand: "Samsung",
    model: "Bespoke-123",
    name: "삼성 비스포크 냉장고",
    category: "appliances",
  },
  {
    id: 3,
    brand: "Samsung",
    model: "OLED-Q90",
    name: "삼성 TV QLED 8K",
    category: "electronics",
  },
  {
    id: 4,
    brand: "Apple",
    model: "iPhone 15 Pro",
    name: "iPhone 15 Pro 사용자 가이드",
    category: "mobile",
  },
  {
    id: 5,
    brand: "Sony",
    model: "Alpha A7 IV",
    name: "Sony A7 M4 카메라 설명서",
    category: "camera",
  },
  {
    id: 6,
    brand: "Hyundai",
    model: "Avante CN7",
    name: "현대 아반떼 CN7 매뉴얼",
    category: "auto",
  },
  {
    id: 7,
    brand: "LG",
    model: "Gram-2025",
    name: "LG 그램 16인치 노트북",
    category: "electronics",
  },
  {
    id: 8,
    brand: "Dyson",
    model: "V15 Detect",
    name: "다이슨 V15 무선 청소기",
    category: "appliances",
  },
  {
    id: 9,
    brand: "Samsung",
    model: "Galaxy S25",
    name: "갤럭시 S25 Ultra 빠른 시작 가이드",
    category: "mobile",
  },
  {
    id: 10,
    brand: "Cuckoo",
    model: "CRP-P10",
    name: "쿠쿠 10인용 밥솥 설명서",
    category: "kitchen",
  },
  {
    id: 11,
    brand: "IKEA",
    model: "Billy",
    name: "이케아 빌리 책장 조립 가이드",
    category: "other",
  },
];

type Manual = (typeof dummyData)[0];

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryClick = (categoryKey: string) => {
    setSelectedCategory(categoryKey);
    setSearchQuery("");
  };

  const handleGoBack = () => {
    setSelectedCategory(null);
    setSearchQuery("");
  };

  const displayItems = useMemo(() => {
    let items = dummyData;

    if (selectedCategory) {
      items = items.filter((item) => item.category === selectedCategory);
    }

    if (searchQuery.trim() !== "") {
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.model.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return items;
  }, [selectedCategory, searchQuery]);

  const showCategories = selectedCategory === null && searchQuery.trim() === "";

  return (
    <>
      <Head>
        <title>검색 | 동문서답</title>
        <meta name="viewport" content="initial-scale=1, width-device-width" />
      </Head>

      <main
        style={{
          background: cssBase("white"),
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* 1. 상단 검색 바 */}
        <div
          style={{
            height: 56,
            display: "flex",
            alignItems: "center",
            padding: "0 16px",
            background: cssBase("white"),
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          {/* ★ 'bordered={false}' 대신 'variant="borderless"' 사용 */}
          <Input
            size="large"
            placeholder={
              selectedCategory
                ? "선택한 카테고리 내에서 검색"
                : "제품명, 모델명, 오류 코드를 검색해 보세요."
            }
            prefix={
              <SearchOutlined style={{ color: cssVar("neutral", 500) }} />
            }
            style={{
              flex: 1,
              background: cssVar("neutral", 100),
              borderRadius: 8,
            }}
            variant="borderless" // ★ 수정된 부분
            value={searchQuery}
            onChange={handleSearch}
          />
          <Button
            type="text"
            shape="circle"
            icon={
              <BellOutlined
                style={{ fontSize: 22, color: cssVar("neutral", 800) }}
              />
            }
            style={{ marginLeft: 8 }}
          />
        </div>

        {/* 2. 내용 영역 */}
        <section
          style={{
            padding: "8px 0",
            flexGrow: 1,
          }}
        >
          {showCategories ? (
            // Case 1: 카테고리 리스트
            <List
              dataSource={categories}
              renderItem={(item) => (
                <List.Item
                  style={{
                    padding: "16px 20px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleCategoryClick(item.key)}
                >
                  <Space size="large">
                    <span style={{ fontSize: 22, color: cssVar("blue", 600) }}>
                      {item.icon}
                    </span>
                    <Typography.Text
                      style={{ fontSize: 16, color: cssVar("neutral", 800) }}
                    >
                      {item.label}
                    </Typography.Text>
                  </Space>
                </List.Item>
              )}
            />
          ) : (
            // Case 2: 아이템 리스트
            <List
              header={
                <div
                  style={{
                    padding: "8px 20px",
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {selectedCategory && (
                    <Button
                      type="text"
                      onClick={handleGoBack}
                      style={{
                        marginRight: 8,
                        padding: "0 8px",
                        color: cssVar("blue", 600),
                        fontWeight: "normal",
                      }}
                    >
                      &lt; 뒤로
                    </Button>
                  )}
                  <span style={{ flexGrow: 1 }}>
                    {searchQuery
                      ? `검색 결과 ${displayItems.length}건`
                      : `${
                          categories.find((c) => c.key === selectedCategory)
                            ?.label || "목록"
                        } ${displayItems.length}건`}
                  </span>
                </div>
              }
              dataSource={displayItems}
              renderItem={(item) => (
                <List.Item
                  style={{
                    padding: "16px 20px",
                    cursor: "pointer",
                  }}
                >
                  <List.Item.Meta
                    title={item.name}
                    description={`${item.brand} | ${item.model}`}
                  />
                </List.Item>
              )}
              locale={{ emptyText: "목록이 없습니다." }}
            />
          )}
        </section>

        {/* 3. 하단 네비게이션 */}
        <nav
          style={{
            position: "sticky",
            bottom: 0,
            left: 0,
            right: 0,
            background: "var(--color-white)",
            borderTop: `1px solid var(--color-neutral-200)`,
            padding: 8,
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: 8,
          }}
        >
          {[
            { href: "/", label: "홈" },
            { href: "/search", label: "검색" },
            { href: "/cuberit", label: "설명서 채팅" },
            { href: "/note", label: "설명서 등록" },
            { href: "/more", label: "더보기" },
          ].map((item, i) => {
            const isActive = item.href === "/search";

            return (
              <Link
                href={item.href}
                key={item.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: 48,
                  border: "none",
                  background: "transparent",
                  color: isActive
                    ? cssVar("blue", 700)
                    : "var(--color-greyscale-500)",
                  fontWeight: isActive ? 700 : 500,
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </main>
    </>

  );
}
