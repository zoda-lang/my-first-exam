import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { adduser, chexbox, deleteimg, deleteuser, edituser, getUser, getUserById } from '../redusers/todos';
import { Button, Input, Modal, Card, Space, Checkbox, Typography, Upload, Spin } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;
const Api = "https://to-dos-api.softclub.tj";

const Redux = () => {
  const [editmodal, setEditmodal] = useState(false);
  const [editname, setEditname] = useState("");
  const [editdesc, setEditdesc] = useState("");
  const [editid, setEditid] = useState(null);
  const [addmodal, setAddmodal] = useState(false);
  const [infoModal, setInfoModal] = useState(false);
  const [name, setAddname] = useState("");
  const [desc, setAdddesc] = useState("");
  const [image, setAddimage] = useState([]);

  const dispatch = useDispatch();
  const { data, selectedUser, loading } = useSelector((state) => state.todos);

  useEffect(() => { dispatch(getUser()); }, [dispatch]);

  function openeditmodal(elem) { setEditname(elem.name); setEditdesc(elem.description); setEditid(elem.id); setEditmodal(true); }
  function handleEdit() { dispatch(edituser({ id: editid, name: editname, description: editdesc })); setEditmodal(false); }
  function showInfo(user) { dispatch(getUserById(user.id)); setInfoModal(true); }

  return (
    <div style={{ padding: 30 }}>
      <Title level={2}>Todo Users</Title>
      <Button type="primary" onClick={() => setAddmodal(true)} style={{ marginBottom: 20 }}>Add User</Button>

      <Modal title="Add New User" open={addmodal} onCancel={() => setAddmodal(false)}
        onOk={() => { dispatch(adduser({ name, desc, image })); setAddmodal(false); setAddname(""); setAdddesc(""); setAddimage([]); }}
        okText="Add" cancelText="Cancel">
        <Space direction="vertical" style={{ width: "100%" }}>
          <Input placeholder="Name" value={name} onChange={(e) => setAddname(e.target.value)} />
          <Input placeholder="Description" value={desc} onChange={(e) => setAdddesc(e.target.value)} />
          <Upload beforeUpload={() => false} multiple onChange={({ fileList }) => setAddimage(fileList)}>
            <Button icon={<UploadOutlined />}>Select Images</Button>
          </Upload>
        </Space>
      </Modal>

      <Modal title="Edit User" open={editmodal} onCancel={() => setEditmodal(false)} onOk={handleEdit} okText="Save" cancelText="Cancel">
        <Space direction="vertical" style={{ width: "100%" }}>
          <Input placeholder="Name" value={editname} onChange={(e) => setEditname(e.target.value)} />
          <Input placeholder="Description" value={editdesc} onChange={(e) => setEditdesc(e.target.value)} />
        </Space>
      </Modal>

      <Modal title="User Info" open={infoModal} onCancel={() => setInfoModal(false)} footer={null}>
        {loading ? <Spin /> : selectedUser ? (
          <>
            <Title level={4}>{selectedUser.name}</Title>
            <Text>{selectedUser.description}</Text>
            {selectedUser.images?.map(img => (
              <Card key={img.id} type="inner"><img src={`${Api}/images/${img.imageName}`} alt="user" style={{ width: 150, height: 150, objectFit: "cover" }} /></Card>
            ))}
          </>
        ) : <Text>No info found</Text>}
      </Modal>

      <Space direction="vertical" style={{ width: "100%" }}>
        {data?.map((elem) => (
          <Card key={elem.id} size="small" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <Title level={5}>{elem.name}</Title>
              <Text>{elem.description}</Text>
              <br />
              <Checkbox checked={elem.isCompleted} onChange={() => dispatch(chexbox(elem))}>{elem.isCompleted ? "Active" : "Inactive"}</Checkbox>
              <div style={{ marginTop: 10 }}>
                {elem.images?.map((el) => (
                  <Card key={el.id} type="inner" style={{ display: "inline-block", marginRight: 10 }}>
                    <img src={`${Api}/images/${el.imageName}`} alt="user" style={{ width: 150, height: 150, objectFit: "cover" }} />
                    <Button type="primary" danger size="small" style={{ marginTop: 5 }} onClick={() => dispatch(deleteimg(el.id))}>Delete Image</Button>
                  </Card>
                ))}
              </div>
            </div>
            <Space>
              <Button danger onClick={() => dispatch(deleteuser(elem.id))}>Delete</Button>
              <Button onClick={() => openeditmodal(elem)}>Edit</Button>
              <Button onClick={() => showInfo(elem)}>Info</Button>
            </Space>
          </Card>
        ))}
      </Space>
    </div>
  );
};

export default Redux;
