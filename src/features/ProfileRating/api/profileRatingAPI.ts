import type { Rating } from '@/entities/Rating';
import { rtkApi } from '@/shared/api/rtkApi';

interface FetchProfileRatingArgs {
    userId: string;
    profileId: string;
}

interface RateProfileArgs extends Rating {
    userId: string;
    profileId: string;
}

const profileRatingApi = rtkApi.injectEndpoints({
    endpoints: build => ({
        // query - запрос за данными (GET)
        fetchProfileRating: build.query<Rating[], FetchProfileRatingArgs>({
            query: ({ profileId, userId }) => ({
                url: '/profile-rating',
                params: {
                    profileId,
                    userId,
                },
            }),
        }),
        // mutation - изменение данных (POST, PUT, DELETE, PATCH)
        rateProfile: build.mutation<void, RateProfileArgs>({
            query: args => ({
                url: '/profile-rating',
                method: 'POST',
                body: args,
            }),
        }),
    }),
});

export const useProfileRating = profileRatingApi.useFetchProfileRatingQuery;
export const useRateProfile = profileRatingApi.useRateProfileMutation;
