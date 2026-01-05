import { useState, useEffect, useRef } from "react";

import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";

const AdminChat = () => {
  const { user } = useAuth(); // Get current admin user
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [stats, setStats] = useState(null);
  const messagesEndRef = useRef(null);
  const axios = useAxios();

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch all chats
  const fetchChats = async () => {
    try {
      const [chatsRes, statsRes] = await Promise.all([
        axios.get(`/chats/admin`),
        axios.get(`/chats/stats`),
      ]);
      setChats(chatsRes.data);
      setStats(statsRes.data);
    } catch (error) {
      console.error("Error fetching chats:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChats();

    // Poll for new chats every 5 seconds
    const interval = setInterval(fetchChats, 5000);
    return () => clearInterval(interval);
  }, []);

  // Fetch messages for selected chat
  const fetchMessages = async (chatId) => {
    try {
      const res = await axios.get(`/messages/${chatId}`);
      setMessages(res.data);

      // Mark messages as read
      await axios.patch(`/messages/mark-read/${chatId}`, {
        role: "admin",
      });

      // Refresh chats to update unread count
      fetchChats();
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // Select a chat
  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
    fetchMessages(chat._id);
  };

  // Poll for new messages in selected chat
  useEffect(() => {
    if (!selectedChat?._id) return;

    const interval = setInterval(() => {
      fetchMessages(selectedChat._id);
    }, 3000);

    return () => clearInterval(interval);
  }, [selectedChat]);

  // Send message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedChat?._id) return;

    setSending(true);
    try {
      const res = await axios.post(`/messages/send`, {
        chatId: selectedChat._id,
        senderEmail: user.email,
        senderName: "Admin Support",
        senderRole: "admin",
        message: newMessage.trim(),
      });

      setMessages([...messages, res.data]);
      setNewMessage("");
      fetchChats(); // Refresh to update last message time
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message");
    } finally {
      setSending(false);
    }
  };

  // Close chat
  const handleCloseChat = async (chatId) => {
    if (!confirm("Are you sure you want to close this chat?")) return;

    try {
      await axios.patch(`/chats/${chatId}/close`);
      fetchChats();
      if (selectedChat?._id === chatId) {
        setSelectedChat(null);
        setMessages([]);
      }
    } catch (error) {
      console.error("Error closing chat:", error);
      alert("Failed to close chat");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header with Stats */}
      <div className="bg-white border-4 border-black p-6 mb-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h1 className="text-3xl font-black uppercase mb-4">Chat Management</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-yellow-300 border-2 border-black">
            <p className="text-sm font-bold uppercase">Total Chats</p>
            <p className="text-3xl font-black">{stats?.totalChats || 0}</p>
          </div>
          <div className="p-4 bg-green-300 border-2 border-black">
            <p className="text-sm font-bold uppercase">Active Chats</p>
            <p className="text-3xl font-black">{stats?.activeChats || 0}</p>
          </div>
          <div className="p-4 bg-red-300 border-2 border-black">
            <p className="text-sm font-bold uppercase">Unread Messages</p>
            <p className="text-3xl font-black">
              {stats?.totalUnreadMessages || 0}
            </p>
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat List */}
        <div className="lg:col-span-1">
          <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="p-4 border-b-4 border-black bg-primary">
              <h2 className="font-black uppercase text-primary-content">
                User Chats ({chats.length})
              </h2>
            </div>
            <div className="max-h-[600px] overflow-y-auto">
              {chats.length === 0 ? (
                <p className="p-4 text-center font-bold">No chats yet</p>
              ) : (
                chats.map((chat) => (
                  <button
                    key={chat._id}
                    onClick={() => handleSelectChat(chat)}
                    className={`w-full p-4 border-b-2 border-black text-left hover:bg-yellow-100 transition-colors ${
                      selectedChat?._id === chat._id ? "bg-yellow-200" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-black uppercase">{chat.userName}</p>
                        <p className="text-xs font-bold text-gray-600 truncate">
                          {chat.userEmail}
                        </p>
                        <p className="text-xs mt-1">
                          {new Date(chat.lastMessageAt).toLocaleString()}
                        </p>
                      </div>
                      {chat.unreadByAdmin > 0 && (
                        <span className="badge badge-error border-2 border-black font-black">
                          {chat.unreadByAdmin}
                        </span>
                      )}
                    </div>
                    <div className="mt-2">
                      <span
                        className={`badge border-2 border-black font-black ${
                          chat.status === "active"
                            ? "badge-success"
                            : "badge-neutral"
                        }`}
                      >
                        {chat.status}
                      </span>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="lg:col-span-2">
          {!selectedChat ? (
            <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] h-[600px] flex items-center justify-center">
              <div className="text-center">
                <p className="text-2xl font-black uppercase mb-2">
                  Select a Chat
                </p>
                <p className="font-bold">
                  Choose a user from the list to start chatting
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              {/* Chat Header */}
              <div className="p-4 border-b-4 border-black bg-primary flex items-center justify-between">
                <div>
                  <h2 className="font-black uppercase text-primary-content">
                    {selectedChat.userName}
                  </h2>
                  <p className="text-xs text-primary-content">
                    {selectedChat.userEmail}
                  </p>
                </div>
                {selectedChat.status === "active" && (
                  <button
                    onClick={() => handleCloseChat(selectedChat._id)}
                    className="btn btn-sm btn-error border-2 border-black font-black uppercase"
                  >
                    Close Chat
                  </button>
                )}
              </div>

              {/* Messages */}
              <div className="h-[450px] overflow-y-auto p-6 space-y-4 bg-yellow-50">
                {messages.map((msg) => (
                  <div
                    key={msg._id}
                    className={`flex ${
                      msg.senderRole === "admin"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[70%] p-4 border-2 border-black ${
                        msg.senderRole === "admin"
                          ? "bg-primary text-primary-content shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                          : "bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                      }`}
                    >
                      <p className="font-bold text-xs mb-1 uppercase">
                        {msg.senderRole === "admin"
                          ? "You (Admin)"
                          : msg.senderName}
                      </p>
                      <p className="font-medium">{msg.message}</p>
                      <p className="text-xs mt-2 opacity-70">
                        {new Date(msg.sentAt).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              {selectedChat.status === "active" && (
                <form
                  onSubmit={handleSendMessage}
                  className="border-t-4 border-black p-4 bg-white"
                >
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 input input-bordered border-2 border-black font-medium focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                      disabled={sending}
                    />
                    <button
                      type="submit"
                      disabled={!newMessage.trim() || sending}
                      className="btn btn-primary border-2 border-black font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] disabled:opacity-50"
                    >
                      {sending ? (
                        <span className="loading loading-spinner loading-sm"></span>
                      ) : (
                        "Send"
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminChat;
