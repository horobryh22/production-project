export interface FeaturesFlags {
    isArticleRatingEnabled?: boolean;
}

export interface ToggleFeature<T> {
    name: keyof FeaturesFlags;
    on: () => T;
    off: () => T;
}
