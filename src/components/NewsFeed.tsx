import React, { useEffect, useState } from "react";
import { Ad, AdForNews } from "../types/types";
import AdDisplay from "./AdDisplay";
import { fetchAds } from "../services/api";
import styles from "./NewsFeed.module.css";

const NewsFeed: React.FC = () => {
  const [ads, setAds] = useState<AdForNews[]>([]);

  useEffect(() => {
    const loadAds = async () => {
      const ads = await fetchAds(5);
      if (ads) {
        setAds(ads);
      }
    };

    loadAds();
  }, []);

  return (
    <div className={styles.newsFeedContainer}>
      <div className={styles.newsSection}>
        <h1>Новости</h1>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, enim
        reprehenderit error saepe magnam amet consequuntur, nisi fuga id
        excepturi deleniti voluptatum quisquam ipsam consequatur alias
        recusandae iste quaerat earum! Lorem ipsum dolor sit, amet consectetur
        adipisicing elit. Dicta quidem esse aliquid nihil ut perferendis
        deleniti repudiandae ipsum delectus animi odit facilis, commodi
        veritatis perspiciatis explicabo fuga! Deleniti, eius ullam!
      </div>

      <div className={styles.newsSection}>
        <h1>Новости</h1>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, enim
        reprehenderit error saepe magnam amet consequuntur, nisi fuga id
        excepturi deleniti voluptatum quisquam ipsam consequatur alias
        recusandae iste quaerat earum! Lorem ipsum dolor sit, amet consectetur
        adipisicing elit. Dicta quidem esse aliquid nihil ut perferendis
        deleniti repudiandae ipsum delectus animi odit facilis, commodi
        veritatis perspiciatis explicabo fuga! Deleniti, eius ullam!
      </div>

      <div className={styles.newsSection}>
        <h1>Новости</h1>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, enim
        reprehenderit error saepe magnam amet consequuntur, nisi fuga id
        excepturi deleniti voluptatum quisquam ipsam consequatur alias
        recusandae iste quaerat earum! Lorem ipsum dolor sit, amet consectetur
        adipisicing elit. Dicta quidem esse aliquid nihil ut perferendis
        deleniti repudiandae ipsum delectus animi odit facilis, commodi
        veritatis perspiciatis explicabo fuga! Deleniti, eius ullam!
      </div>

      <div className={styles.newsSection}>
        <h1>Новости</h1>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, enim
        reprehenderit error saepe magnam amet consequuntur, nisi fuga id
        excepturi deleniti voluptatum quisquam ipsam consequatur alias
        recusandae iste quaerat earum! Lorem ipsum dolor sit, amet consectetur
        adipisicing elit. Dicta quidem esse aliquid nihil ut perferendis
        deleniti repudiandae ipsum delectus animi odit facilis, commodi
        veritatis perspiciatis explicabo fuga! Deleniti, eius ullam!
      </div>

      <div className={styles.newsSection}>
        <h1>Новости</h1>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, enim
        reprehenderit error saepe magnam amet consequuntur, nisi fuga id
        excepturi deleniti voluptatum quisquam ipsam consequatur alias
        recusandae iste quaerat earum! Lorem ipsum dolor sit, amet consectetur
        adipisicing elit. Dicta quidem esse aliquid nihil ut perferendis
        deleniti repudiandae ipsum delectus animi odit facilis, commodi
        veritatis perspiciatis explicabo fuga! Deleniti, eius ullam!
      </div>

      <aside className={styles.adSection}>
        <h3>Sponsored Ads</h3>
        {ads.slice(0, 5).map((ad) => (
          <div className={styles.adItem}>
            <AdDisplay ad={ad} />
          </div>
        ))}
      </aside>
    </div>
  );
};

export default NewsFeed;
