import * as payload from 'payload';

declare const arrayRowLabelField: (props: {
    fieldName: string;
    prefix: string;
}) => {
    clientProps: {
        fieldName: string;
        prefix: string;
    };
    path: string;
};

declare const weekdaysMap: Record<string, string>;
declare const openingHoursField: () => payload.Field;

declare const timeField: (props?: {
    condition?: (data: any, siblingData: any) => boolean;
    description?: string;
    fields?: payload.Field[];
    hidden?: boolean;
    hideGutter?: boolean;
    label?: string;
    localized?: boolean;
    name?: string;
    overrides?: Record<string, unknown>;
    required?: boolean;
}) => payload.Field;

export { arrayRowLabelField, openingHoursField, timeField, weekdaysMap };
