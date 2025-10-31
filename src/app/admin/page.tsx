"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Drawer,
  Empty,
  Flex,
  Input,
  message,
  Popconfirm,
  Segmented,
  Space,
  Table,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  FileTextOutlined,
  FilterOutlined,
  InboxOutlined,
  ReloadOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { cssVar } from "@/shared/ui/colors";

const { Title, Text } = Typography;

type ManualStatus = "pending" | "approved" | "rejected";

type ManualRow = {
  id: string;
  title: string;
  ownerName: string;
  ownerEmail: string;
  uploadedAt: string; // ISO
  pages: number;
  tags: string[];
  status: ManualStatus;
  summary: string;
};

async function fetchManuals(
  status: ManualStatus | "all",
  q: string
): Promise<ManualRow[]> {
  const data: ManualRow[] = [
    {
      id: "m1",
      title: "구글 코리아 Sales 온보딩 매뉴얼",
      ownerName: "이민수",
      ownerEmail: "minsu@example.com",
      uploadedAt: "2025-02-20T01:20:00Z",
      pages: 38,
      tags: ["영업", "온보딩"],
      status: "pending",
      summary: "팀 구조, KPI, 세일즈 파이프라인 운영 가이드 등",
    },
    {
      id: "m2",
      title: "Azure 가이드 – 네트워크 보안",
      ownerName: "김하늘",
      ownerEmail: "sky@example.com",
      uploadedAt: "2025-02-18T03:10:00Z",
      pages: 54,
      tags: ["보안", "클라우드"],
      status: "approved",
      summary: "NSG/파이어월 및 프라이빗 링크 모범사례",
    },
    {
      id: "m3",
      title: "사내 CRM 사용법 (미들 5~8)",
      ownerName: "박도윤",
      ownerEmail: "doyoon@example.com",
      uploadedAt: "2025-02-19T10:40:00Z",
      pages: 21,
      tags: ["CRM", "세일즈"],
      status: "pending",
      summary: "리드 생성/자격판단/전환 단계 운영 체크리스트",
    },
    {
      id: "m4",
      title: "데이터 거버넌스 체크리스트",
      ownerName: "정가람",
      ownerEmail: "garam@example.com",
      uploadedAt: "2025-02-10T08:15:00Z",
      pages: 12,
      tags: ["데이터", "거버넌스"],
      status: "rejected",
      summary: "민감정보 처리/접근권한/보존기간 정책 점검표",
    },
  ];

  let arr = status === "all" ? data : data.filter((d) => d.status === status);
  if (q) {
    const k = q.toLowerCase();
    arr = arr.filter(
      (d) =>
        d.title.toLowerCase().includes(k) ||
        d.ownerName.toLowerCase().includes(k) ||
        d.tags.some((t) => t.toLowerCase().includes(k))
    );
  }
  return arr.sort((a, b) => +new Date(b.uploadedAt) - +new Date(a.uploadedAt));
}

async function approveManual(id: string) {
  // await fetch(`/api/admin/manuals/${id}/approve`, { method: "PATCH" })
  await new Promise((r) => setTimeout(r, 400));
}
async function rejectManual(id: string) {
  // await fetch(`/api/admin/manuals/${id}/reject`, { method: "PATCH" })
  await new Promise((r) => setTimeout(r, 400));
}

export default function AdminPage() {
  const [status, setStatus] = useState<ManualStatus | "all">("pending");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState<ManualRow[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [detail, setDetail] = useState<ManualRow | null>(null);

  const pendingCount = useMemo(
    () => rows.filter((r) => r.status === "pending").length,
    [rows]
  );

  const load = async () => {
    setLoading(true);
    try {
      const data = await fetchManuals(status, query);
      setRows(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, query]);

  const onBulkApprove = async () => {
    const ids = selectedRowKeys as string[];
    if (!ids.length) return;
    setLoading(true);
    try {
      await Promise.all(ids.map(approveManual));
      message.success(`${ids.length}개 승인 완료`);
      setSelectedRowKeys([]);
      load();
    } catch {
      message.error("일괄 승인 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const columns: ColumnsType<ManualRow> = [
    {
      title: "문서",
      dataIndex: "title",
      key: "title",
      render: (_, r) => (
        <Space direction="vertical" size={2}>
          <Space>
            <FileTextOutlined />
            <Text strong style={{ color: "var(--color-greyscale-900)" }}>
              {r.title}
            </Text>
          </Space>
          <Text type="secondary" style={{ fontSize: 12 }}>
            업로드: {new Date(r.uploadedAt).toLocaleString()}
          </Text>
        </Space>
      ),
    },
    {
      title: "소유자",
      dataIndex: "ownerName",
      key: "owner",
      render: (_, r) => (
        <Space>
          <UserOutlined />
          <div>
            <div style={{ fontWeight: 600 }}>{r.ownerName}</div>
            <Text type="secondary" style={{ fontSize: 12 }}>
              {r.ownerEmail}
            </Text>
          </div>
        </Space>
      ),
    },
    {
      title: "페이지",
      dataIndex: "pages",
      key: "pages",
      width: 90,
      render: (v) => <Text>{v}</Text>,
    },
    {
      title: "태그",
      dataIndex: "tags",
      key: "tags",
      render: (tags: string[]) => (
        <Space wrap>
          {tags.map((t) => (
            <Tag
              key={t}
              style={{
                border: `1px solid ${cssVar("neutral", 200)}`,
                background: "var(--color-white)",
                color: "var(--color-greyscale-600)",
                borderRadius: 999,
              }}
            >
              {t}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: "상태",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (s: ManualStatus) => {
        if (s === "approved")
          return <Badge color={cssVar("green", 600)} text="승인됨" />;
        if (s === "rejected")
          return <Badge color={cssVar("blue", 700)} text="반려됨" />;
        return <Badge color={cssVar("neutral", 400)} text="대기중" />;
      },
    },
    {
      title: "작업",
      key: "actions",
      width: 240,
      render: (_, r) => (
        <Space>
          <Button
            onClick={() => setDetail(r)}
            style={{ borderColor: cssVar("neutral", 200) }}
          >
            자세히
          </Button>
          <Tooltip title="승인">
            <Button
              type="primary"
              icon={<CheckCircleTwoTone twoToneColor={cssVar("green", 600)} />}
              onClick={async () => {
                setLoading(true);
                try {
                  await approveManual(r.id);
                  message.success("승인 완료");
                  load();
                } finally {
                  setLoading(false);
                }
              }}
              style={{
                background: cssVar("green", 600),
                borderColor: cssVar("green", 600),
              }}
            >
              승인
            </Button>
          </Tooltip>
          <Popconfirm
            title="해당 문서를 반려할까요?"
            okText="반려"
            cancelText="취소"
            onConfirm={async () => {
              setLoading(true);
              try {
                await rejectManual(r.id);
                message.success("반려 처리됨");
                load();
              } finally {
                setLoading(false);
              }
            }}
          >
            <Button
              danger
              icon={<CloseCircleTwoTone twoToneColor={cssVar("blue", 700)} />}
            >
              반려
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <main style={{ background: "var(--color-neutral-50)", minHeight: "100vh" }}>
      <div
        style={{
          height: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 16px",
          background: "var(--color-white)",
          borderBottom: `1px solid var(--color-neutral-200)`,
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <Title level={5} style={{ margin: 0 }}>
          관리자 대시보드
        </Title>
        <Space>
          <Button
            icon={<ReloadOutlined />}
            onClick={load}
            style={{ borderColor: cssVar("neutral", 200) }}
          >
            새로고침
          </Button>
        </Space>
      </div>

      <section style={{ padding: 16 }}>
        <Card
          variant="borderless"
          style={{
            background: "var(--color-white)",
            borderRadius: "var(--radius-xl)",
            boxShadow: "var(--shadow-soft)",
          }}
          styles={{ body: { padding: 16 } }}
        >
          <Flex align="center" gap={16}>
            <InboxOutlined
              style={{ fontSize: 28, color: cssVar("blue", 600) }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>
                승인 대기 중인 설명서
              </div>
              <Text type="secondary" style={{ fontSize: 12 }}>
                승인 완료 시 다른 유저가 열람/검색할 수 있습니다.
              </Text>
            </div>
            <Badge
              count={pendingCount}
              style={{ background: cssVar("green", 600) }}
            />
            <Popconfirm
              title="선택된 문서를 모두 승인하시겠어요?"
              okText="일괄 승인"
              cancelText="취소"
              onConfirm={onBulkApprove}
              disabled={!selectedRowKeys.length}
            >
              <Button
                type="primary"
                disabled={!selectedRowKeys.length}
                style={{
                  background: cssVar("green", 600),
                  borderColor: cssVar("green", 600),
                }}
              >
                일괄 승인
              </Button>
            </Popconfirm>
          </Flex>
        </Card>
      </section>

      <section style={{ padding: "0 16px 8px" }}>
        <Space wrap>
          <Segmented
            value={status}
            onChange={(v) => setStatus(v as ManualStatus | "all")}
            options={[
              { label: "대기", value: "pending" },
              { label: "승인", value: "approved" },
              { label: "반려", value: "rejected" },
              { label: "전체", value: "all" },
            ]}
            style={{
              background: "var(--color-white)",
              border: `1px solid ${cssVar("neutral", 200)}`,
              borderRadius: 999,
            }}
          />
          <Button
            icon={<FilterOutlined />}
            style={{ borderColor: cssVar("neutral", 200) }}
          >
            필터
          </Button>
          <Input
            allowClear
            prefix={<SearchOutlined />}
            placeholder="제목/태그/소유자 검색"
            onChange={(e) => setQuery(e.target.value)}
            style={{
              width: 340,
              background: "var(--color-white)",
              borderColor: cssVar("neutral", 200),
            }}
          />
        </Space>
      </section>

      <section style={{ padding: 16 }}>
        <Card
          variant="borderless"
          style={{ borderRadius: 16, background: "var(--color-white)" }}
          styles={{ body: { padding: 0 } }}
        >
          <Table<ManualRow>
            rowKey="id"
            size="middle"
            loading={loading}
            columns={columns}
            dataSource={rows}
            locale={{
              emptyText: (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="표시할 문서가 없습니다."
                />
              ),
            }}
            rowSelection={{
              selectedRowKeys,
              onChange: setSelectedRowKeys,
              getCheckboxProps: (r) => ({ disabled: r.status !== "pending" }),
            }}
            pagination={{ pageSize: 8, showSizeChanger: false }}
          />
        </Card>
      </section>

      <Drawer
        width={420}
        open={!!detail}
        title="설명서 상세"
        onClose={() => setDetail(null)}
      >
        {detail ? (
          <Space direction="vertical" style={{ width: "100%" }} size="middle">
            <Space>
              <FileTextOutlined />
              <Text strong>{detail.title}</Text>
            </Space>
            <div>
              <Text type="secondary">소유자</Text>
              <div style={{ fontWeight: 600 }}>{detail.ownerName}</div>
              <Text type="secondary" style={{ fontSize: 12 }}>
                {detail.ownerEmail}
              </Text>
            </div>
            <div>
              <Text type="secondary">요약</Text>
              <div style={{ marginTop: 4 }}>{detail.summary}</div>
            </div>
            <div>
              <Text type="secondary">태그</Text>
              <Space wrap style={{ marginTop: 6 }}>
                {detail.tags.map((t) => (
                  <Tag
                    key={t}
                    style={{
                      border: `1px solid ${cssVar("neutral", 200)}`,
                      background: "var(--color-white)",
                      color: "var(--color-greyscale-600)",
                      borderRadius: 999,
                    }}
                  >
                    {t}
                  </Tag>
                ))}
              </Space>
            </div>
            <Space>
              <Button
                type="primary"
                onClick={async () => {
                  await approveManual(detail.id);
                  message.success("승인 완료");
                  setDetail(null);
                  load();
                }}
                style={{
                  background: cssVar("green", 600),
                  borderColor: cssVar("green", 600),
                }}
                icon={
                  <CheckCircleTwoTone twoToneColor={cssVar("green", 600)} />
                }
              >
                승인
              </Button>
              <Popconfirm
                title="반려하시겠어요?"
                okText="반려"
                cancelText="취소"
                onConfirm={async () => {
                  await rejectManual(detail.id);
                  message.success("반려 처리됨");
                  setDetail(null);
                  load();
                }}
              >
                <Button
                  danger
                  icon={
                    <CloseCircleTwoTone twoToneColor={cssVar("blue", 700)} />
                  }
                >
                  반려
                </Button>
              </Popconfirm>
            </Space>
          </Space>
        ) : null}
      </Drawer>
    </main>
  );
}
