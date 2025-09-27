import React from 'react';
import { Button, Popover } from 'antd';

export default () => {
  return (
    <Popover
      content={
        <div>
          <img src="https://picsum.photos/200" alt="demo" style={{ width: 400 }} />
          <Button type="link">更多操作</Button>
        </div>
      }
      trigger="click"
      placement="bottom"
    >
      <Button type="primary">點我展開</Button>
    </Popover>
  );
};
