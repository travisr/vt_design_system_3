import { InjectionToken } from '@angular/core';
import { MatCardConfig } from '@angular/material/card';

/**
 * OpenAI-style card configuration
 * Sets default appearance to 'outlined' for subtle borders
 */
export const VENNTIER_CARD_CONFIG: MatCardConfig = {
  appearance: 'outlined',
};

/**
 * Injection token for Venntier card configuration
 * Use this to provide OpenAI-style card defaults
 */
export const VENNTIER_CARD_CONFIG_TOKEN = new InjectionToken<MatCardConfig>(
  'VENNTIER_CARD_CONFIG',
  {
    providedIn: 'root',
    factory: () => VENNTIER_CARD_CONFIG,
  },
);
