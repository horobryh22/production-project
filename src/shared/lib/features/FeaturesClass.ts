import { FeaturesFlags } from '@/shared/types/features';

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
}

export const features = new Features({});
