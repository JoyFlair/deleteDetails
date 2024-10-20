'use client';

import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Table } from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "axios";

const Owners = () => {
  const [showUpdate, setShowUpdate] = useState(false);
  const [editFullname, setEditFullname] = useState("");
  const [editContact, setEditContact] = useState("");
  const [editAddress, setEditAddress] = useState("");
  const [ownerId, setOwnerId] = useState(null);

  const [showDelete, setShowDelete] = useState(false);
  const [deleteOwnerInfo, setDeleteOwnerInfo] = useState(null);

  const [ownerList, setOwnerList] = useState([]);

  const getOwner = async () => {
    try {
      const response = await axios.get("http://localhost/contacts-api/contact.php", {
        params: { json: JSON.stringify({}), operation: "getOwner" },
      });
      setOwnerList(response.data);
    } catch (error) {
      console.error("Error fetching owner list:", error);
    }
  };

  useEffect(() => {
    getOwner();
  }, []);

  const handleUpdateShow = (owner) => {
    setOwnerId(owner.contact_id); 
    setEditFullname(owner.contact_name);
    setEditContact(owner.contact_phone);
    setEditAddress(owner.contact_address);
    setShowUpdate(true);
  };

  const handleUpdateClose = () => setShowUpdate(false);

  const updateOwner = async () => {
    try {
      const response = await axios.post("http://localhost/contacts-api/contact.php", {
        json: JSON.stringify({
          owner_id: ownerId,
          fullname: editFullname,
          contact: editContact,
          address: editAddress
        }),
        operation: "updateOwner"
      });

      if (response.data === 1) {
        Swal.fire('Updated!', 'The owner has been updated.', 'success');
        getOwner(); 
      } else {
        Swal.fire('Failed!', 'Failed to update the owner.', 'error');
      }
    } catch (error) {
      Swal.fire('Error!', 'An error occurred while updating the owner.', 'error');
    }

    handleUpdateClose();
  };

  const handleDeleteClick = (owner) => {
    setDeleteOwnerInfo(owner);
    setShowDelete(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await axios.get("http://localhost/contacts-api/contact.php", {
        params: { json: JSON.stringify({ owner_id: deleteOwnerInfo.contact_id }), operation: "deleteOwner" },
      });

      if (response.data === 1) {
        Swal.fire('Deleted!', 'The owner has been deleted.', 'success');
        getOwner(); 
      } else {
        Swal.fire('Failed!', 'Failed to delete the owner.', 'error');
      }
    } catch (error) {
      Swal.fire('Error!', 'An error occurred while deleting the owner.', 'error');
    }

    handleDeleteClose();
  };

  const handleDeleteClose = () => {
    setShowDelete(false);
    setDeleteOwnerInfo(null);
  };

  return (
    <>
      <Table striped bordered hover className="mt-4 table-primary text-center" responsive="xl">
        <thead>
          <tr>
            <th>Contact Name</th>
            <th>Contact Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {ownerList.map((owner) => (
            <tr key={owner.contact_id}>
              <td>{owner.contact_name}</td>
              <td>{owner.contact_phone}</td>
              <td>
                <Button variant="outline-dark" className="me-2">View</Button>
                <Button variant="outline-dark" className="me-2" onClick={() => handleUpdateShow(owner)}>Edit</Button>
                <Button variant="outline-dark" onClick={() => handleDeleteClick(owner)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Update Modal */}
      <Modal show={showUpdate} onHide={handleUpdateClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Owner</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formFullname">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter full name"
                value={editFullname}
                onChange={(e) => setEditFullname(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formContact">
              <Form.Label>Contact</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter contact"
                value={editContact}
                onChange={(e) => setEditContact(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter address"
                value={editAddress}
                onChange={(e) => setEditAddress(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" onClick={updateOwner}>
              Update
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleUpdateClose}>Close</Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      {deleteOwnerInfo && (
        <Modal show={showDelete} onHide={handleDeleteClose}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Deletion</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to delete the following contact?</p>
            <p><strong>Name:</strong> {deleteOwnerInfo.contact_name}</p>
            <p><strong>Phone:</strong> {deleteOwnerInfo.contact_phone}</p>
            <p><strong>Email:</strong> {deleteOwnerInfo.contact_email}</p>
            <p><strong>Address:</strong> {deleteOwnerInfo.contact_address}</p>
            <p><strong>Group:</strong> {deleteOwnerInfo.grp_name}</p>
            <p><strong>Owner:</strong> {deleteOwnerInfo.usr_fullname}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleDeleteClose}>Cancel</Button>
            <Button variant="danger" onClick={handleDeleteConfirm}>Delete</Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default Owners;