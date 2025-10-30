"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeftOutlined,
  FilterOutlined,
  HomeOutlined,
  ShopOutlined,
  CoffeeOutlined,
  EnvironmentOutlined,
  EyeOutlined,
  MessageOutlined,
  StarFilled,
  BookOutlined,
} from "@ant-design/icons";
import {
  Button,
  Input,
  Space,
  Tag,
  List,
  Typography,
  Segmented,
  Tooltip,
} from "antd";
import { cssVar } from "@/shared/ui/colors";

const { Text } = Typography;

type ResultItem = {
  id: string;
  title: string;
  area: string;
  distanceKm: number;
  rating: number;
  comments: number;
  image: string;
  badges: string[];
};

const MOCK: ResultItem[] = [
  {
    id: "1",
    title: "한화리조트 제주",
    area: "제주시 애월읍 · 리조트",
    distanceKm: 4.9,
    rating: 5,
    comments: 131,
    image: "/images/sample-1.jpg",
    badges: ["모던키친", "실내", "목줄착용", "짖음OK"],
  },
  {
    id: "2",
    title: "투게더 제주애견숙소",
    area: "제주시 애월읍 · 펜션",
    distanceKm: 4.9,
    rating: 5,
    comments: 131,
    image: "/images/sample-2.jpg",
    badges: ["대형견", "실내", "목줄착용"],
  },
  {
    id: "3",
    title: "제주 솔숲펜션",
    area: "제주시 애월읍 · 펜션",
    distanceKm: 4.9,
    rating: 5,
    comments: 131,
    image: "/images/sample-3.jpg",
    badges: ["모든크기", "실내", "이동가방"],
  },
  {
    id: "4",
    title: "블라썸꽃이미다 애월점",
    area: "제주시 애월읍 · 카페",
    distanceKm: 4.9,
    rating: 5,
    comments: 131,
    image: "/images/sample-4.jpg",
    badges: ["소형견", "실내", "목줄착용", "진동음OK"],
  },
];

const CATEGORY_TABS = [
  { label: "전체", value: "all", icon: <EnvironmentOutlined /> },
  { label: "숙소", value: "stay", icon: <HomeOutlined /> },
  { label: "음식점", value: "food", icon: <CoffeeOutlined /> },
  { label: "상점", value: "shop", icon: <ShopOutlined /> },
];

export default function SearchResultsPage() {
  const router = useRouter();
  const params = useSearchParams();
  const q = params.get("q") ?? "";

  const [sort, setSort] = useState<"reco" | "dist" | "rate">("reco");
  const [tab, setTab] = useState<string>("all");
  const [saved, setSaved] = useState<Record<string, boolean>>({});

  const data = useMemo(() => {
    let arr = [...MOCK];

    if (tab !== "all") {
      if (tab === "stay") arr = arr.filter((i) => /리조트|펜션/i.test(i.area));
      if (tab === "food") arr = arr.filter((i) => /카페|맛집/i.test(i.area));
      if (tab === "shop") arr = arr.filter((i) => /상점|마켓/i.test(i.area));
    }

    if (sort === "dist") arr.sort((a, b) => a.distanceKm - b.distanceKm);
    if (sort === "rate") arr.sort((a, b) => b.rating - a.rating);

    return arr;
  }, [sort, tab]);

  const onSubmit = (value: string) => {
    router.replace(`/search/results?q=${encodeURIComponent(value)}`);
  };

  return (
    <main style={{ background: "var(--color-white)", minHeight: "100vh" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          background: "var(--color-white)",
          padding: "12px 12px",
          borderBottom: `1px solid var(--color-neutral-200)`,
        }}
      >
        <Space.Compact style={{ width: "100%" }}>
          <Button
            aria-label="뒤로"
            onClick={() => router.back()}
            icon={<ArrowLeftOutlined />}
            style={{ width: 40, height: 40 }}
          />
          <Input
            allowClear
            size="large"
            defaultValue={q}
            placeholder="제주 지역 또는 장소명 검색"
            onPressEnter={(e) => onSubmit((e.target as HTMLInputElement).value)}
            style={{ background: "var(--color-neutral-100)", border: "none" }}
          />
        </Space.Compact>

        <div
          style={{
            display: "flex",
            gap: 8,
            marginTop: 10,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Button
            icon={<FilterOutlined />}
            style={{
              borderColor: cssVar("neutral", 200),
              background: "var(--color-white)",
            }}
          >
            필터
          </Button>

          <Segmented
            size="large"
            value={tab}
            onChange={(v) => setTab(String(v))}
            options={CATEGORY_TABS.map((t) => ({
              label: (
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  {t.icon}
                  <span>{t.label}</span>
                </div>
              ),
              value: t.value,
            }))}
            style={{
              background: "var(--color-neutral-100)",
              borderRadius: 999,
            }}
          />

          <Segmented
            size="large"
            value={sort}
            onChange={(v) => setSort(v as any)}
            options={[
              { label: "추천순", value: "reco" },
              { label: "거리순", value: "dist" },
              { label: "평점순", value: "rate" },
            ]}
            style={{
              marginLeft: "auto",
              background: "var(--color-neutral-100)",
              borderRadius: 999,
            }}
          />
        </div>
      </div>

      <section style={{ padding: "8px 16px 24px" }}>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <List.Item
              style={{
                padding: "14px 0",
                borderBottom: `1px solid var(--color-neutral-200)`,
              }}
              extra={
                <Tooltip title={saved[item.id] ? "저장됨" : "저장"}>
                  <Button
                    type="text"
                    aria-label="저장"
                    icon={<BookOutlined />}
                    onClick={() =>
                      setSaved((s) => ({ ...s, [item.id]: !s[item.id] }))
                    }
                    style={{
                      color: saved[item.id]
                        ? cssVar("blue", 700)
                        : "var(--color-greyscale-500)",
                    }}
                  />
                </Tooltip>
              }
            >
              <List.Item.Meta
                avatar={
                  <div
                    style={{
                      width: 72,
                      height: 72,
                      borderRadius: 12,
                      overflow: "hidden",
                      background: cssVar("neutral", 200),
                      flexShrink: 0,
                    }}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={72}
                      height={72}
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                }
                title={
                  <>
                    <div
                      style={{
                        color: "var(--color-greyscale-500)",
                        fontSize: 12,
                        marginBottom: 4,
                      }}
                    >
                      {item.area}
                    </div>
                    <Text
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        color: "var(--color-greyscale-900)",
                        fontWeight: 700,
                        fontSize: 16,
                      }}
                    >
                      {item.title}
                    </Text>
                  </>
                }
                description={
                  <div style={{ marginTop: 6 }}>
                    <div
                      style={{
                        display: "flex",
                        gap: 12,
                        alignItems: "center",
                        color: "var(--color-greyscale-600)",
                        fontSize: 12,
                        marginBottom: 6,
                      }}
                    >
                      <span>{item.distanceKm.toFixed(1)}km</span>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 4,
                          color: cssVar("green", 700),
                        }}
                      >
                        <StarFilled /> {item.rating}
                      </span>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <EyeOutlined /> {(1_274).toLocaleString()}
                      </span>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <MessageOutlined /> {item.comments}
                      </span>
                    </div>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {item.badges.map((b) => (
                        <Tag
                          key={b}
                          style={{
                            border: `1px solid ${cssVar("neutral", 200)}`,
                            background: "var(--color-white)",
                            color: "var(--color-greyscale-600)",
                            padding: "4px 8px",
                            borderRadius: 999,
                            fontSize: 12,
                            marginInlineEnd: 0,
                          }}
                        >
                          {b}
                        </Tag>
                      ))}
                    </div>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </section>
    </main>
  );
}
