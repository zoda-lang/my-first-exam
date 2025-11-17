import React from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  addUser,
  deleteUser,
  setInpTitle,
  openModal,
  closeModal,
  setEditTitle,
  saveEdit
} from "../redusers/tidi"
import { Modal, Input, Button, Card, Space, Typography } from "antd"

const { Title } = Typography

const Reduxs = () => {
  const { data, inpTitle, modalEdit, editTitle } = useSelector(
    (state) => state.todo
  )
  const dispatch = useDispatch()

  return (
    <div style={{ padding: 30 }}>
      <Title level={2}>Todo List</Title>

      <Space style={{ marginBottom: 20 }}>
        <Input
          placeholder="Add new user"
          value={inpTitle}
          onChange={(e) => dispatch(setInpTitle(e.target.value))}
          style={{ width: 300 }}
        />
        <Button type="primary" onClick={() => dispatch(addUser())}>
          Add
        </Button>
      </Space>

      <Space direction="vertical" style={{ width: "100%" }}>
        {data.map((elem) => (
          <Card
            key={elem.id}
            size="small"
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
          >
            <span>{elem.title}</span>
            <Space>
              <Button danger onClick={() => dispatch(deleteUser(elem.id))}>
                Delete
              </Button>
              <Button type="default" onClick={() => dispatch(openModal(elem))}>
                Edit
              </Button>
            </Space>
          </Card>
        ))}
      </Space>

      <Modal
        title="Edit User"
        open={modalEdit}
        onCancel={() => dispatch(closeModal())}
        onOk={() => dispatch(saveEdit())}
        okText="Save"
        cancelText="Cancel"
      >
        <Input
          value={editTitle}
          onChange={(e) => dispatch(setEditTitle(e.target.value))}
          placeholder="Edit name"
        />
      </Modal>
    </div>
  )
}

export default Reduxs
