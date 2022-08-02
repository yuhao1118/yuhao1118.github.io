import React, { useEffect, useRef, useState } from 'react';

import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import styles from './index.module.css';
import SocialLinks from '../components/SocialLinks';

const Home: React.FC = () => {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;

  const mainRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [headerHeight, setHeaderHeight] = useState(1536);
  const [bannerHeight, setBannerHeight] = useState(256);

  useEffect(() => {
    const tempHeaderHeight = Math.max(384, window.innerHeight);
    setHeaderHeight(tempHeaderHeight);
    setBannerHeight(Math.max(256, tempHeaderHeight / 2));
    setIsLoading(false);
    mainRef.current.hidden = false;
  }, []);

  return (
    <Layout>
      <header className={styles.heroBanner} style={{ minHeight: headerHeight }}>
        <div
          className={styles.heroBannerWrapper}
          style={{
            minHeight: bannerHeight,
            display: isLoading ? 'none' : 'block',
          }}
        >
          <p>嗨，我叫</p>
          <h1 className="colorSuccess">李昱昊！</h1>
          <p>
            我是一位 <span className="colorWarning">计算机专业</span> 的{' '}
            <span className="colorDanger">前端开发者</span>
            ，热衷于解决有挑战的问题。
          </p>
          <SocialLinks />
          <p>
            在<Link to={useBaseUrl('#main')}>下面</Link>了解更多关于我的信息！
          </p>
        </div>
      </header>
      <main id="main" ref={mainRef} hidden={true}>
        <div className={styles.aboutHeader}>
          <h2 className="underlineColorSuccess">你好，世界</h2>
        </div>
        <div className={styles.about}>
          <div>
            <img
              className={styles.aboutProfilePic}
              src={useBaseUrl('img/profilepic.jpg')}
            />
          </div>
          <div className={styles.aboutText}>
            <h2>你好, </h2>
            <p>我是一位现居深圳/北京的计算机从业者。</p>
            <p>
              我喜欢用技术构建小而美，且有意义的东西，{' '}
              <Link to={useBaseUrl('projects/')}>
                无论是网站、应用程序还是游戏
              </Link>
              。
            </p>
            <p>
              我于2022年6月毕业于{' '}
              <a href="https://www.durham.ac.uk/homepage/">Durham University</a>{' '}
              杜伦大学，在那里我获得了{' '}
              <a href="https://www.durham.ac.uk/departments/academic/computer-science/">
                计算机科学一等荣誉学士学位
              </a>
              。{' '}
            </p>
            <p>
              我现在在{' '}
              <a href="https://www.bytedance.com/en/">
                字节跳动有限公司-商业化部门
              </a>{' '}
              工作，任职前端研发工程师。
            </p>
            <p>
              如果您有兴趣，可以阅读
              <Link to={useBaseUrl('/docs/intro')}>我的教程</Link>或查看
              <Link to={useBaseUrl('/projects')}>我的项目</Link>。
            </p>
          </div>
        </div>
        <section className={styles.directory}>
          <div className="container">
            <h3>继续探索？</h3>
            <nav className="pagination-nav">
              <div className="pagination-nav__item">
                <Link className="pagination-nav__link" to={useBaseUrl('blog/')}>
                  <div className="pagination-nav__sublabel">阅读</div>
                  <div className="pagination-nav__label">我的博客</div>
                </Link>
              </div>
              <div className="pagination-nav__item pagination-nav__item--next">
                <Link
                  className="pagination-nav__link"
                  to={useBaseUrl('docs/intro')}
                >
                  <div className="pagination-nav__sublabel">阅读</div>
                  <div className="pagination-nav__label">我的教程</div>
                </Link>
              </div>
            </nav>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default Home;
