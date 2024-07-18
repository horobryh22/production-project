import type { StateSchema } from '@/app/providers/StoreProvider';
import { buildSelector } from '@/shared/store/buildSelector';

import type { JsonSettings } from '../types';

const DEFAULT_JSON_SETTINGS: JsonSettings = {};

export const [useJsonSettings, jsonSettingsSelector] = buildSelector(
    (state: StateSchema) => state.user?.authData?.jsonSettings ?? DEFAULT_JSON_SETTINGS,
);
