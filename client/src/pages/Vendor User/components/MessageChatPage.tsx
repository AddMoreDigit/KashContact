import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Search, Paperclip, Smile, Send, MoreVertical, Settings } from "lucide-react";

interface Message {
  id: number;
  sender: string;
  text: string;
  time: string;
  isSent: boolean;
}

interface Contact {
  id: number;
  name: string;
  message: string;
  time: string;
  avatar: string;
  initials: string;
  status: string;
  unread?: boolean;
}

const contacts: Contact[] = [
  {
    id: 1,
    name: "Stanley Moloto",
    message: "Got it ,will check",
    time: "09H32 AM",
    avatar: "",
    initials: "SM",
    status: "Typing",
  },
  {
    id: 2,
    name: "Bornwise Baloyi",
    message: "Got it ,will check",
    time: "09H32 AM",
    avatar: "",
    initials: "BB",
    status: "Typing",
  },
  {
    id: 3,
    name: "Kinelwe Nkosi",
    message: "Great see you soon",
    time: "09H32 AM",
    avatar: "",
    initials: "KN",
    status: "",
  },
  {
    id: 4,
    name: "Nsovo Shilowa",
    message: "Yes i will be there",
    time: "09H32 AM",
    avatar: "",
    initials: "NS",
    status: "",
  },
  {
    id: 5,
    name: "Mercy Hope",
    message: "Got it ,will check",
    time: "09H32 AM",
    avatar: "",
    initials: "MH",
    status: "",
  },
  {
    id: 6,
    name: "Liz Nkosana",
    message: "Let's meet today",
    time: "09H32 AM",
    avatar: "",
    initials: "LN",
    status: "",
  },
  {
    id: 7,
    name: "Cape town gateway",
    message: "I want see the Scedle",
    time: "",
    avatar: "",
    initials: "CT",
    status: "",
  },
];

const chatMessages: Message[] = [
  {
    id: 1,
    sender: "Stanley Moloto",
    text: "Have you received the Booking Request?",
    time: "09H30 AM",
    isSent: false,
  },
  {
    id: 2,
    sender: "You",
    text: "Yes, I have",
    time: "09H30 AM",
    isSent: true,
  },
  {
    id: 3,
    sender: "Stanley Moloto",
    text: "Great, Are you Available on the Specified Date",
    time: "09H30 AM",
    isSent: false,
  },
  {
    id: 4,
    sender: "You",
    text: "Yes, the dates Work for us",
    time: "3H45 PM",
    isSent: true,
  },
  {
    id: 5,
    sender: "Stanley Moloto",
    text: "",
    time: "3H45 PM",
    isSent: false,
  },
];

export function MessageChatPage() {
  const [selectedContact, setSelectedContact] = useState<Contact>(contacts[0]);
  const [messageText, setMessageText] = useState("");

  return (
    <div className="h-[calc(100vh-12rem)]">
      <Card className="h-full flex overflow-hidden">
        {/* Contacts Sidebar */}
        <div className="w-80 border-r flex flex-col">
          {/* Search */}
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search user/campaigns"
                className="pl-9"
              />
            </div>
          </div>

          {/* Message Chat Header */}
          <div className="px-4 py-3 border-b">
            <h2 className="text-gray-900">Message Chat</h2>
          </div>

          {/* Contacts List */}
          <div className="flex-1 overflow-y-auto">
            {contacts.map((contact) => (
              <button
                key={contact.id}
                onClick={() => setSelectedContact(contact)}
                className={`w-full p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors border-b ${
                  selectedContact.id === contact.id ? "bg-purple-50" : ""
                }`}
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={contact.avatar} />
                  <AvatarFallback className="bg-purple-100 text-purple-600">
                    {contact.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-left overflow-hidden">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-sm text-gray-900 truncate">{contact.name}</span>
                  </div>
                  <p className="text-xs text-gray-600 truncate">{contact.message}</p>
                  {contact.status && (
                    <p className="text-xs text-purple-600 mt-0.5">{contact.status}</p>
                  )}
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap">{contact.time}</span>
              </button>
            ))}
          </div>

          {/* Bottom Navigation */}
          <div className="p-4 border-t space-y-1">
            <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
              Income History
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
              Help
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded">
              Logout
            </button>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={selectedContact.avatar} />
                <AvatarFallback className="bg-purple-600 text-white">
                  {selectedContact.initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-gray-900">{selectedContact.name}</h3>
                <p className="text-xs text-purple-600">{selectedContact.status || "Online"}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Settings className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-xs ${message.isSent ? "" : "order-2"}`}>
                  {message.text && (
                    <div
                      className={`rounded-2xl px-4 py-2 ${
                        message.isSent
                          ? "bg-purple-600 text-white"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                    </div>
                  )}
                  <p
                    className={`text-xs text-gray-500 mt-1 ${
                      message.isSent ? "text-right" : "text-left"
                    }`}
                  >
                    {message.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t">
            <div className="flex items-center gap-2">
              <div className="flex-1 relative">
                <Input
                  placeholder="Type a message"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="pr-20"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Paperclip className="w-4 h-4 text-gray-400" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Smile className="w-4 h-4 text-gray-400" />
                  </Button>
                </div>
              </div>
              <Button
                size="icon"
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
