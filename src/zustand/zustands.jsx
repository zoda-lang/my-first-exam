import { useState, useEffect } from "react";
import { useTodo } from "../storez/zustore";
import { Button, Input, Modal, List, Checkbox } from "antd";

const Zustands = () => {
  const { todos, addTodo, deleteTodo, editTodo, chexbox } = useTodo();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [addName, setAddName] = useState("");
  const [editText, setEditText] = useState("");
  const [editId, setEditId] = useState(null);

  const handleAdd = async () => {
    await addTodo(addName);
    setAddName("");
    setIsAddModalOpen(false);
  };

  
  const openEditModal = (todo) => {
    setEditId(todo.id);
    setEditText(todo.name);
    setIsEditModalOpen(true);
  };

  const handleEdit = async () => {
    await editTodo(editId, editText);
    setIsEditModalOpen(false);
  };

  return (
    <div style={{ padding: 30 }}>
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
          value={addName}
          onChange={(e) => setAddName(e.target.value)}
          placeholder="Enter name"
        />
      </Modal>

      <Modal
        title="Edit User"
        open={isEditModalOpen}
        onOk={handleEdit}
        onCancel={() => setIsEditModalOpen(false)}
      >
        <Input
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          placeholder="Edit name"
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
            <span
              style={{
                textDecoration: item.status ? "line-through" : "none",
                fontWeight: "bold",
              }}
            >
              {item.name}
            </span>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Zustands;
