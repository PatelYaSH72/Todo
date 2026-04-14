import React, { useState } from 'react'

const TaskItem = ({ task, onToggleComplete, onDelete, onEdit }) => {
  // Guard against undefined task
  if (!task || !task._id) {
    return null
  }

  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(task.title || '')
  const [isSaving, setIsSaving] = useState(false)

  const handleSaveEdit = async () => {
    if (!editText.trim()) {
      alert('Task title cannot be empty')
      return
    }

    setIsSaving(true)
    try {
      await onEdit(task._id, { title: editText })
      setIsEditing(false)
    } catch (error) {
      alert('Failed to update task')
      setEditText(task.title)
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    setEditText(task.title || '')
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <div className="flex gap-2 p-4 bg-white rounded-lg shadow-sm mb-3">
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          className="flex-1 px-3 py-2 border-2 border-purple-600 rounded-lg focus:outline-none"
          autoFocus
        />
        <button
          onClick={handleSaveEdit}
          disabled={isSaving}
          className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:opacity-70"
        >
          {isSaving ? 'Saving...' : 'Save'}
        </button>
        <button
          onClick={handleCancel}
          className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    )
  }

  return (
    <div
      className={`flex justify-between items-center p-4 bg-white rounded-lg shadow-sm mb-3 transition ${
        task.completed ? 'opacity-60' : ''
      }`}
    >
      <div className="flex items-center gap-3 flex-1">
        <input
          type="checkbox"
          checked={task.completed || false}
          onChange={() => onToggleComplete(task._id)}
          className="w-5 h-5 cursor-pointer accent-purple-600"
        />
        <span
          className={`text-gray-700 break-words ${
            task.completed ? 'line-through text-gray-400' : ''
          }`}
        >
          {task.title || 'Untitled Task'}
        </span>
      </div>
      <div className="flex gap-2 flex-shrink-0">
        <button
          onClick={() => setIsEditing(true)}
          className="px-3 py-2 bg-purple-600 text-white text-sm font-semibold rounded-lg hover:bg-purple-700 transition"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="px-3 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default TaskItem
