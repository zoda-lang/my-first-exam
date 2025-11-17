import React, { useState } from "react";
import { useAtom } from "jotai";
import {
  dataAtom,
  addUserAtom,
  deleteUserAtom,
  updateUserAtom,
  chexbox,
} from "../storej/jotai";
import { Button, Modal, Input, List, Checkbox } from "antd";

function Jotai() {
  const [data] = useAtom(dataAtom);
  const [, addUser] = useAtom(addUserAtom);
  const [, deleteUser] = useAtom(deleteUserAtom);
  const [, updateUser] = useAtom(updateUserAtom);
  const [, checkbox] = useAtom(chexbox);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [editName, setEditName] = useState("");
  const [editId, setEditId] = useState(null);

  const openEditModal = (user) => {
    setEditId(user.id);
    setEditName(user.name);
    setIsEditModalOpen(true);
  };

  const handleAdd = () => {
    addUser(newName);
    setNewName("");
    setIsAddModalOpen(false);
  };

  const handleEdit = () => {
    updateUser({ id: editId, name: editName });
    setIsEditModalOpen(false);
  };

  return (
    <div style={{ width: "500px", margin: "50px auto" }}>
      <Button type="primary" onClick={() => setIsAddModalOpen(true)}>
        Add User
      </Button>

      <Modal
        title="Add User"
        open={isAddModalOpen}
        onOk={handleAdd}
        onCancel={() => setIsAddModalOpen(false)}
      >
        <Input
          placeholder="Enter name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
      </Modal>

      <Modal
        title="Edit User"
        open={isEditModalOpen}
        onOk={handleEdit}
        onCancel={() => setIsEditModalOpen(false)}
      >
        <Input
          placeholder="Edit name"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
        />
      </Modal>

      <List
        style={{ marginTop: 20 }}
        bordered
        dataSource={data}
        renderItem={(user) => (
          <List.Item
            actions={[
              <Checkbox
                checked={user.status}
                onChange={() => checkbox(user.id)}
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
            <div>{user.name}</div>
          </List.Item>
        )}
      />
    </div>
  );
}

export default Jotai;
