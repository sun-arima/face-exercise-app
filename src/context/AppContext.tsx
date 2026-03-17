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
  showBadgeModal: boolean;
  setShowBadgeModal: (v: boolean) => void;
  completedExercise: boolean;
  setCompletedExercise: (v: boolean) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [cameraPermission, setCameraPermission] = useState(false);
  const [goalMinutes, setGoalMinutes] = useState(15);
  const [shareActivity, setShareActivity] = useState(true);
  const [shareCount, setShareCount] = useState(true);
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
