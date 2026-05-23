"use client";

import { IconAlertTriangle, IconX } from "@tabler/icons-react";

interface Props {
  title: string;
  description: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onClose: () => void;
  isPending?: boolean;
}

export default function ConfirmModal({
  title,
  description,
  confirmLabel = "Delete",
  onConfirm,
  onClose,
  isPending,
}: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-surface border border-border rounded-xl w-full max-w-sm shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-danger/20 bg-danger/5">
          <div className="flex items-center gap-2.5">
            <IconAlertTriangle size={18} className="text-danger" />
            <h2 className="text-base font-medium text-danger">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-content-muted hover:text-content-text transition-colors"
          >
            <IconX size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-5">
          <p className="text-sm text-content-text leading-relaxed">
            {description}
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 px-5 py-4 border-t border-border">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-content-muted border border-border rounded-lg hover:bg-canvas transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isPending}
            className="px-4 py-2 text-sm font-medium bg-danger text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isPending ? "Deleting..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
