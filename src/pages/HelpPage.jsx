
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UnsubscribeForm from '@/components/UnsubscribeForm';
import EditPreferencesForm from '@/components/EditPreferencesForm';

const HelpPage = () => {
  const [activeTab, setActiveTab] = useState("edit");

  return (
    <div className="min-h-screen pt-20 px-4 bg-gradient-to-b from-nature-blue/90 to-nature-teal/70 flex flex-col items-center justify-center">
      <div className="w-full max-w-md mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-white drop-shadow-xl text-center">
          Manage Your Subscription
        </h1>
        
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white/20 backdrop-blur-md">
            <TabsTrigger value="edit" className="data-[state=active]:bg-white/40">
              Edit Preferences
            </TabsTrigger>
            <TabsTrigger value="unsubscribe" className="data-[state=active]:bg-white/40">
              Unsubscribe
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="edit" className="mt-6">
            <EditPreferencesForm />
          </TabsContent>
          
          <TabsContent value="unsubscribe" className="mt-6">
            <UnsubscribeForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default HelpPage;
