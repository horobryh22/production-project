import { ReactNode } from 'react';

import { FeaturesFlags, ToggleFeature } from '@/shared/types/features';

class Features {
    private featureFlags: FeaturesFlags;

    constructor(featuresFlags: FeaturesFlags) {
        this.featureFlags = featuresFlags;
    }

    getFeatureFlags(featureFlag: keyof FeaturesFlags) {
        return this.featureFlags[featureFlag];
    }

    setFeatureFlags(newFeatureFlags?: FeaturesFlags) {
        if (newFeatureFlags) {
            this.featureFlags = newFeatureFlags;
        }
    }

    toggleFeature<T extends ReactNode>({ name, on, off }: ToggleFeature<T>): T {
        if (this.featureFlags[name]) {
            return on();
        }

        return off();
    }
}

export const features = new Features({});
