import React, { useState, useEffect } from "react";
import { Ad } from "../types/types";
import {
  uploadAd,
  getAdsId,
  uploadMediaFile,
  getClientAdStat,
} from "../services/api";
import styles from "./ClientDashboard.module.css";

const ClientDashboard: React.FC = () => {
  const [adsId, setAdId] = useState<number[]>([]);
  const [forwardUrl, setForwardUrl] = useState<string>("");
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaUrl, setMediaUrl] = useState<string>("");
  const [centsPerView, setCentsPerView] = useState<number>(0);
  const [centsPerClick, setCentsPerClick] = useState<number>(0);
  const [viewGoal, setViewGoal] = useState<number>(0);
  const [ads, setAds] = useState<Ad[]>([]);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const clientAdsId = await getAdsId();
        setAdId(clientAdsId);
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

    loadAdsStats(adsId);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setMediaFile(e.target.files[0]);
    }
  };

  const handleUploadFile = async () => {
    if (!mediaFile) {
      setMessage({ text: "Please select a file to upload.", type: "error" });
      return;
    }

    const formData = new FormData();
    formData.append("file", mediaFile);

    try {
      const response = await uploadMediaFile(formData);
      if (response.url) {
        setMediaUrl(response.url);
        setMessage({ text: "File uploaded successfully!", type: "success" });
      } else {
        setMessage({ text: "Failed to get file URL.", type: "error" });
      }
    } catch (error) {
      setMessage({ text: "Failed to upload file.", type: "error" });
    }
  };

  const handleUploadAd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newAd = await uploadAd(
        mediaUrl,
        forwardUrl,
        centsPerView,
        centsPerClick,
        viewGoal
      );
      if (newAd) {
        setForwardUrl("");
        setMediaFile(null);
        setMediaUrl("");
        setCentsPerView(0);
        setCentsPerClick(0);
        setViewGoal(0);
        setMessage({ text: "Ad uploaded successfully!", type: "success" });
      }
    } catch (error) {
      setMessage({ text: "Failed to upload ad.", type: "error" });
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <h2 className={styles.title}>Client Dashboard</h2>

      <div className={styles.fileUploadContainer}>
        <label className={styles.label}>
          Media File:
          <input
            type="file"
            className={styles.input}
            onChange={handleFileChange}
          />
        </label>
        <button
          type="button"
          className={styles.button}
          onClick={handleUploadFile}
        >
          Upload File
        </button>
      </div>

      <form onSubmit={handleUploadAd} className={styles.formGroup}>
        <label className={styles.label}>
          Forward URL:
          <input
            type="text"
            className={styles.input}
            value={forwardUrl}
            onChange={(e) => setForwardUrl(e.target.value)}
            required
          />
        </label>

        <label className={styles.label}>
          Media URL:
          <input
            type="text"
            className={styles.input}
            value={mediaUrl}
            onChange={(e) => setMediaUrl(e.target.value)}
            required
          />
        </label>

        <label className={styles.label}>
          Cents Per View:
          <input
            type="number"
            className={styles.input}
            value={centsPerView}
            onChange={(e) => setCentsPerView(Number(e.target.value))}
            required
          />
        </label>

        <label className={styles.label}>
          Cents Per Click:
          <input
            type="number"
            className={styles.input}
            value={centsPerClick}
            onChange={(e) => setCentsPerClick(Number(e.target.value))}
            required
          />
        </label>

        <label className={styles.label}>
          View Goal:
          <input
            type="number"
            className={styles.input}
            value={viewGoal}
            onChange={(e) => setViewGoal(Number(e.target.value))}
            required
          />
        </label>

        <button type="submit" className={styles.button}>
          Upload
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

      <h3>Your Ads</h3>
      <ul className={styles.adList}>
        {ads.map((ad) => (
          <li key={ad.adId} className={styles.adItem}>
            <p>Ad ID: {ad.adId}</p>
            <p>
              Views: {ad.views}, Clicks: {ad.clicks}, Деньги за просмотры и
              клики: $
              {Number(ad.centsPerClick) * ad.clicks +
                Number(ad.centsPerView) * ad.views}
              Цель по просмотрам: {ad.viewGoal}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientDashboard;
