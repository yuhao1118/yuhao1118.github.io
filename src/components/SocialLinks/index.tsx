import React from "react";
import { dom } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./styles.module.css";

import { socialLinks } from "../../constants/";

const SocialLink: React.FC<{
  faIcon: any;
  url: string;
  alt: string;
}> = ({ faIcon, alt, url }) => {
  return (
    <div>
      <a href={url}>
        <FontAwesomeIcon title={alt} icon={faIcon} size="2x" />
      </a>
    </div>
  );
}

const SocialLinks: React.FC = () => {
  return (
    <div className={styles.socialLinks}>
      <style type="text/css">{dom.css()}</style>
      {socialLinks.map((props, idx) => (
        <SocialLink key={idx} {...props} />
      ))}
    </div>
  );
}

export default SocialLinks;