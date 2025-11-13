import { useState } from 'react';
import { Search, MoreVertical, Info, Smile, Send } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

export function MessagingPage() {
  const [selectedChat, setSelectedChat] = useState('stanley');
  const [message, setMessage] = useState('');

  const conversations = [
    {
      id: 'stanley',
      name: 'Stanley Moloto',
      message: 'Got it, i will check',
      time: '09H30 AM',
      avatar: '',
      unread: false,
    },
    {
      id: 'bornwise',
      name: 'Bornwise Baloyi',
      message: 'Got it, i will check',
      time: '09H30 AM',
      avatar: '',
      unread: false,
    },
    {
      id: 'kinelwe',
      name: 'Kinelwe Nkosi',
      message: 'Great aap you did!',
      time: '09H30 AM',
      avatar: '',
      unread: false,
    },
    {
      id: 'nxovo',
      name: 'Nxovo Shilowa',
      message: 'see i ask for more',
      time: '09H30 AM',
      avatar: '',
      unread: false,
    },
    {
      id: 'mercy',
      name: 'Mercy Hope',
      message: 'Got it, i will check',
      time: '09H30 AM',
      avatar: '',
      unread: false,
    },
    {
      id: 'liz',
      name: 'Liz Nkosana',
      message: "Let's meet today",
      time: '09H30 AM',
      avatar: '',
      unread: false,
    },
    {
      id: 'capetown',
      name: 'Cape town gateway',
      message: 'Thank you! We check',
      time: '',
      avatar: '',
      unread: false,
    },
  ];

  const messages = [
    {
      id: 1,
      text: 'Have you received the Booking Request?',
      time: '09H30 AM',
      sent: false,
    },
    {
      id: 2,
      text: 'Yes, I have',
      time: '09H30 AM',
      sent: true,
    },
    {
      id: 3,
      text: 'Great. Are you available on the Specified Date',
      time: '09H30 AM',
      sent: false,
    },
    {
      id: 4,
      text: 'Yes, this dates Work for us',
      time: '3H55 PM',
      sent: true,
    },
    {
      id: 5,
      text: '',
      time: '3H55 PM',
      sent: true,
    },
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle sending message
      setMessage('');
    }
  };

  return (
    <div className="flex flex-1 h-screen bg-gray-50">
      {/* Conversations List */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Search */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search user/campaigns"
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* Message Chat Header */}
        <div className="px-4 py-3 border-b border-gray-200">
          <h2 className="text-gray-900">Message Chat</h2>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setSelectedChat(conv.id)}
              className={`w-full flex items-start gap-3 p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 ${
                selectedChat === conv.id ? 'bg-purple-50' : ''
              }`}
            >
              <Avatar className="w-10 h-10 flex-shrink-0">
                <AvatarImage src={conv.avatar} />
                <AvatarFallback className="bg-purple-100 text-purple-700">
                  {conv.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-gray-900">{conv.name}</span>
                  {conv.time && <span className="text-gray-500">{conv.time}</span>}
                </div>
                <p className="text-gray-600 truncate">{conv.message}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Chat Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src="" />
              <AvatarFallback className="bg-purple-100 text-purple-700">SM</AvatarFallback>
            </Avatar>
            <span className="text-gray-900">Stanley Moloto</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded">
              <Info size={18} className="text-gray-600" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded">
              <MoreVertical size={18} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sent ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-md ${msg.sent ? 'order-2' : 'order-1'}`}>
                {msg.text && (
                  <div
                    className={`px-4 py-3 rounded-lg ${
                      msg.sent
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    {msg.text}
                  </div>
                )}
                <div
                  className={`text-gray-500 mt-1 ${
                    msg.sent ? 'text-right' : 'text-left'
                  }`}
                >
                  {msg.time}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-6 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type a message"
              className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg">
              <Smile size={20} className="text-gray-600" />
            </button>
            <button
              onClick={handleSendMessage}
              className="w-10 h-10 flex items-center justify-center bg-purple-600 hover:bg-purple-700 rounded-lg"
            >
              <Send size={20} className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
