import React, { useState, useEffect } from "react";
import { useTodo } from "../storez/astore";
import { Button, Input, Modal, List, Checkbox } from "antd";

const Zustand = () => {
  const { todos, getTodos, addTodo, deleteTodo, editTodo, chexbox } = useTodo();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editAge, setEditAge] = useState("");

  useEffect(() => {
    getTodos(); 
  }, []);

  
  const handleAdd = () => {
    addTodo(name, age);
    setName("");
    setAge("");
    setIsAddModalOpen(false);
  };


  const openEditModal = (elem) => {
    setEditId(elem.id);
    setEditName(elem.name);
    setEditAge(elem.age);
    setIsEditModalOpen(true);
  };

  const handleEdit = () => {
    editTodo(editId, editName, editAge);
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
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginBottom: 10 }}
        />
        <Input
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </Modal>

      <Modal
        title="Edit User"
        open={isEditModalOpen}
        onOk={handleEdit}
        onCancel={() => setIsEditModalOpen(false)}
      >
        <Input
          placeholder="Name"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
          style={{ marginBottom: 10 }}
        />
        <Input
          placeholder="Age"
          value={editAge}
          onChange={(e) => setEditAge(e.target.value)}
        />
      </Modal>

      <List
        style={{ marginTop: 20 }}
        bordered
        dataSource={todos}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Checkbox
                checked={item.status}
                onChange={() => chexbox(item.id, item.status)}
              >
                {item.status ? "Active" : "Inactive"}
              </Checkbox>,
              <Button danger onClick={() => deleteTodo(item.id)}>
                Delete
              </Button>,
              <Button type="default" onClick={() => openEditModal(item)}>
                Edit
              </Button>,
            ]}
          >
            <div>
              <strong style={{ marginRight: 10 }}>{item.name}</strong>
              <span>{item.age}</span>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Zustand;
