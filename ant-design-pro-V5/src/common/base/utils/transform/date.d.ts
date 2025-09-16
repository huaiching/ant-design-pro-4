import dayjs, { Dayjs } from 'dayjs';
import type { IntlShape } from 'react-intl';
export declare const toTaiwan: (gYear: number, month?: number, day?: number) => {
    year: string;
    month: number | undefined;
    day: number | undefined;
};
export declare const dateToADDate: (dateString: Dayjs | string | undefined, formatMessage: IntlShape['formatMessage']) => string | null | undefined;
export declare const dateToADYear: (dateString: Dayjs | string | undefined, formatMessage: IntlShape['formatMessage']) => string | null | undefined;
export declare const dateToADMonth: (dateString: Dayjs | string | undefined, formatMessage: IntlShape['formatMessage'], valueType?: string) => string | number | null | undefined;
export declare const dateToROCDateWithFormat: (dateString: Dayjs | string | undefined, format: string) => string | undefined;
export declare const dateToROCMonth: (dateString: Dayjs | string | undefined, formatMessage: IntlShape['formatMessage']) => string | null | undefined;
export declare const dateToROCDate: (dateString: Dayjs | string | undefined, formatMessage: IntlShape['formatMessage']) => string | null | undefined;
export declare const dateTimeToUTC: (dateString: Dayjs | string | undefined, formatMessage: IntlShape['formatMessage']) => any;
export declare const getDayjsObject: (dateString: Dayjs | string | undefined, formatMessage: IntlShape['formatMessage']) => dayjs.Dayjs | undefined;
export declare const getDateObject: (dateString: string | undefined, formatMessage: IntlShape['formatMessage']) => dayjs.Dayjs | undefined;
export declare const utc2Dayjs: (dateString: string | undefined) => dayjs.Dayjs | null;
export declare const getLocalTimeString: (dateString: string | undefined) => string;
export declare const genTimeCriterion: (start: string, end: string, columnName: string, formatStr?: string) => {
    field: string;
    values: (string | dayjs.Dayjs)[];
    queryOperator: string;
}[] | {
    field: string;
    value: string | dayjs.Dayjs;
    queryOperator: string;
}[];
export declare const isUtc: (date: string) => boolean;
export declare const currentTimeROCAmPm: (formatMessage: IntlShape['formatMessage']) => string;
