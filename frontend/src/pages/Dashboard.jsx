import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { taskAPI } from '../services/api'
import TaskItem from '../components/TaskItem'

const Dashboard = () => {
  const [tasks, setTasks] = useState([])
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('all')
  const [successMessage, setSuccessMessage] = useState('')
  const navigate = useNavigate()

  let user = {}
  try {
    const userStr = localStorage.getItem('user')
    if (userStr && userStr !== 'undefined' && userStr !== 'null') {
      user = JSON.parse(userStr)
    }
  } catch (e) {
    localStorage.removeItem('user')
  }

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true)
        setError('')
        const data = await taskAPI.getTasks()
        const validTasks = (data.tasks || []).filter(task => task && task._id)
        setTasks(validTasks)
      } catch (err) {
        const errorMessage =
          err.response?.data?.message || 'Failed to fetch tasks. Please try again.'
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }

    fetchTasks()
  }, [])

  const handleAddTask = async (e) => {
    e.preventDefault()

    if (!newTaskTitle.trim()) {
      setError('Task title cannot be empty')
      return
    }

    try {
      setError('')
      const response = await taskAPI.createTask({
        title: newTaskTitle.trim(),
      })
      
      // Extract task properly from response
      const newTask = response.task || response
      if (newTask && newTask._id) {
        setTasks((prev) => [newTask, ...prev])
        setNewTaskTitle('')
        setSuccessMessage('Task added successfully!')
        setTimeout(() => setSuccessMessage(''), 3000)
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || 'Failed to add task. Please try again.'
      setError(errorMessage)
    }
  }

  const handleToggleComplete = async (taskId) => {
    const task = tasks.find((t) => t._id === taskId)
    if (!task) return

    try {
      setError('')
      const response = await taskAPI.updateTask(taskId, {
        completed: !task.completed,
      })
      const updatedTask = response.task || response
      if (updatedTask && updatedTask._id) {
        setTasks((prev) =>
          prev.map((t) => (t._id === taskId ? updatedTask : t))
        )
        setSuccessMessage(
          updatedTask.completed ? 'Task marked as complete!' : 'Task marked as pending!'
        )
        setTimeout(() => setSuccessMessage(''), 3000)
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || 'Failed to update task. Please try again.'
      setError(errorMessage)
    }
  }

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return
    }

    try {
      setError('')
      await taskAPI.deleteTask(taskId)
      setTasks((prev) => prev.filter((t) => t._id !== taskId))
      setSuccessMessage('Task deleted successfully!')
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || 'Failed to delete task. Please try again.'
      setError(errorMessage)
    }
  }

  const handleEditTask = async (taskId, updatedData) => {
    try {
      setError('')
      const response = await taskAPI.updateTask(taskId, updatedData)
      const updatedTask = response.task || response
      if (updatedTask && updatedTask._id) {
        setTasks((prev) =>
          prev.map((t) => (t._id === taskId ? updatedTask : t))
        )
        setSuccessMessage('Task updated successfully!')
        setTimeout(() => setSuccessMessage(''), 3000)
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || 'Failed to update task. Please try again.'
      setError(errorMessage)
      throw err
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  const getFilteredTasks = () => {
    const validTasks = tasks.filter(t => t && t._id)
    if (filter === 'completed') {
      return validTasks.filter((t) => t.completed)
    }
    // Both 'all' and 'pending' show only pending tasks
    return validTasks.filter((t) => !t.completed)
  }

  const filteredTasks = getFilteredTasks()
  const validTasks = tasks.filter(t => t && t._id)
  const completedCount = validTasks.filter((t) => t.completed).length

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <div className="border-4 border-gray-300 border-t-purple-600 rounded-full w-12 h-12 animate-loader mb-4"></div>
        <p className="text-gray-600 font-semibold">Loading your tasks...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-2xl p-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8 pb-6 border-b-2 border-gray-100">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">My Tasks</h1>
            <p className="text-gray-600">
              Welcome back, <span className="font-semibold text-purple-600">{user.name || 'User'}</span>!
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-purple-50 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-purple-600">{validTasks.length}</div>
            <div className="text-sm text-gray-600 font-semibold mt-2">Total Tasks</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-green-600">{completedCount}</div>
            <div className="text-sm text-gray-600 font-semibold mt-2">Completed</div>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-yellow-600">{validTasks.length - completedCount}</div>
            <div className="text-sm text-gray-600 font-semibold mt-2">Pending</div>
          </div>
        </div>

        {/* Messages */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
            {error}
          </div>
        )}
        {successMessage && (
          <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded">
            {successMessage}
          </div>
        )}

        {/* Add Task Form */}
        <form onSubmit={handleAddTask} className="flex gap-3 mb-8">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600 transition"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
          >
            Add Task
          </button>
        </form>

        {/* Filter Buttons */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`flex-1 py-2 font-semibold rounded-lg transition ${
              filter === 'all'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All ({validTasks.length - completedCount})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`flex-1 py-2 font-semibold rounded-lg transition ${
              filter === 'pending'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Pending ({validTasks.length - completedCount})
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`flex-1 py-2 font-semibold rounded-lg transition ${
              filter === 'completed'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Completed ({completedCount})
          </button>
        </div>

        {/* Tasks List */}
        <div>
          {filteredTasks.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">
                {filter === 'all' && 'No tasks yet. Create one to get started!'}
                {filter === 'completed' && 'No completed tasks yet.'}
                {filter === 'pending' && 'All tasks are completed! Great job!'}
              </p>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <TaskItem
                key={task._id}
                task={task}
                onToggleComplete={handleToggleComplete}
                onDelete={handleDeleteTask}
                onEdit={handleEditTask}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
