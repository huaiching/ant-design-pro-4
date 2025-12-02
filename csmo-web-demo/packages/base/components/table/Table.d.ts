import type { ParamsType } from '@ant-design/pro-provider';
import 'antd/lib/table/style';
import type Summary from 'rc-table/lib/Footer/Summary';
import type { ProTableProps } from './typing';
declare const ProviderTableContainer: {
    <DataType extends Record<string, any>, Params extends ParamsType = ParamsType, ValueType = "text">(props: ProTableProps<DataType, Params, ValueType>): import("react/jsx-runtime").JSX.Element;
    Summary: typeof Summary;
};
export default ProviderTableContainer;
