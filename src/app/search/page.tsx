"use client";

import { useRouter } from "next/navigation";
import {
  ArrowLeftOutlined,
  SearchOutlined,
  CloseCircleOutlined,
  EyeOutlined,
  MessageOutlined,
  PlayCircleFilled,
  ClockCircleOutlined,
} from "@ant-design/icons";
import {
  Input,
  Button,
  Space,
  Tag,
  Empty,
  List,
  Avatar,
  Typography,
} from "antd";
import Image from "next/image";
import { cssVar } from "@/shared/ui/colors";
import { useSearchStore } from "@/store/useSearchStore";

const { Text } = Typography;

const QUICK_KEYWORDS = [
  "협재",
  "풀빌라",
  "애월 카페",
  "해변",
  "서귀포 맛집",
  "서귀포 맛집",
  "애견카페",
];

const TRENDING = [
  {
    id: "1",
    title: "발바다에 닿는 파도, 제주에서 가장 순한 해변은 여기",
    img: "/images/sample-1.jpg",
    views: 1274,
    comments: 131,
    time: "1개월 전",
  },
  {
    id: "2",
    title: "발바다에 닿는 파도, 제주에서 가장 순한 해변은 여기",
    img: "/images/sample-2.jpg",
    views: 1274,
    comments: 131,
    time: "1개월 전",
  },
  {
    id: "3",
    title: "발바다에 닿는 파도, 제주에서 가장 순한 해변은 여기",
    img: "/images/sample-3.jpg",
    views: 1274,
    comments: 131,
    time: "1개월 전",
  },
  {
    id: "4",
    title: "발바다에 닿는 파도, 제주에서 가장 순한 해변은 여기",
    img: "/images/sample-4.jpg",
    views: 1274,
    comments: 131,
    time: "1개월 전",
  },
];

export default function SearchPage() {
  const router = useRouter();
  const { recent, add, remove, clear } = useSearchStore();

  const onSubmit = (value: string) => {
    add(value);
    router.push(`/search/results?query=${encodeURIComponent(value)}`);
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "var(--color-white)",
      }}
    >
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
            prefix={
              <SearchOutlined style={{ color: "var(--color-greyscale-500)" }} />
            }
            placeholder="제주 지역 또는 장소명 검색"
            onPressEnter={(e) => onSubmit((e.target as HTMLInputElement).value)}
            style={{
              background: "var(--color-neutral-100)",
              border: "none",
            }}
          />
        </Space.Compact>
      </div>

      <section style={{ padding: "12px 16px" }}>
        <h4
          style={{
            margin: "8px 0 12px",
            color: "var(--color-greyscale-700)",
            fontWeight: 600,
          }}
        >
          최근검색어
        </h4>

        {recent.length === 0 ? (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={
              <span style={{ color: "var(--color-greyscale-400)" }}>
                아직 검색 기록이 없어요.
              </span>
            }
            style={{ margin: "24px 0" }}
          />
        ) : (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              alignItems: "center",
            }}
          >
            {recent.map((term) => (
              <Tag
                key={term}
                closeIcon={<CloseCircleOutlined />}
                onClose={(e) => {
                  e.preventDefault();
                  remove(term);
                }}
                style={{
                  background: cssVar("neutral", 100),
                  borderColor: cssVar("neutral", 200),
                  color: "var(--color-greyscale-700)",
                  padding: "6px 10px",
                  borderRadius: 999,
                  cursor: "pointer",
                }}
                onClick={() => onSubmit(term)}
              >
                {term}
              </Tag>
            ))}
            <Button
              type="text"
              onClick={clear}
              style={{ color: cssVar("blue", 600), marginLeft: 4 }}
            >
              전체 지우기
            </Button>
          </div>
        )}
      </section>

      <section style={{ padding: "0 16px 16px" }}>
        <h4
          style={{
            margin: "0 0 12px",
            color: "var(--color-greyscale-700)",
            fontWeight: 600,
          }}
        >
          바로 찾는 키워드
        </h4>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {QUICK_KEYWORDS.map((k) => (
            <button
              key={k}
              onClick={() => onSubmit(k)}
              style={{
                border: `1px solid ${cssVar("green", 200)}`,
                background: cssVar("green", 100),
                color: cssVar("green", 700),
                padding: "8px 12px",
                borderRadius: 999,
                fontSize: 14,
              }}
            >
              {k}
            </button>
          ))}
        </div>
      </section>

      <section style={{ padding: "8px 16px 24px" }}>
        <h4
          style={{
            margin: "0 0 12px",
            color: "var(--color-greyscale-800)",
            fontWeight: 700,
          }}
        >
          이번 주 제주 여기가 뜨겁덩!
        </h4>

        <List
          itemLayout="horizontal"
          dataSource={TRENDING}
          renderItem={(item) => (
            <List.Item
              style={{
                padding: "10px 0",
                borderBottom: `1px solid var(--color-neutral-200)`,
              }}
              extra={
                <Button
                  type="text"
                  aria-label="미디어 보기"
                  icon={<PlayCircleFilled />}
                  style={{ color: cssVar("blue", 600) }}
                />
              }
            >
              <List.Item.Meta
                avatar={
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 12,
                      overflow: "hidden",
                      background: cssVar("neutral", 200),
                    }}
                  >
                    <Image
                      src={item.img}
                      alt={item.title}
                      width={56}
                      height={56}
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                }
                title={
                  <Text
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      color: "var(--color-greyscale-900)",
                      fontWeight: 600,
                    }}
                  >
                    {item.title}
                  </Text>
                }
                description={
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      color: "var(--color-greyscale-500)",
                      fontSize: 12,
                    }}
                  >
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      <EyeOutlined /> {item.views.toLocaleString()}
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
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      <ClockCircleOutlined /> {item.time}
                    </span>
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
