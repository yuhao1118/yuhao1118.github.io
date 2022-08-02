import React from 'react';

const projects: Array<{
  category: string;
  title: string;
  slug: string;
  subtitle: string;
  period: string;
  tech: string;
  description?: JSX.Element;
  imageUrl?: string;
  bgColor?: string;
  team?: Array<{
    name: string;
    link?: string;
  }>;
  links: Array<{
    name: string;
    link: string;
  }>;
}> = [
  {
    category: 'Project',
    title: 'Python TCP ChatRoom',
    slug: '#python-tcp-chatroom',
    subtitle:
      '基于TCP协议实现的命令行聊天室。支持群聊和私聊功能。支持服务器日志记录。',
    period: '2021年2月',
    tech: 'Python + Socket',
    links: [
      {
        name: 'GitHub',
        link: 'https://github.com/yuhao1118/Network-System',
      },
    ],
  },
];

export default projects;
