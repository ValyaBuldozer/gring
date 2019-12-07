export type QueryParams = { [k: string]: string | number | null | undefined };

export function getFetchPath(basePath: string, queryParams: QueryParams): string {
    const queryString =Object.entries(queryParams)
        .filter(([key, val]) => val != null)
        .map(([key, val]) => key + '=' + val)
        .join('&')

    return `${basePath}?${queryString}`;
}
