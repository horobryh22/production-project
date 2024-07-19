import { ReactElement } from 'react';

import { features } from '@/shared/lib/features/FeaturesClass';
import { FeaturesFlags } from '@/shared/types/features';

interface ToggleFeatureProps {
    feature: keyof FeaturesFlags;
    on: ReactElement;
    off: ReactElement;
}

export const ToggleFeature = (props: ToggleFeatureProps): ReactElement => {
    const { off, on, feature } = props;

    if (features.getFeatureFlags(feature)) {
        return on;
    }

    return off;
};
