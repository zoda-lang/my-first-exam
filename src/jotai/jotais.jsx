import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import {
  dataAtom,
  fetchUsersAtom,
  addUserAtom,
  deleteUserAtom,
  updateUserAtom,
  checkboxAtom,
} from "../storej/jotais";
import { Button, Modal, Input, List, Checkbox } from "antd";

const Jotais = () => {
  const [users] = useAtom(dataAtom);
  const [, fetchUsers] = useAtom(fetchUsersAtom);
  const [, addUser] = useAtom(addUserAtom);
  const [, deleteUser] = useAtom(deleteUserAtom);
  const [, updateUser] = useAtom(updateUserAtom);
  const [, toggleStatus] = useAtom(checkboxAtom);

  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAdd = async () => {
    await addUser({ name });
    setAddOpen(false);
    setName("");
  };

  const openEditModal = (user) => {
    setEditId(user.id);
    setEditName(user.name);
    setEditOpen(true);
  };

  const handleEdit = async () => {
    await updateUser({ id: editId, name: editName });
    setEditOpen(false);
  };

  return (
    <div style={{ width: "500px", margin: "40px auto" }}>
      <h1>User List</h1>
      <Button type="primary" onClick={() => setAddOpen(true)}>
        + Add User
      </Button>

      <List
        style={{ marginTop: 20 }}
        bordered
        dataSource={users}
        renderItem={(user) => (
          <List.Item
            actions={[
              <Checkbox
                checked={user.status}
                onChange={() => toggleStatus({ id: user.id, status: user.status })}
              >
                {user.status ? "Active" : "Inactive"}
              </Checkbox>,
              <Button type="default" onClick={() => openEditModal(user)}>
                Edit
              </Button>,
              <Button danger onClick={() => deleteUser(user.id)}>
                Delete
              </Button>,
            ]}
          >
            <span style={{ textDecoration: user.status ? "line-through" : "none" }}>
              {user.name}
            </span>
          </List.Item>
        )}
      />

      <Modal
        title="Add User"
        open={addOpen}
        onOk={handleAdd}
        onCancel={() => setAddOpen(false)}
      >
        <Input
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Modal>

      <Modal
        title="Edit User"
        open={editOpen}
        onOk={handleEdit}
        onCancel={() => setEditOpen(false)}
      >
        <Input
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default Jotais;
