import { ReactNode, useState } from 'react';
import { Bell, User as UserIcon, Plus, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useApp } from '../contexts/AppContext';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  showBackButton?: boolean;
  onBack?: () => void;
  showSearch?: boolean;
  showCreateButton?: boolean;
  onCreateClick?: () => void;
  createButtonText?: string;
}

export function Layout({
  children,
  title,
  showBackButton = false,
  onBack,
  showSearch = true,
  showCreateButton = true,
  onCreateClick,
  createButtonText = 'Create',
}: LayoutProps) {
  const { notifications } = useApp();

  return (
    <div className="flex-1 bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-border px-6 py-4 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-4 flex-1">
          {showBackButton && onBack && (
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
          )}
          
          {title && <h1 className="text-xl">{title}</h1>}
          
          {showSearch && (
            <div className="relative flex-1 max-w-md ml-4">
              <Input
                placeholder="Search"
                className="pl-4 pr-10 bg-gray-50"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          {showCreateButton && (
            <Button 
              className="bg-indigo-600 hover:bg-indigo-700"
              onClick={onCreateClick}
            >
              <Plus className="w-4 h-4 mr-2" />
              {createButtonText}
            </Button>
          )}
          
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            {notifications > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 hover:bg-red-500 text-xs">
                {notifications}
              </Badge>
            )}
          </Button>
          
          <Button variant="ghost" size="icon">
            <UserIcon className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
}
