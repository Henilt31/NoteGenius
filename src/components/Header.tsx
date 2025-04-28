
import { useState } from 'react';
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="w-full py-4 px-4 sm:px-6 lg:px-8 border-b">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center">
          <div className="text-2xl font-bold">
            <span className="gradient-text">NoteGenius</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm">
            How it works
          </Button>
          <Button size="sm">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
