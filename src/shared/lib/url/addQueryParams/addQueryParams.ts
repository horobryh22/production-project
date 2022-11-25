export function getQueryParams(params: OptionalRecord<string, string>) {
    const searchParams = new URLSearchParams(window.location.search);

    Object.entries(params).forEach(([name, value]) => {
        if (value !== undefined) {
            searchParams.set(name, value);
        }
    });

    return `?${searchParams.toString()}`;
}

/**
 * Function for adding filter params (sort, search, order) to URL
 * @param params
 */

export const addQueryParams = (params: OptionalRecord<string, string>) => {
    window.history.pushState(null, '', getQueryParams(params));
};
