/**
 * Type of Http / Nework Request
 */

 export interface NetworkRequestType<TRequestParams> {
    /**
     * request api end point
     *
     * @api - { String }
     */
    api: string;

    /**
     * Params - data to be posted or send as query params
     *
     * @params - { Object }
     */
    params: TRequestParams;
}

export interface NetworkResponse<TResponse> {
    /**
     * Response code
     */
    responseCode?: string;

    /**
     * Response data as an object
     */
    data: TResponse;
}
