import { useState, useEffect, useRef } from "react";

import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";

const UserChat = () => {
  const { user } = useAuth(); // Get current user
  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);
  const axios = useAxios();

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize or fetch chat
  useEffect(() => {
    const initChat = async () => {
      if (!user?.email) return;

      try {
        // Try to get existing chat
        const chatRes = await axios.get(`/chats/user/${user.email}`);
        setChat(chatRes.data);
        await fetchMessages(chatRes.data._id);
      } catch (error) {
        if (error.response?.status === 404) {
          // Create new chat if doesn't exist
          const newChatRes = await axios.post(`/chats/create`, {
            userEmail: user.email,
            userName: user.displayName || user.email,
          });
          setChat(newChatRes.data);
        }
      } finally {
        setLoading(false);
      }
    };

    initChat();
  }, [user]);

  // Fetch messages
  const fetchMessages = async (chatId) => {
    try {
      const res = await axios.get(`/messages/${chatId}`);
      setMessages(res.data);

      // Mark messages as read
      await axios.patch(`/messages/mark-read/${chatId}`, {
        role: "user",
      });
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // Poll for new messages every 3 seconds
  useEffect(() => {
    if (!chat?._id) return;

    const interval = setInterval(() => {
      fetchMessages(chat._id);
    }, 3000);

    return () => clearInterval(interval);
  }, [chat]);

  // Send message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !chat?._id) return;

    setSending(true);
    try {
      const res = await axios.post(`/messages/send`, {
        chatId: chat._id,
        senderEmail: user.email,
        senderName: user.displayName || user.email,
        senderRole: "user",
        message: newMessage.trim(),
      });

      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message");
    } finally {
      setSending(false);
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
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white border-4 border-black p-6 mb-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h1 className="text-3xl font-black uppercase">Chat with Admin</h1>
        <p className="text-sm mt-2 font-bold">
          Get help with your parcels and deliveries
        </p>
      </div>

      {/* Chat Container */}
      <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        {/* Messages Area */}
        <div className="h-[500px] overflow-y-auto p-6 space-y-4 bg-yellow-50">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <p className="text-xl font-black uppercase mb-2">
                  No messages yet
                </p>
                <p className="text-sm font-bold">
                  Start a conversation with the admin team!
                </p>
              </div>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg._id}
                className={`flex ${
                  msg.senderRole === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] p-4 border-2 border-black ${
                    msg.senderRole === "user"
                      ? "bg-primary text-primary-content shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                      : "bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  }`}
                >
                  <p className="font-bold text-xs mb-1 uppercase">
                    {msg.senderRole === "admin" ? "Admin" : "You"}
                  </p>
                  <p className="font-medium">{msg.message}</p>
                  <p className="text-xs mt-2 opacity-70">
                    {new Date(msg.sentAt).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
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
      </div>
    </div>
  );
};

export default UserChat;
