import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { authenticatedFetch } from '../../utils/api';

const initialProfile = { name: '', email: '' };

const Profile = () => {
  const [profile, setProfile] = useState(initialProfile);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        let res = await authenticatedFetch(`/api/admin/profile`, { method: 'GET' });
        if (res.status === 404) {
          // Fallback to existing protected admin endpoint
          res = await authenticatedFetch(`/api/protected/admin`, { method: 'GET' });
          if (res.ok) {
            const data = await res.json();
            setProfile({ name: data.name || 'Admin', email: data.email || '' });
            return;
          }
        }
        if (res.ok) {
          const data = await res.json();
          setProfile({ name: data.name || '', email: data.email || '' });
        }
      } catch (e) {
        console.error('Failed to load admin profile', e);
      }
    };
    load();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      let res = await authenticatedFetch(`/api/admin/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: profile.name, email: profile.email })
      });
      if (res.status === 404) {
        alert('Admin profile route not yet deployed on server. Please update backend.');
        return;
      }
      const data = await res.json();
      if (res.ok) {
        alert('Profile updated successfully');
        setProfile({ name: data.admin?.name || profile.name, email: data.admin?.email || profile.email });
      } else {
        alert(data.message || 'Failed to update profile');
      }
    } catch (err) {
      alert('Failed to update profile');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-white">
      <Sidebar />
      <main className="flex-1 flex flex-col items-center justify-center p-0 md:p-12">
        <div className="w-full max-w-3xl mx-auto bg-white shadow-2xl rounded-3xl flex flex-col md:flex-row overflow-hidden border-l-8 border-indigo-500">
          {/* Left: Avatar and Title */}
          <div className="flex flex-col items-center justify-center bg-gradient-to-b from-indigo-100 to-blue-100 p-8 md:w-1/3 w-full">
            <Avatar src={profile.avatar} sx={{ width: 120, height: 120, mb: 3, boxShadow: 3, border: '4px solid #6366f1' }} />
            <span className="text-2xl md:text-3xl font-extrabold text-indigo-700 mb-2">Admin Profile</span>
            <span className="text-sm text-indigo-400 font-medium">Manage your account</span>
          </div>
          {/* Right: Editable Form */}
          <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
            <form className="flex flex-col gap-8" onSubmit={handleSave}>
              <TextField
                label="Name"
                name="name"
                value={profile.name}
                onChange={handleChange}
                fullWidth
                required
                InputLabelProps={{ style: { color: '#6366f1', fontWeight: 600 } }}
              />
              <TextField
                label="Email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                fullWidth
                required
                type="email"
                InputLabelProps={{ style: { color: '#6366f1', fontWeight: 600 } }}
              />
       
              <Button
                type="submit"
                sx={{
                  background: 'linear-gradient(90deg, #6366f1 0%, #60a5fa 100%)',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  boxShadow: 3,
                  borderRadius: 2,
                  textTransform: 'none',
                  py: 1.5,
                  mt: 2,
                  '&:hover': {
                    background: 'linear-gradient(90deg, #4f46e5 0%, #3b82f6 100%)',
                  },
                }}
                fullWidth
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile; 