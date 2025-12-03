import React, { useState } from "react";
import { APP_ICONS } from "./appIcons";


export interface BusinessAppInterface {
  id: keyof typeof APP_ICONS;
  name: string;
  path: string;
  available: boolean;
};

export interface LayoutPropsInterface {
  children: React.ReactNode;
};

export interface DashboardInterface {
  id: keyof typeof APP_ICONS;
  name: string;
  description: string;
  path: string;
  available: boolean;
};
