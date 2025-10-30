"use client";

import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import {
  Input,
  Button,
  Space,
  Typography,
  Form,
  Select,
  Upload,
  Result,
} from "antd";
// ★ 1. antd에서 폼과 업로드에 필요한 타입을 import 합니다.
import type { FormProps } from 'antd';
import type { UploadFile, UploadChangeParam } from 'antd/es/upload';

import {
  HomeOutlined,
  DesktopOutlined,
  MobileFilled,
  CameraOutlined,
  CarOutlined,
  CoffeeOutlined,
  ShopOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import { cssBase, cssVar } from "../../shared/ui/colors"; // 경로 확인 필요

// 카테고리 리스트
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

const { Dragger } = Upload;
const { Option } = Select;

// ★ 2. 폼 데이터 타입을 정의합니다.
interface ManualFormValues {
  category: string;
  manufacturer: string;
  productName: string;
  pdf: UploadFile[];
}

export default function NotePage() {
  const [form] = Form.useForm<ManualFormValues>(); // ★ 폼에도 타입 적용
  const [isSubmitted, setIsSubmitted] = useState(false);

  // ★ 3. 'any' 대신 정의한 타입(ManualFormValues)을 사용합니다.
  const onFinish: FormProps<ManualFormValues>['onFinish'] = (values) => {
    console.log("제출된 폼 데이터:", values);
    // TODO: 여기에 실제 서버로 데이터를 전송하는 로직을 구현합니다.
    setIsSubmitted(true); 
  };

  // ★ '확인' 버튼 클릭 시 (제출 완료 화면에서)
  const handleConfirm = () => {
    setIsSubmitted(false); 
    form.resetFields();   
  };

  return (
    <>
      <Head>
        <title>설명서 등록 | 동문서답</title>
        <meta name="viewport" content="initial-scale=1, width-device-width" />
      </Head>

      <main style={{
        background: "var(--color-neutral-50)",
        minHeight: "100vh",
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* 1. 상단 헤더 (페이지 타이틀) */}
        <div
          style={{
            height: 56,
            display: "flex",
            alignItems: "center",
            justifyContent: 'center', 
            padding: "0 16px",
            background: cssBase("white"),
            position: "sticky",
            top: 0,
            zIndex: 10,
            borderBottom: `1px solid ${cssVar('neutral', 200)}`
          }}
        >
          <Typography.Title level={4} style={{ margin: 0 }}>
            설명서 등록
          </Typography.Title>
        </div>

        {/* 2. 내용 영역: 폼 또는 제출 완료 화면 */}
        <section style={{
          padding: "24px 16px",
          flexGrow: 1
        }}>
          {!isSubmitted ? (
            // --- 2-1. 폼 화면 ---
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              style={{
                background: cssBase('white'),
                padding: 24,
                borderRadius: 16,
                boxShadow: "var(--shadow-soft)"
              }}
            >
              <Form.Item
                name="category"
                label="카테고리"
                rules={[{ required: true, message: '카테고리를 선택해주세요.' }]}
              >
                <Select placeholder="제품 카테고리를 선택하세요">
                  {categories.map(c => (
                    <Option key={c.key} value={c.key}>
                      <Space>
                        {c.icon}
                        {c.label}
                      </Space>
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="manufacturer"
                label="제조사"
                rules={[{ required: true, message: '제조사명을 입력해주세요.' }]}
              >
                <Input placeholder="예: Samsung, LG, Apple" />
              </Form.Item>

              <Form.Item
                name="productName"
                label="제품명"
                rules={[{ required: true, message: '제품명을 입력해주세요.' }]}
              >
                <Input placeholder="예: 비스포크 냉장고, iPhone 15 Pro" />
              </Form.Item>

              <Form.Item
                name="pdf"
                label="PDF 설명서"
                rules={[{ required: true, message: 'PDF 파일을 업로드해주세요.' }]}
                valuePropName="fileList"
                // ★ 4. Upload 이벤트(e)의 타입을 'UploadChangeParam'로 명시합니다.
                getValueFromEvent={(e: UploadChangeParam) =>
                  Array.isArray(e) ? e : e && e.fileList
                }
              >
                <Dragger
                  name="file"
                  action="/api/dummy-upload" 
                  beforeUpload={() => {
                    return false;
                  }}
                  accept=".pdf"
                  maxCount={1}
                >
                  <p className="ant-upload-drag-icon"><InboxOutlined /></p>
                  <p className="ant-upload-text">클릭하거나 파일을 이 영역으로 드래그하세요</p>
                  <p className="ant-upload-hint">PDF 파일 1개만 업로드할 수 있습니다.</p>
                </Dragger>
              </Form.Item>

              <Form.Item style={{ marginTop: 24, marginBottom: 0 }}>
                <Button type="primary" htmlType="submit" block size="large">
                  제출하기
                </Button>
              </Form.Item>
            </Form>
          ) : (
            // --- 2-2. 제출 완료 화면 ---
            <Result
              status="success"
              title="제출이 완료되었습니다."
              subTitle="접수 내용 확인 후 관리자가 승인할 예정입니다. 감사합니다."
              extra={[
                <Button 
                  type="primary" 
                  key="confirm" 
                  onClick={handleConfirm} 
                  block 
                  size="large"
                >
                  확인 (돌아가기)
                </Button>
              ]}
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
            { href: "/note", label: "설명서 등록" }, // ★ 현재 페이지
            { href: "/more", label: "더보기" },
          ].map((item, i) => {

            const isActive = item.href === "/note";

            return (
              <Link
                href={item.href}
                key={item.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 48,
                  border: "none",
                  background: "transparent",
                  color: isActive
                    ? cssVar("blue", 700)
                    : "var(--color-greyscale-500)",
                  fontWeight: isActive ? 700 : 500,
                  textDecoration: 'none',
                  cursor: 'pointer'
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