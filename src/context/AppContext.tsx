"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface AppState {
  cameraPermission: boolean;
  setCameraPermission: (v: boolean) => void;
  goalMinutes: number;
  setGoalMinutes: (v: number) => void;
  shareActivity: boolean;
  setShareActivity: (v: boolean) => void;
  shareCount: boolean;
  setShareCount: (v: boolean) => void;
  shareMentalScore: boolean;
  setShareMentalScore: (v: boolean) => void;
  shareTrainingDetail: boolean;
  setShareTrainingDetail: (v: boolean) => void;
  shareTrainingVideo: boolean;
  setShareTrainingVideo: (v: boolean) => void;
  showBadgeModal: boolean;
  setShowBadgeModal: (v: boolean) => void;
  completedExercise: boolean;
  setCompletedExercise: (v: boolean) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [cameraPermission, setCameraPermission] = useState(false);
  const [goalMinutes, setGoalMinutes] = useState(10);
  const [shareActivity, setShareActivity] = useState(true);
  const [shareCount, setShareCount] = useState(true);
  const [shareMentalScore, setShareMentalScore] = useState(false);
  const [shareTrainingDetail, setShareTrainingDetail] = useState(false);
  const [shareTrainingVideo, setShareTrainingVideo] = useState(false);
  const [showBadgeModal, setShowBadgeModal] = useState(false);
  const [completedExercise, setCompletedExercise] = useState(false);

  return (
    <AppContext.Provider
      value={{
        cameraPermission,
        setCameraPermission,
        goalMinutes,
        setGoalMinutes,
        shareActivity,
        setShareActivity,
        shareCount,
        setShareCount,
        shareMentalScore,
        setShareMentalScore,
        shareTrainingDetail,
        setShareTrainingDetail,
        shareTrainingVideo,
        setShareTrainingVideo,
        showBadgeModal,
        setShowBadgeModal,
        completedExercise,
        setCompletedExercise,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
}
