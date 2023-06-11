import { StateSchema } from '@/app/providers/StoreProvider';

export const selectProfileFormData = (state: StateSchema) => state.profile?.form;
