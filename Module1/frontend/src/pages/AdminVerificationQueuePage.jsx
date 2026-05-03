import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const STATUS_TABS = ['all', 'pending', 'verified', 'rejected'];

const statusStyle = {
  pending:  'bg-amber-500/10 text-amber-500',
  verified: 'bg-emerald-500/10 text-emerald-500',
  rejected: 'bg-red-500/10 text-red-500',
};

export default function AdminVerificationQueuePage() {
  const { user } = useAuth();
  const { addToast } = useToast();

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('pending');

  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (user?.role !== 'admin') return;
    fetchRequests();
  }, [filter, user]);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const url = filter === 'all'
        ? '/verification/admin/all'
        : `/verification/admin/all?status=${filter}`;
      const res = await api.get(url);
      setRequests(res.data.requests);
    } catch {
      addToast('Failed to load verification requests', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (requestId) => {
    setSubmitting(true);
    try {
      await api.patch(`/verification/review/${requestId}`, { status: 'verified' });
      addToast('Verification approved ✅', 'success');
      fetchRequests();
    } catch {
      addToast('Failed to approve request', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const openRejectModal = (req) => {
    setSelectedRequest(req);
    setRejectionReason('');
    setShowRejectModal(true);
  };

  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      addToast('Please enter a rejection reason', 'error');
      return;
    }
    setSubmitting(true);
    try {
      await api.patch(`/verification/review/${selectedRequest.id}`, {
        status: 'rejected',
        rejection_reason: rejectionReason
      });
      addToast('Verification rejected', 'info');
      setShowRejectModal(false);
      fetchRequests();
    } catch {
      addToast('Failed to reject request', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  if (user && user.role !== 'admin') return <Navigate to="/dashboard" replace />;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <p className="section-label mb-1">Platform Control • Admin</p>
          <h2 className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white uppercase leading-none">
            Verification Queue
          </h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">
            Review and approve identity verification requests
          </p>
        </div>
        <div className="flex bg-white dark:bg-white/5 p-1 rounded-xl border border-slate-200 dark:border-white/5">
          {STATUS_TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${
                filter === tab
                  ? 'bg-slate-900 text-white shadow-lg'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-40">
            <div className="w-10 h-10 border-4 border-accent/20 border-t-accent rounded-full animate-spin" />
          </div>
        ) : requests.length === 0 ? (
          <div className="py-24 text-center">
            <span className="material-symbols-outlined text-5xl text-slate-200 mb-4">verified_user</span>
            <p className="text-sm font-bold text-slate-400">No requests found for "{filter}"</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 dark:bg-white/[0.02] border-b border-slate-100 dark:border-white/5">
                <tr>
                  {['User', 'Type', 'Document', 'Status', 'Requested', 'Actions'].map(h => (
                    <th key={h} className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {requests.map(req => (
                  <tr key={req.id} className="hover:bg-slate-50/50 dark:hover:bg-white/[0.01] transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-sm font-black text-slate-900 dark:text-white">
                        {req.first_name} {req.last_name}
                      </p>
                      <p className="text-[10px] text-slate-400">{req.email}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                        {req.verification_type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-xs font-bold text-slate-600 dark:text-slate-400">
                        {req.document_type || '—'}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${statusStyle[req.verification_status] || 'bg-slate-100 text-slate-500'}`}>
                        {req.verification_status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-[10px] font-bold text-slate-400">
                        {new Date(req.requested_at).toLocaleDateString()}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      {req.verification_status === 'pending' ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleApprove(req.id)}
                            disabled={submitting}
                            className="px-3 py-1.5 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white text-[10px] font-black uppercase tracking-widest rounded-lg transition-all disabled:opacity-50"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => openRejectModal(req)}
                            disabled={submitting}
                            className="px-3 py-1.5 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white text-[10px] font-black uppercase tracking-widest rounded-lg transition-all disabled:opacity-50"
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-[10px] font-bold text-slate-400 uppercase">
                          {req.verification_status === 'verified' ? 'Approved' : 'Rejected'}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Reject Reason Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="card w-full max-w-md p-8 space-y-6 animate-fade-in">
            <div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                Reject Verification
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Request from {selectedRequest?.first_name} {selectedRequest?.last_name}
              </p>
            </div>
            <div>
              <label className="section-label mb-2 block">Rejection Reason</label>
              <textarea
                value={rejectionReason}
                onChange={e => setRejectionReason(e.target.value)}
                rows={4}
                placeholder="Explain why this request is being rejected..."
                className="input-field w-full resize-none"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowRejectModal(false)}
                className="flex-1 btn-secondary py-3"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                disabled={submitting}
                className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white font-black text-[10px] uppercase tracking-widest rounded-xl transition-all disabled:opacity-50"
              >
                {submitting ? 'Rejecting...' : 'Confirm Reject'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
