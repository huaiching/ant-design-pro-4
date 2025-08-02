import { MessageDescriptor } from 'react-intl';
import React from 'react';
import { PrimitiveType } from 'intl-messageformat';
export type ActionsProps = {
    submitter: React.ReactNode;
    collapsed?: boolean;
    onCollapse?: (collapsed: boolean) => void;
    needCollapse?: boolean;
    setCollapsed: (collapse: boolean) => void;
    isForm?: boolean;
    style?: React.CSSProperties;
    collapseRender?: ((collapsed: boolean, props: ActionsProps, formatMessage: (descriptor: MessageDescriptor, values?: Record<string, PrimitiveType>) => string, hiddenNum?: false | number) => React.ReactNode) | false;
    hiddenNum?: false | number;
};
declare const Actions: React.FC<ActionsProps>;
export default Actions;
