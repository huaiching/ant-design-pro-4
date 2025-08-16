import { TabPaneProps } from 'antd';
import type { LabelTooltipType } from 'antd/lib/form/FormItemLabel';
import type { SearchProps } from 'antd/lib/input';
import React from 'react';
import type { ActionType, ExportOptions } from '../../typing';
import type { ListToolBarHeaderMenuProps } from './HeaderMenu';
export type ListToolBarSetting = {
    icon: React.ReactNode;
    tooltip?: LabelTooltipType | string;
    key?: string;
    onClick?: (key?: string) => void;
};
type TabPane = TabPaneProps & {
    key?: string;
};
export type ListToolBarTabs = {
    activeKey?: string;
    defaultActiveKey?: string;
    onChange?: (activeKey: string) => void;
    items?: TabPane[];
};
export type ListToolBarMenu = ListToolBarHeaderMenuProps;
type SearchPropType = (SearchProps & {
    onSearch: (searchValue: string) => Promise<false | void> | false | void;
}) | React.ReactNode | boolean;
type SettingPropType = React.ReactNode | ListToolBarSetting;
export type ListToolBarProps = {
    prefixCls?: string;
    className?: string;
    style?: React.CSSProperties;
    title?: React.ReactNode;
    subTitle?: React.ReactNode;
    tooltip?: string | LabelTooltipType;
    search?: SearchPropType;
    onSearch?: (keyWords: string) => void;
    actions?: React.ReactNode[];
    action?: React.MutableRefObject<ActionType | undefined>;
    settings?: SettingPropType[];
    multipleLine?: boolean;
    filter?: React.ReactNode;
    tabs?: ListToolBarTabs;
    menu?: ListToolBarMenu;
    moduleName?: string;
    hasSearch?: boolean;
    exportOptions?: ExportOptions;
    collapsed?: boolean;
    needCollapsed?: boolean;
    setCollapsed?: React.Dispatch<React.SetStateAction<boolean>>;
};
declare const ListToolBar: React.FC<ListToolBarProps>;
export default ListToolBar;
