import { useState, useEffect, useRef } from 'react';
import { Search, Send, Smile, Paperclip, MoreVertical, Info, Bell, ShoppingCart, User, Check, CheckCheck } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { ScrollArea } from '../../components/ui/scroll-area';
import { NavBar } from '../../components/layout';
//import imgEllipse49 from '../imports/figma/asset/395e04268e8647f0247382b1f4f894e940633f25.png.svg';
//import imgEllipse51 from "../../imports/figma/asset/47f81f2a909dd35622aa884f42eaec8555a21841.png";
//import imgEllipse52 from "../../imports/figma/asset/04dc25e30ac07a1bd2e1d6c008e092953c2e97f5.png";
//import imgEllipse53 from "../../imports/figma/asset/fc8112960f5698106aca9b5033af2281b2025b89.png";
//import imgEllipse54 from "../../imports/figma/asset/1a98edf05f59e95152521876385aaefaf1a10205.png";
//import imgEllipse55 from "../../imports/figma/asset/c5eb43544945d00e2a16be9926bff9d4e50ec607.png";
import svgPaths from '../../imports/svg-lk2fqymupp';
import { toast } from 'sonner';

type Page = 'dashboard' | 'campaigns' | 'vouchers' | 'transactions' | 'profile' | 'overview' | 'draft' | 'howItWorks' | 'campaignDetail' | 'viewCampaign' | 'messaging' | 'serviceDetail' | 'selectedServices' | 'createCampaign' | 'manageCampaign' | 'contributors' | 'contributorDetail' | 'serviceProviders';

interface MessagingPageProps {
  onNavigate: (page: Page) => void;
  onShowNotifications?: () => void;
  hasUnreadNotifications?: boolean;
  onShowCart?: () => void;
}

interface Contact {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread?: boolean;
  typing?: boolean;
}

interface Message {
  id: number;
  text: string;
  sender: 'me' | 'them';
  time: string;
  timestamp: number;
  read?: boolean;
}

interface ConversationMessages {
  [contactId: number]: Message[];
}

export function MessagingPage({ onNavigate, onShowNotifications, hasUnreadNotifications, onShowCart }: MessagingPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContact, setSelectedContact] = useState<number>(1);
  const [messageText, setMessageText] = useState('');
  const [conversations, setConversations] = useState<ConversationMessages>({});
  const [typingContacts, setTypingContacts] = useState<Set<number>>(new Set());
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize conversations from localStorage or with default data
  useEffect(() => {
    const savedConversations = localStorage.getItem('messagingConversations');
    if (savedConversations) {
      setConversations(JSON.parse(savedConversations));
    } else {
      // Initialize with default messages
      const initialConversations: ConversationMessages = {
        1: [
          {
            id: 1,
            text: 'Have you received the Booking Request?',
            sender: 'them',
            time: '09:30 AM',
            timestamp: Date.now() - 7200000,
            read: true,
          },
          {
            id: 2,
            text: 'Yes. i have',
            sender: 'me',
            time: '09:30 AM',
            timestamp: Date.now() - 7000000,
            read: true,
          },
          {
            id: 3,
            text: 'Great. Are you Available on the Specified Date',
            sender: 'them',
            time: '09:30 AM',
            timestamp: Date.now() - 6800000,
            read: true,
          },
          {
            id: 4,
            text: 'Yes. the dates Work For us',
            sender: 'me',
            time: '3:45 PM',
            timestamp: Date.now() - 3600000,
            read: true,
          },
        ],
        2: [
          {
            id: 1,
            text: 'Hey, how are you doing?',
            sender: 'them',
            time: '08:15 AM',
            timestamp: Date.now() - 9000000,
            read: true,
          },
          {
            id: 2,
            text: 'I\'m good! Thanks for asking',
            sender: 'me',
            time: '08:20 AM',
            timestamp: Date.now() - 8900000,
            read: true,
          },
        ],
        3: [
          {
            id: 1,
            text: 'Great see you soon',
            sender: 'them',
            time: '09:30 AM',
            timestamp: Date.now() - 7200000,
            read: true,
          },
        ],
        4: [
          {
            id: 1,
            text: 'Yes i will be there',
            sender: 'them',
            time: '09:30 AM',
            timestamp: Date.now() - 7200000,
            read: true,
          },
        ],
        5: [
          {
            id: 1,
            text: 'Got it, i will check',
            sender: 'them',
            time: '09:30 AM',
            timestamp: Date.now() - 7200000,
            read: true,
          },
        ],
        6: [
          {
            id: 1,
            text: 'Let\'s meet today',
            sender: 'them',
            time: '09:30 AM',
            timestamp: Date.now() - 7200000,
            read: true,
          },
        ],
        7: [
          {
            id: 1,
            text: 'I have sent the Details',
            sender: 'them',
            time: '10:00 AM',
            timestamp: Date.now() - 6000000,
            read: true,
          },
        ],
      };
      setConversations(initialConversations);
      localStorage.setItem('messagingConversations', JSON.stringify(initialConversations));
    }
  }, []);

  // Save conversations to localStorage whenever they change
  useEffect(() => {
    if (Object.keys(conversations).length > 0) {
      localStorage.setItem('messagingConversations', JSON.stringify(conversations));
    }
  }, [conversations]);

  // Auto-scroll to bottom when messages change or contact selected
  useEffect(() => {
    scrollToBottom();
  }, [selectedContact, conversations]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const contacts: Contact[] = [
    {
      id: 1,
      name: 'Michael',
      avatar: "/asset/395e04268e8647f0247382b1f4f894e940633f25.png",
      lastMessage: getLastMessage(1),
      time: getLastMessageTime(1),
      unread: hasUnreadMessages(1),
      typing: typingContacts.has(1),
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      avatar: "/asset/47f81f2a909dd35622aa884f42eaec8555a21841.png",
      lastMessage: getLastMessage(2),
      time: getLastMessageTime(2),
      typing: typingContacts.has(2),
    },
    {
      id: 3,
      name: 'David Williams',
      avatar: "/asset/04dc25e30ac07a1bd2e1d6c008e092953c2e97f5.png",
      lastMessage: getLastMessage(3),
      time: getLastMessageTime(3),
      typing: typingContacts.has(3),
    },
    {
      id: 4,
      name: 'Emma Davis',
      avatar: "/fc8112960f5698106aca9b5033af2281b2025b89.png",
      lastMessage: getLastMessage(4),
      time: getLastMessageTime(4),
      typing: typingContacts.has(4),
    },
    {
      id: 5,
      name: 'Mercy Hope',
      avatar: "/asset/1a98edf05f59e95152521876385aaefaf1a10205.png",
      lastMessage: getLastMessage(5),
      time: getLastMessageTime(5),
      typing: typingContacts.has(5),
    },
    {
      id: 6,
      name: 'Liz Nkosana',
      avatar: "/asset/c5eb43544945d00e2a16be9926bff9d4e50ec607.png",
      lastMessage: getLastMessage(6),
      time: getLastMessageTime(6),
      typing: typingContacts.has(6),
    },
    {
      id: 7,
      name: 'Cape Town Gateway',
      avatar: '',
      lastMessage: getLastMessage(7),
      time: getLastMessageTime(7),
      typing: typingContacts.has(7),
    },
  ];

  function getLastMessage(contactId: number): string {
    const messages = conversations[contactId] || [];
    if (messages.length === 0) return 'No messages yet';
    const lastMsg = messages[messages.length - 1];
    return lastMsg.sender === 'me' ? `You: ${lastMsg.text}` : lastMsg.text;
  }

  function getLastMessageTime(contactId: number): string {
    const messages = conversations[contactId] || [];
    if (messages.length === 0) return '';
    return messages[messages.length - 1].time;
  }

  function hasUnreadMessages(contactId: number): boolean {
    const messages = conversations[contactId] || [];
    return messages.some(msg => msg.sender === 'them' && !msg.read);
  }

  const selectedContactData = contacts.find((c) => c.id === selectedContact);
  const currentMessages = conversations[selectedContact] || [];

  const handleSendMessage = () => {
    if (!messageText.trim()) return;

    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });

    const newMessage: Message = {
      id: Date.now(),
      text: messageText.trim(),
      sender: 'me',
      time: timeString,
      timestamp: Date.now(),
      read: false,
    };

    setConversations(prev => ({
      ...prev,
      [selectedContact]: [...(prev[selectedContact] || []), newMessage]
    }));

    setMessageText('');

    // Simulate typing indicator and auto-reply after 2-3 seconds
    setTimeout(() => {
      setTypingContacts(prev => new Set(prev).add(selectedContact));
      
      setTimeout(() => {
        const replyTime = new Date();
        const replyTimeString = replyTime.toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: true 
        });

        const autoReply: Message = {
          id: Date.now(),
          text: getAutoReplyText(messageText),
          sender: 'them',
          time: replyTimeString,
          timestamp: Date.now(),
          read: false,
        };

        setConversations(prev => ({
          ...prev,
          [selectedContact]: [...(prev[selectedContact] || []), autoReply]
        }));

        setTypingContacts(prev => {
          const newSet = new Set(prev);
          newSet.delete(selectedContact);
          return newSet;
        });

        // Mark as read after 1 second
        setTimeout(() => {
          setConversations(prev => ({
            ...prev,
            [selectedContact]: prev[selectedContact].map(msg => 
              msg.id === autoReply.id ? { ...msg, read: true } : msg
            )
          }));
        }, 1000);

      }, 2500);
    }, 1000);
  };

  function getAutoReplyText(userMessage: string): string {
    const lowerMsg = userMessage.toLowerCase();
    
    if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
      return 'Hello! How can I help you?';
    }
    if (lowerMsg.includes('booking') || lowerMsg.includes('book')) {
      return 'I\'ll check the booking details and get back to you shortly.';
    }
    if (lowerMsg.includes('thank')) {
      return 'You\'re welcome! Let me know if you need anything else.';
    }
    if (lowerMsg.includes('available') || lowerMsg.includes('availability')) {
      return 'Yes, I\'m available. When would you like to schedule?';
    }
    if (lowerMsg.includes('?')) {
      return 'That\'s a good question. Let me check and I\'ll get back to you.';
    }
    
    return 'Got it, thanks for letting me know!';
  }

  const handleContactSelect = (contactId: number) => {
    setSelectedContact(contactId);
    
    // Mark all messages from this contact as read
    setConversations(prev => ({
      ...prev,
      [contactId]: (prev[contactId] || []).map(msg => ({ ...msg, read: true }))
    }));
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 bg-white flex flex-col">
      <NavBar 
        onNavigate={onNavigate} 
        showCreateButton={false}
        showBackButton={true}
        onBack={() => onNavigate('dashboard')}
        onShowNotifications={onShowNotifications}
        hasUnreadNotifications={hasUnreadNotifications}
        onShowCart={onShowCart}
      />
      
      <div className="flex flex-1">
        {/* Contacts List */}
        <div className="w-[380px] border-r border-gray-200 flex flex-col">
          {/* Search */}
          <div className="p-4">
            <h1 className="text-gray-900 mb-4">Message Chat</h1>
            <div className="relative">
              <Input
                type="text"
                placeholder="Search user/campaigns"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-[#f5f5fa] border-none shadow-inner"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Contact List */}
          <ScrollArea className="flex-1">
            <div className="space-y-1 px-2">
              {filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => handleContactSelect(contact.id)}
                  className={`p-4 rounded-lg cursor-pointer transition-colors ${
                    selectedContact === contact.id
                      ? 'bg-purple-100'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {contact.avatar ? (
                      <img
                        src={contact.avatar}
                        alt={contact.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-purple-200 flex items-center justify-center">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
                          <path d={svgPaths.p3bc45780} fill="#8363F2" fillRule="evenodd" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-gray-900 truncate">{contact.name}</h3>
                        {contact.time && (
                          <span className="text-gray-500 text-sm">{contact.time}</span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm truncate">
                        {contact.lastMessage}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          {selectedContactData && (
            <div className="border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {selectedContactData.avatar ? (
                    <img
                      src={selectedContactData.avatar}
                      alt={selectedContactData.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-purple-200" />
                  )}
                  <div>
                    <h2 className="text-gray-900">{selectedContactData.name}</h2>
                    {selectedContactData.typing && (
                      <p className="text-gray-500 text-sm">Typing...</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Info className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Messages */}
          <ScrollArea className="flex-1 p-6">
            <div className="space-y-4 max-w-4xl mx-auto">
              {currentMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="max-w-md">
                    <div
                      className={`p-4 rounded-2xl ${
                        message.sender === 'me'
                          ? 'bg-purple-600 text-white rounded-br-none'
                          : 'bg-gray-200 text-gray-900 rounded-bl-none'
                      }`}
                    >
                      <p>{message.text}</p>
                    </div>
                    <div className="flex items-center gap-2 mt-1 px-2">
                      <p className="text-gray-500 text-sm">
                        {message.time}
                      </p>
                      {message.sender === 'me' && (
                        <div className="flex items-center">
                          {message.read ? (
                            <CheckCheck className="h-4 w-4 text-blue-500" />
                          ) : (
                            <Check className="h-4 w-4 text-gray-400" />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="border-t border-gray-200 p-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 bg-white rounded-lg border border-gray-300 px-4 py-2">
                <Input
                  type="text"
                  placeholder="Type a message"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 border-none focus-visible:ring-0"
                />
                <Button variant="ghost" size="icon">
                  <Smile className="h-5 w-5 text-gray-500" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Paperclip className="h-5 w-5 text-gray-500" />
                </Button>
                <Button
                  onClick={handleSendMessage}
                  size="icon"
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


