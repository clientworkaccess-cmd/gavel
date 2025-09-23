import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { Edit, Trash2 } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import { authenticatedFetch } from '../../utils/api';
import 'react-toastify/dist/ReactToastify.css';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

const PAGE_SIZE = 15;

const Admins = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newAdmin, setNewAdmin] = useState({ name: '', email: '', password: '' });
  const [editAdmin, setEditAdmin] = useState({ id: '', name: '', email: '', password: '' });
  const [deleteId, setDeleteId] = useState("");
  const [page, setPage] = useState(1);

  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const res = await authenticatedFetch("/api/admins");
      if (res.ok) {
        const data = await res.json();
        setAdmins(data);
      } else {
        setAdmins([]);
      }
    } catch {
      setAdmins([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const totalPages = Math.ceil(admins.length / PAGE_SIZE);
  const paginatedAdmins = admins.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleAdd = async (e) => {
    e.preventDefault();
    const { name, email, password } = newAdmin;
    if (!name || !email || !password) {
      toast.error("All fields are required");
      return;
    }
    try {
      const res = await authenticatedFetch("/api/admins", {
        method: "POST",
        body: JSON.stringify({ name, email, password })
      });
      if (res.ok) {
        toast.success("Admin added");
        setShowAddModal(false);
        setNewAdmin({ name: '', email: '', password: '' });
        fetchAdmins();
      } else {
        const data = await res.json();
        toast.error(data.message || "Failed to add admin");
      }
    } catch {
      toast.error("Network error");
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const { name, email, password } = editAdmin;
    if (!name || !email) {
      toast.error("Name and email are required");
      return;
    }
    try {
      const res = await authenticatedFetch(`/api/admins/${editAdmin.id}`, {
        method: "PUT",
        body: JSON.stringify({ name, email, password })
      });
      if (res.ok) {
        toast.success("Admin updated");
        setShowEditModal(false);
        setEditAdmin({ id: '', name: '', email: '', password: '' });
        fetchAdmins();
      } else {
        const data = await res.json();
        toast.error(data.message || "Failed to update admin");
      }
    } catch {
      toast.error("Network error");
    }
  };

  const handleDelete = async () => {
    try {
      const res = await authenticatedFetch(`/api/admins/${deleteId}`, {
        method: "DELETE"
      });
      if (res.ok) {
        toast.success('Admin deleted successfully!');
        setShowDeleteModal(false);
        setDeleteId("");
        fetchAdmins();
      } else {
        const data = await res.json();
        toast.error(data.message || "Failed to delete admin");
      }
    } catch {
      toast.error("Network error");
    }
  };

  const handleEditClick = (admin) => {
    setEditAdmin({ id: admin.id, name: admin.name, email: admin.email, password: '' });
    setShowEditModal(true);
  };

  const Pagination = () => (
    <div className="flex justify-center items-center gap-2 mt-6">
      <button
        className="px-3 py-1 rounded border bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 cursor-pointer"
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
      >
        Prev
      </button>
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          className={`px-3 py-1 rounded border cursor-pointer ${page === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          onClick={() => setPage(i + 1)}
        >
          {i + 1}
        </button>
      ))}
      <button
        className="px-3 py-1 rounded border bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 cursor-pointer"
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  );

  return (
    <div className='flex'>
      <Sidebar />
      <div className="flex-1 p-4 bg-[#f8f9fa] min-h-screen">
        <div className="bg-white p-6 rounded-2xl shadow-lg w-full">
          <ToastContainer position="top-right" autoClose={3000} />
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-blue-700">Admins</h2>
            <Button
              startIcon={<AddIcon />}
              sx={{
                background: 'linear-gradient(90deg, #2563eb 0%, #60a5fa 100%)',
                color: '#fff',
                boxShadow: 2,
                px: 3,
                py: 1.5,
                borderRadius: 2,
                fontWeight: 600,
                fontSize: '1rem',
                textTransform: 'none',
                '&:hover': {
                  background: 'linear-gradient(90deg, #1e40af 0%, #3b82f6 100%)',
                },
                cursor: 'pointer',
              }}
              onClick={() => setShowAddModal(true)}
            >
              Add Admin
            </Button>
          </div>
          <div className="overflow-x-auto rounded-xl border border-gray-100">
            <table className="min-w-full text-sm text-left rounded-xl overflow-hidden shadow-sm">
              <thead className="bg-gradient-to-r from-blue-200 via-blue-100 to-blue-50 text-blue-800">
                <tr>
                  <th className="py-3 px-5">Admin ID</th>
                  <th className="py-3 px-5">Name</th>
                  <th className="py-3 px-5">Email</th>
                  <th className="py-3 px-5">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="4" className="py-6 text-center">Loading...</td></tr>
                ) : paginatedAdmins.length === 0 ? (
                  <tr><td colSpan="4" className="py-6 text-center text-gray-400">No admins found.</td></tr>
                ) : (
                  paginatedAdmins.map((admin, idx) => (
                    <tr key={admin.id} className={
                      (idx % 2 === 0 ? "bg-white" : "bg-blue-50") +
                      " hover:bg-blue-100 transition rounded-xl group"
                    }>
                      <td className="py-3 px-5 font-mono text-xs rounded-l-xl">{admin.id}</td>
                      <td className="py-3 px-5">{admin.name}</td>
                      <td className="py-3 px-5">{admin.email}</td>
                      <td className="py-3 px-5 flex gap-2">
                        <button
                          className="px-3 py-1 text-sm text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition cursor-pointer"
                          onClick={() => handleEditClick(admin)}
                        >
                          <Edit className="w-4 h-4 inline" /> Edit
                        </button>
                        <button
                          className="px-3 py-1 text-sm text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition cursor-pointer"
                          onClick={() => { setDeleteId(admin.id); setShowDeleteModal(true); }}
                        >
                          <Trash2 className="w-4 h-4 inline" /> Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {totalPages > 1 && <Pagination />}

          {/* Add Modal */}
          {showAddModal && (
            <Dialog open={showAddModal} onClose={() => setShowAddModal(false)} maxWidth="sm" fullWidth>
              <DialogTitle className='text-[#316ADD]'>Add New Admin</DialogTitle>
              <DialogContent dividers>
                <form className="flex flex-col gap-4" onSubmit={handleAdd}>
                  <TextField label="Name" variant="outlined" fullWidth required value={newAdmin.name} onChange={e => setNewAdmin({ ...newAdmin, name: e.target.value })} />
                  <TextField label="Email" variant="outlined" fullWidth required value={newAdmin.email} onChange={e => setNewAdmin({ ...newAdmin, email: e.target.value })} />
                  <TextField label="Password" variant="outlined" fullWidth required value={newAdmin.password} onChange={e => setNewAdmin({ ...newAdmin, password: e.target.value })} />
                </form>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setShowAddModal(false)} color="secondary" variant="outlined" sx={{ borderColor: '#2563eb', color: '#1e40af', '&:hover': { borderColor: '#1e40af', background: '#eff6ff' } }}>Cancel</Button>
                <Button onClick={handleAdd} color="primary" variant="contained" type="submit">Add Admin</Button>
              </DialogActions>
            </Dialog>
          )}

          {/* Edit Modal */}
          {showEditModal && (
            <Dialog open={showEditModal} onClose={() => setShowEditModal(false)} maxWidth="sm" fullWidth>
              <DialogTitle>Edit Admin</DialogTitle>
              <DialogContent dividers>
                <form className="flex flex-col gap-4" onSubmit={handleEdit}>
                  <TextField label="Name" variant="outlined" fullWidth required value={editAdmin.name} onChange={e => setEditAdmin({ ...editAdmin, name: e.target.value })} />
                  <TextField label="Email" variant="outlined" fullWidth required value={editAdmin.email} onChange={e => setEditAdmin({ ...editAdmin, email: e.target.value })} />
                  <TextField label="Password (leave blank to keep)" variant="outlined" fullWidth value={editAdmin.password} onChange={e => setEditAdmin({ ...editAdmin, password: e.target.value })} />
                </form>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setShowEditModal(false)} color="secondary" variant="outlined" sx={{ borderColor: '#2563eb', color: '#1e40af', '&:hover': { borderColor: '#1e40af', background: '#eff6ff' } }}>Cancel</Button>
                <Button onClick={handleEdit} color="primary" variant="contained" type="submit">Update</Button>
              </DialogActions>
            </Dialog>
          )}

          {/* Delete Confirmation Modal */}
          {showDeleteModal && (
            <Dialog open={showDeleteModal} onClose={() => setShowDeleteModal(false)} maxWidth="sm" fullWidth>
              <DialogTitle>Delete Admin</DialogTitle>
              <DialogContent dividers>
                <p className="mb-6">Are you sure you want to delete this admin?</p>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setShowDeleteModal(false)} color="secondary" variant="outlined" sx={{ borderColor: '#2563eb', color: '#1e40af', '&:hover': { borderColor: '#1e40af', background: '#eff6ff' } }}>Cancel</Button>
                <Button onClick={handleDelete} color="primary" variant="contained" type="submit">Delete</Button>
              </DialogActions>
            </Dialog>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admins;

