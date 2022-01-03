/**
 * Utils or Helper functions
 */

import { LocaleConstants } from "../constants";

const FormatUtils = {
    /**
     * Getter function which finds the current browser's locale language
     * `en` will be returned as fallback when unable to dedect the browser's locale
     * 
     * @property locale
     */
    get locale(): string {
        if (navigator.language) {
            return navigator.language;
        }
        if(navigator.languages.length > 0) {
            // locale value of array index 0
            return navigator.languages[0];
        }
        return LocaleConstants.Locale;
    },
    /**
     * Utils function to format a amount or currency value to display in UI
     * 
     * @param value - A non empty number to be formatted (e.g 156820000)
     * @param currency - Amount to be formatted with currency (e.g `usd`)
     * @returns - Returns the formatted string (e.g US$156,820,000.00)
     */
    formatCurrency(value: number = 0, currency: string): string {
        return new Intl.NumberFormat(
            this.locale, { style: 'currency', currency })
            .format(value)
    },
    /**
     * Utils function to format a number to display in UI
     * 
     * @param value - A non empty number to be formatted (e.g 157000000)
     * @returns - Returns the formatted string (e.g 157,000,000)
     */
    formatNumber(value: number = 0): string {
        return new Intl.NumberFormat(
            this.locale, { maximumSignificantDigits: LocaleConstants.MaximumSignificantDigits })
            .format(value);
    }
} as const;

export default FormatUtils;