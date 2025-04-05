import React, { useState } from 'react';
import { useUserGlobalContext } from '../store/useUserContext';
import { Button, Input, Space } from 'antd';

const Profile: React.FC = () => {
  const { user, updateUser } = useUserGlobalContext();
  const [newUser, setNewUser] = useState(user);

  const handleUpdate = () => {
    updateUser(newUser);
  };

  return (
    <Space>
      <Input
        type="text"
        placeholder="姓名"
        value={newUser.name}
        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
      />
      <Input
        type="number"
        placeholder="年齡"
        value={newUser.age}
        onChange={(e) => setNewUser({ ...newUser, age: Number(e.target.value) })}
      />
      <Input
        type="text"
        placeholder="性別"
        value={newUser.gender}
        onChange={(e) => setNewUser({ ...newUser, gender: e.target.value })}
      />
      <Button onClick={handleUpdate}>Update</Button>
    </Space>
  );
};

export default Profile;
