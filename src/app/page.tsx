"use client";

import Head from "next/head";
import Link from "next/link"; // <Link> 임포트
import { Card, Carousel, Avatar, Button, Badge, Grid, Space } from "antd";
import { cssBase, cssVar } from "../shared/ui/colors"; // 경로는 실제 위치에 맞게 조정하세요
import { useHomeStore } from "../store/useHomeStore"; // 경로는 실제 위치에 맞게 조정하세요
import {
  AppstoreOutlined,
  RocketOutlined,
  GlobalOutlined,
  LaptopOutlined,
  BulbOutlined,
  BankOutlined,
  ReadOutlined,
  CompassOutlined,
} from "@ant-design/icons";

const useBreakpoint = Grid.useBreakpoint;

const categories = [
  { key: "enterprise", label: "대기업", icon: <BankOutlined /> },
  { key: "startup", label: "스타트업", icon: <RocketOutlined /> },
  { key: "global", label: "외국계", icon: <GlobalOutlined /> },
  { key: "it", label: "IT/테크", icon: <LaptopOutlined /> },
  { key: "consult", label: "전략컨설팅", icon: <BulbOutlined /> },
  { key: "mba", label: "MBA/대학원", icon: <ReadOutlined /> },
  { key: "abroad", label: "해외취업", icon: <CompassOutlined /> },
  { key: "finance", label: "금융권", icon: <AppstoreOutlined /> },
];

const partners = [
  { id: "A", name: "현대자동차", tag: "제챗" },
  { id: "S", name: "Gucci 구찌코리아", tag: "Summer05" },
  { id: "K", name: "카카오", tag: "Talk Team" },
  { id: "N", name: "NAVER", tag: "Green" },
];

export default function HomePage() {
  const { bannerIndex, setBannerIndex } = useHomeStore();
  const screens = useBreakpoint();

  return (
    <>
      <Head>
        <title>RAG 설명서 헬프센터</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <main
        style={{ background: "var(--color-neutral-50)", minHeight: "100vh" }}
      >
        <div
          style={{
            height: 56,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 16px",
          }}
        >
          <div style={{ fontWeight: 800, letterSpacing: 0.5 }}>RAG HELP</div>
          <Space>
            <Button type="text">고객센터</Button>
            <Button type="text">로그인</Button>
          </Space>
        </div>

        <section
          style={{
            padding: 16,
            background: `linear-gradient(135deg, ${cssVar(
              "green",
              300
            )}, ${cssVar("blue", 300)})`,
          }}
        >
          {/* ★ 1. Card 경고 수정: 'bordered', 'bodyStyle' 대신 'variant', 'styles.body' 사용 */}
          <Card
            variant="borderless"
            style={{
              borderRadius: "var(--radius-xl)",
              boxShadow: "var(--shadow-soft)",
              background: `linear-gradient(135deg, ${cssVar(
                "blue",
                100
              )}, ${cssVar("green", 100)})`,
            }}
            styles={{
              body: { padding: 0 },
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: screens.md ? "1.2fr 1fr" : "1fr",
                gap: 8,
              }}
            >
              <div style={{ padding: 24 }}>
                <Badge
                  color={cssVar("blue", 400)}
                  count={null}
                  style={{ background: cssVar("blue", 400) }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      padding: "6px 10px",
                      borderRadius: 999,
                      background: cssVar("blue", 100),
                      color: cssVar("blue", 700),
                      fontSize: 12,
                      fontWeight: 700,
                    }}
                  >
                    최신버전 앱 필수
                  </span>
                </Badge>
                <h1
                  style={{
                    marginTop: 12,
                    marginBottom: 4,
                    fontSize: 28,
                    lineHeight: 1.2,
                    color: "var(--color-black)",
                  }}
                >
                  커피챗 노트 오픈 이벤트
                </h1>
                <p style={{ margin: 0, color: "var(--color-greyscale-600)" }}>
                  사용설명서를 RAG로 더 똑똑하게: 문서 업로드 → 챗봇 생성 → 팀
                  공유까지.
                </p>
                <div style={{ marginTop: 16 }}>
                  <Space>
                    <Button
                      type="primary"
                      style={{
                        background: cssVar("green", 600),
                        borderColor: cssVar("green", 600),
                      }}
                    >
                      시작하기
                    </Button>
                    <Button>도움말 보기</Button>
                  </Space>
                </div>
              </div>
              <div style={{ padding: screens.md ? 24 : 12 }}>
                <Carousel afterChange={setBannerIndex} dots>
                  {new Array(5).fill(0).map((_, i) => (
                    <div key={i}>
                      <div
                        style={{
                          height: 140,
                          borderRadius: 16,
                          background: `linear-gradient(135deg, ${cssVar(
                            "blue",
                            200
                          )}, ${cssVar("green", 200)})`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: cssVar("blue", 800),
                          fontWeight: 700,
                        }}
                      >
                        배너 {i + 1}
                      </div>
                    </div>
                  ))}
                </Carousel>
                <div
                  style={{
                    textAlign: "right",
                    marginTop: 8,
                    color: "var(--color-greyscale-500)",
                    fontSize: 12,
                  }}
                >
                  {bannerIndex + 1} / 5
                </div>
              </div>
            </div>
          </Card>
        </section>

        <section style={{ padding: "20px 16px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 12,
              maxWidth: 920,
              margin: "0 auto",
            }}
          >
            {categories.map((c) => (
              <button
                key={c.key}
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                }}
                aria-label={c.label}
              >
                <div
                  style={{
                    display: "grid",
                    placeItems: "center",
                    rowGap: 8,
                  }}
                >
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 16,
                      display: "grid",
                      placeItems: "center",
                      boxShadow: "var(--shadow-soft)",
                      background: `linear-gradient(145deg, ${cssVar(
                        "blue",
                        300
                      )}, ${cssVar("green", 300)})`,
                      color: cssBase("black"),
                    }}
                  >
                    <span style={{ fontSize: 22, color: "var(--color-white)" }}>
                      {c.icon}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: 12,
                      color: "var(--color-greyscale-700)",
                    }}
                  >
                    {c.label}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section style={{ padding: "8px 16px 40px" }}>
          <div style={{ maxWidth: 920, margin: "0 auto" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontSize: 16,
                  color: "var(--color-greyscale-800)",
                }}
              >
                지금, 새롭게 등장한 파트너들
              </h3>
              <Button type="text" style={{ color: cssVar("blue", 600) }}>
                전체 보기
              </Button>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: screens.md ? "repeat(3, 1fr)" : "1fr",
                gap: 12,
              }}
            >
              {partners.map((p) => (
                <Card
                  key={p.id}
                  variant="borderless" // ★ 여기도 수정
                  style={{
                    borderRadius: 16,
                    background: "var(--color-white)",
                    boxShadow: "var(--shadow-soft)",
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 12 }}
                  >
                    <Avatar
                      size={40}
                      style={{
                        background: cssVar("blue", 100),
                        color: cssVar("blue", 700),
                        fontWeight: 700,
                      }}
                    >
                      {p.id}
                    </Avatar>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700 }}>{p.name}</div>
                      <div
                        style={{
                          fontSize: 12,
                          color: "var(--color-greyscale-500)",
                        }}
                      >
                        {p.tag}
                      </div>
                    </div>
                    <Button
                      size="small"
                      style={{
                        borderRadius: 999,
                        borderColor: cssVar("green", 500),
                        color: cssVar("green", 700),
                      }}
                    >
                      자세히
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ★ 2. <nav> 수정: 'legacyBehavior' 제거, <Link>에 직접 스타일 적용 */}
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
            // '홈' 페이지이므로 '홈' 탭을 활성화합니다.
            const isActive = item.href === "/";

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
