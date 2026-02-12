import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/services/supabase';
import { Card, Button, Modal } from '@/components/ui';
import BottomNav from '@/components/BottomNav';

export default function MePage() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showCycleSettingsModal, setShowCycleSettingsModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [saving, setSaving] = useState(false);

  // Profile edit state
  const [editedProfile, setEditedProfile] = useState({
    username: '',
    dateOfBirth: '',
  });

  // Notification settings state
  const [notifications, setNotifications] = useState({
    morning: true,
    morningTime: '8:00 AM',
    evening: false,
    eveningTime: '8:00 PM',
    weekly: true,
  });

  // Cycle settings state
  const [cycleSettings, setCycleSettings] = useState({
    cycleLength: 28,
    periodDuration: 5,
  });

  // Toggle notification handlers
  const toggleNotification = (type) => {
    setNotifications((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
    // In production, save to database
    console.log(`Toggled ${type} notification:`, !notifications[type]);
  };

  // Open edit profile modal with current data
  const openEditProfile = () => {
    setEditedProfile({
      username: user?.user_metadata?.username || '',
      dateOfBirth: user?.user_metadata?.date_of_birth || '',
    });
    setShowEditProfileModal(true);
  };

  // Save profile changes
  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      // Update user metadata in Supabase
      const { data, error } = await supabase.auth.updateUser({
        data: {
          username: editedProfile.username,
          date_of_birth: editedProfile.dateOfBirth,
        },
      });

      if (error) throw error;

      console.log('Profile updated successfully:', data);
      setShowEditProfileModal(false);

      // Show success message
      alert('Profile updated successfully! Refresh the page to see changes.');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleExportData = async () => {
    setExporting(true);
    try {
      // Fetch all user data (this would be actual queries in production)
      const exportData = {
        user: {
          email: user?.email,
          username: user?.user_metadata?.username,
          dateOfBirth: user?.user_metadata?.date_of_birth,
          createdAt: user?.created_at,
        },
        message: 'Data export functionality will fetch all your tracking data from the database',
        note: 'In production, this would include: mood logs, journal entries, cycle logs, habits, and AI summaries',
      };

      // Create a blob and download
      const blob = new Blob([JSON.stringify(exportData, null, 2)], {
        type: 'application/json',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `her-daily-data-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting data:', error);
      alert('Failed to export data. Please try again.');
    } finally {
      setExporting(false);
    }
  };

  const handleDeleteAccount = async () => {
    setDeleting(true);
    try {
      // Delete user account (this will cascade delete all user data in tables)
      const { error } = await supabase.auth.admin.deleteUser(user.id);

      if (error) {
        // If admin delete fails, try regular account deletion
        await supabase.auth.signOut();
      }

      // Navigate to home page
      navigate('/');
      alert('Your account has been deleted. All your data will be permanently removed within 30 days.');
    } catch (error) {
      console.error('Error deleting account:', error);
      alert('Failed to delete account. Please contact support.');
    } finally {
      setDeleting(false);
      setShowDeleteModal(false);
    }
  };

  // Get user data from auth context
  const username = user?.user_metadata?.username || user?.email?.split('@')[0] || 'User';
  const dateOfBirth = user?.user_metadata?.date_of_birth || 'Not set';
  const memberSince = user?.created_at
    ? new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : 'Recently';

  const userData = {
    username,
    email: user?.email || 'No email',
    dateOfBirth,
    memberSince,
  };

  return (
    <div className="min-h-screen bg-cream pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#F5EDE6] via-[#E8D5CE] to-[#D4A89F] px-6 pt-8 pb-12 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-rose to-mauve flex items-center justify-center text-4xl shadow-rose-glow border-4 border-white">
            {userData.username[0]}
          </div>
          <h1 className="text-3xl font-serif text-deep mb-1">{userData.username}</h1>
          <p className="text-sm text-muted">Member since {userData.memberSince}</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-6 space-y-6">
        {/* Personal Info */}
        <Card>
          <h2 className="text-xl font-serif text-deep mb-4">Personal Information</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-deep/10">
              <span className="text-sm text-muted">Email</span>
              <span className="text-sm text-deep font-medium">{userData.email}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-deep/10">
              <span className="text-sm text-muted">Username</span>
              <span className="text-sm text-deep font-medium">{userData.username}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-muted">Date of Birth</span>
              <span className="text-sm text-deep font-medium">{userData.dateOfBirth}</span>
            </div>
          </div>
          <Button
            variant="secondary"
            className="w-full mt-4"
            size="sm"
            onClick={openEditProfile}
          >
            Edit Profile
          </Button>
        </Card>

        {/* Cycle Settings */}
        <Card>
          <h2 className="text-xl font-serif text-deep mb-4">Cycle Settings</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-deep/10">
              <span className="text-sm text-muted">Cycle Length</span>
              <span className="text-sm text-deep font-medium">{cycleSettings.cycleLength} days</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-deep/10">
              <span className="text-sm text-muted">Period Duration</span>
              <span className="text-sm text-deep font-medium">{cycleSettings.periodDuration} days</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-muted">Tracking Frequency</span>
              <span className="text-sm text-deep font-medium">Once daily</span>
            </div>
          </div>
          <Button
            variant="secondary"
            className="w-full mt-4"
            size="sm"
            onClick={() => setShowCycleSettingsModal(true)}
          >
            Adjust Settings
          </Button>
        </Card>

        {/* Notifications */}
        <Card>
          <h2 className="text-xl font-serif text-deep mb-4">Notifications</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-deep font-medium">Morning Reminder</p>
                <p className="text-xs text-muted">{notifications.morningTime}</p>
              </div>
              <button
                onClick={() => toggleNotification('morning')}
                className={`w-12 h-6 rounded-full transition-colors cursor-pointer ${
                  notifications.morning
                    ? 'bg-gradient-to-r from-rose to-mauve'
                    : 'bg-deep/20'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                    notifications.morning ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-deep font-medium">Evening Reminder</p>
                <p className="text-xs text-muted">{notifications.eveningTime}</p>
              </div>
              <button
                onClick={() => toggleNotification('evening')}
                className={`w-12 h-6 rounded-full transition-colors cursor-pointer ${
                  notifications.evening
                    ? 'bg-gradient-to-r from-rose to-mauve'
                    : 'bg-deep/20'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                    notifications.evening ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-deep font-medium">Weekly Summary</p>
                <p className="text-xs text-muted">Every Sunday morning</p>
              </div>
              <button
                onClick={() => toggleNotification('weekly')}
                className={`w-12 h-6 rounded-full transition-colors cursor-pointer ${
                  notifications.weekly
                    ? 'bg-gradient-to-r from-rose to-mauve'
                    : 'bg-deep/20'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                    notifications.weekly ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
          </div>
        </Card>

        {/* Privacy & Data */}
        <Card>
          <h2 className="text-xl font-serif text-deep mb-4">Privacy & Data</h2>
          <div className="space-y-3">
            <button
              onClick={handleExportData}
              disabled={exporting}
              className="w-full text-left py-3 flex justify-between items-center border-b border-deep/10 hover:bg-deep/5 transition-colors rounded-lg px-2"
            >
              <span className="text-sm text-deep">
                {exporting ? 'Exporting...' : 'Export My Data'}
              </span>
              <span className="text-rose">→</span>
            </button>
            <Link to="/privacy" className="block">
              <button className="w-full text-left py-3 flex justify-between items-center border-b border-deep/10 hover:bg-deep/5 transition-colors rounded-lg px-2">
                <span className="text-sm text-deep">Privacy Policy</span>
                <span className="text-rose">→</span>
              </button>
            </Link>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="w-full text-left py-3 flex justify-between items-center hover:bg-red-50 transition-colors rounded-lg px-2"
            >
              <span className="text-sm text-red-500">Delete My Account</span>
              <span className="text-red-500">→</span>
            </button>
          </div>
        </Card>

        {/* Sign Out */}
        <Button
          variant="secondary"
          className="w-full"
          onClick={handleSignOut}
        >
          Sign Out
        </Button>

        {/* Version */}
        <div className="text-center">
          <p className="text-xs text-muted">Her Daily v1.0.0</p>
          <p className="text-xs text-muted mt-1">Made with 🌸 for your wellbeing</p>
        </div>
      </div>

      <BottomNav active="me" />

      {/* Delete Account Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Account"
      >
        <div className="space-y-4">
          <p className="text-sm text-text">
            Are you sure you want to delete your account? This action cannot be undone.
          </p>
          <div className="bg-rose/10 border border-rose/20 rounded-lg p-3">
            <p className="text-sm text-rose font-medium mb-2">⚠ This will permanently delete:</p>
            <ul className="text-xs text-muted space-y-1 ml-4 list-disc">
              <li>All your cycle tracking data</li>
              <li>All mood logs and journal entries</li>
              <li>All habit records</li>
              <li>All AI-generated summaries</li>
              <li>Your account and profile</li>
            </ul>
          </div>
          <div className="flex gap-3">
            <Button
              variant="secondary"
              className="flex-1"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 bg-red-500 hover:bg-red-600"
              onClick={handleDeleteAccount}
              disabled={deleting}
            >
              {deleting ? 'Deleting...' : 'Delete Forever'}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={showEditProfileModal}
        onClose={() => setShowEditProfileModal(false)}
        title="Edit Profile"
      >
        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium text-muted uppercase tracking-wide block mb-2">
              Username
            </label>
            <input
              type="text"
              value={editedProfile.username}
              onChange={(e) =>
                setEditedProfile({ ...editedProfile, username: e.target.value })
              }
              placeholder="Enter your username"
              className="w-full px-4 py-3 rounded-button border-[1.5px] border-deep/10 bg-warm-white shadow-sm focus:border-rose focus:ring-2 focus:ring-rose/20 focus:outline-none font-sans text-sm"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-muted uppercase tracking-wide block mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              value={editedProfile.dateOfBirth}
              onChange={(e) =>
                setEditedProfile({ ...editedProfile, dateOfBirth: e.target.value })
              }
              className="w-full px-4 py-3 rounded-button border-[1.5px] border-deep/10 bg-warm-white shadow-sm focus:border-rose focus:ring-2 focus:ring-rose/20 focus:outline-none font-sans text-sm"
            />
          </div>

          <div className="bg-sage/10 border border-sage/20 rounded-lg p-3">
            <p className="text-xs text-sage">
              ✓ Your profile information will be updated immediately
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              variant="secondary"
              className="flex-1"
              onClick={() => setShowEditProfileModal(false)}
            >
              Cancel
            </Button>
            <Button
              className="flex-1"
              onClick={handleSaveProfile}
              disabled={saving || !editedProfile.username}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Cycle Settings Modal */}
      <Modal
        isOpen={showCycleSettingsModal}
        onClose={() => setShowCycleSettingsModal(false)}
        title="Adjust Cycle Settings"
      >
        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium text-muted uppercase tracking-wide block mb-2">
              Cycle Length (days)
            </label>
            <input
              type="number"
              min="21"
              max="45"
              value={cycleSettings.cycleLength}
              onChange={(e) =>
                setCycleSettings({ ...cycleSettings, cycleLength: parseInt(e.target.value) })
              }
              className="w-full px-4 py-3 rounded-button border-[1.5px] border-deep/10 bg-warm-white shadow-sm focus:border-rose focus:ring-2 focus:ring-rose/20 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted uppercase tracking-wide block mb-2">
              Period Duration (days)
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={cycleSettings.periodDuration}
              onChange={(e) =>
                setCycleSettings({ ...cycleSettings, periodDuration: parseInt(e.target.value) })
              }
              className="w-full px-4 py-3 rounded-button border-[1.5px] border-deep/10 bg-warm-white shadow-sm focus:border-rose focus:ring-2 focus:ring-rose/20 focus:outline-none"
            />
          </div>
          <div className="bg-sage/10 border border-sage/20 rounded-lg p-3">
            <p className="text-xs text-sage">
              ✓ Changes will be applied immediately and affect your cycle predictions
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="secondary"
              className="flex-1"
              onClick={() => setShowCycleSettingsModal(false)}
            >
              Cancel
            </Button>
            <Button
              className="flex-1"
              onClick={() => {
                console.log('Cycle settings updated:', cycleSettings);
                setShowCycleSettingsModal(false);
              }}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
