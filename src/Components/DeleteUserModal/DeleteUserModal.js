const DeleteUserModal = ({
  showModal,
  handleCloseModal,
  handleDeleteUser,
  userId,
}) => {
  if (!showModal) return null // Pokud showModal je false, modal se nezobrazí

  return (
    <div className="modal" style={{ display: "block" }}>
      {" "}
      {/* Zajistíte, že modal je zobrazen */}
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirm Deletion</h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleCloseModal}
            ></button>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to delete this user?</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCloseModal}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                handleDeleteUser(userId) // Volání pro smazání uživatele
                handleCloseModal() // Zavření modalu
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteUserModal
