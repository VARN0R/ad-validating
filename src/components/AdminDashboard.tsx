import React, { useEffect, useState } from "react";
import { Ad } from "../types/types";
import {
  fetchAds,
  validateAd,
  deleteAd,
  createBlogPost,
  getAdsId,
  getClientAdStat,
} from "../services/api";
import styles from "./AdminDashboard.module.css";

const AdminDashboard: React.FC = () => {
  const [id, setId] = useState<number[]>([]);
  const [ads, setAds] = useState<Ad[]>([]);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const adminAdsId = await getAdsId();
        setId(adminAdsId);
      } catch (error) {
        setMessage({ text: "Failed to load ads.", type: "error" });
      }
    };

    fetchAds();

    const loadAdsStats = async (adsId: number[]) => {
      const adsPromises = adsId.map(async (id) => {
        const ad = await getClientAdStat(id);
        return ad;
      });

      const adsResults = await Promise.all(adsPromises);

      const validAds = adsResults.filter((ad) => ad !== null) as Ad[];

      setAds((prevAds) => [...prevAds, ...validAds]);
    };

    loadAdsStats(id);
  }, []);

  const handleValidateAd = async (adId: string) => {
    try {
      await validateAd(adId);
      setAds(ads.filter((ad) => ad.adId !== adId));
      setMessage({ text: "Ad validated successfully!", type: "success" });
    } catch (error) {
      setMessage({ text: "Failed to validate ad.", type: "error" });
    }
  };

  const handleDeleteAd = async (adId: string) => {
    try {
      await deleteAd(adId);
      setAds(ads.filter((ad) => ad.adId !== adId));
      setMessage({ text: "Ad deleted successfully!", type: "success" });
    } catch (error) {
      setMessage({ text: "Failed to delete ad.", type: "error" });
    }
  };

  const handleCreateBlogPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (blogTitle && blogContent) {
      try {
        await createBlogPost(blogTitle, blogContent);
        setBlogTitle("");
        setBlogContent("");
        setMessage({
          text: "Blog post created successfully!",
          type: "success",
        });
      } catch (error) {
        setMessage({ text: "Failed to create blog post.", type: "error" });
      }
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <h2 className={styles.title}>Admin Dashboard</h2>

      <h3 className={styles.sectionTitle}>Moderate Ads</h3>
      <ul className={styles.adList}>
        {ads.map((ad) => (
          <li key={ad.adId} className={styles.adItem}>
            <p>Ad ID: {ad.adId}</p>
            <div>
              <button
                onClick={() => handleValidateAd(ad.adId)}
                className={`${styles.button} ${styles.validateButton}`}
              >
                Validate
              </button>
              <button
                onClick={() => handleDeleteAd(ad.adId)}
                className={`${styles.button} ${styles.deleteButton}`}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      <h3 className={styles.sectionTitle}>Create Blog Post</h3>
      <form onSubmit={handleCreateBlogPost} className={styles.form}>
        <input
          type="text"
          placeholder="Title"
          value={blogTitle}
          onChange={(e) => setBlogTitle(e.target.value)}
          className={styles.input}
        />
        <textarea
          placeholder="Content"
          value={blogContent}
          onChange={(e) => setBlogContent(e.target.value)}
          className={styles.textarea}
        />
        <button type="submit" className={styles.submitButton}>
          Publish
        </button>
      </form>

      {message && (
        <div
          className={
            message.type === "success"
              ? styles.successMessage
              : styles.errorMessage
          }
        >
          {message.text}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
