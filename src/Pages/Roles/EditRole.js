import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RoleService from "../../Services/RolesService/RolesService";

const EditRole = () => {
  const { id } = useParams(); // Získání ID role z URL
  const navigate = useNavigate();
  const [roleName, setRoleName] = useState(""); // Název role zobrazený pouze jako text
  const [nonMembers, setNonMembers] = useState([]);
  const [members, setMembers] = useState([]);
  const [addIds, setAddIds] = useState([]);
  const [deleteIds, setDeleteIds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const roleData = await RoleService.getRoleById(id);
        setRoleName(roleData.name); // Nastavení názvu role pouze pro zobrazení
        setNonMembers(roleData.nonMembers || []);
        setMembers(roleData.members || []);
      } catch (error) {
        console.error("Error loading role data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleAddIdsChange = (userId) => {
    setAddIds((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  const handleDeleteIdsChange = (userId) => {
    setDeleteIds((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  const handleSave = async () => {
    try {
      await RoleService.updateRole(id, {
        addIds: addIds,
        deleteIds: deleteIds,
      });
      alert("Role updated successfully.");
      navigate("/roles");
    } catch (error) {
      console.error("Error updating role:", error);
      alert("Failed to update role.");
    }
  };

  return (
    <div className="container">
      <h1>Edit Role: {roleName}</h1>
      <button className="btn btn-secondary mb-3" onClick={() => navigate("/roles")}>
        Back
      </button>

      <h2 className="h5 mb-3">Add to {roleName}</h2>
      <ul className="list-group mb-4">
        {nonMembers.length === 0 ? (
          <li className="list-group-item text-muted text-center">
            All users are already members
          </li>
        ) : (
          nonMembers.map((user) => (
            <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
              <strong>{user.userName}</strong>
              <input
                type="checkbox"
                onChange={() => handleAddIdsChange(user.id)}
                checked={addIds.includes(user.id)}
              />
            </li>
          ))
        )}
      </ul>

      <h2 className="h5 mb-3">Remove from {roleName}</h2>
      <ul className="list-group mb-4">
        {members.length === 0 ? (
          <li className="list-group-item text-muted text-center">
            No users are members
          </li>
        ) : (
          members.map((user) => (
            <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
              <strong>{user.userName}</strong>
              <input
                type="checkbox"
                onChange={() => handleDeleteIdsChange(user.id)}
                checked={deleteIds.includes(user.id)}
              />
            </li>
          ))
        )}
      </ul>

      <div>
        <button className="btn btn-success mt-3" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditRole;