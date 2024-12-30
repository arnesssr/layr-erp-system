import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import { useTheme } from "@/components/ThemeProvider";
import { toast } from "sonner";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Theme options
const themeOptions = [
  {
    name: "Default",
    primary: "#0EA5E9",
    accent: "#8B5CF6",
  },
  {
    name: "Ocean",
    primary: "#0EA5E9",
    accent: "#06B6D4",
  },
  {
    name: "Forest",
    primary: "#059669",
    accent: "#10B981",
  },
  {
    name: "Sunset",
    primary: "#F97316",
    accent: "#FB923C",
  },
  {
    name: "Royal",
    primary: "#9b87f5",
    accent: "#7E69AB",
  }
];

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTheme, setSelectedTheme] = useState(themeOptions[0]);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(true);

  const handleThemeChange = (themeName: string) => {
    const newTheme = themeOptions.find(t => t.name === themeName) || themeOptions[0];
    setSelectedTheme(newTheme);
    // Apply theme colors to CSS variables
    document.documentElement.style.setProperty('--primary', newTheme.primary);
    document.documentElement.style.setProperty('--accent', newTheme.accent);
    toast.success(`Theme changed to ${newTheme.name}`);
  };

  const handleSettingChange = (setting: string, value: boolean) => {
    toast.success(`${setting} ${value ? 'enabled' : 'disabled'}`);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Settings</h2>
      
      <Tabs defaultValue="appearance">
        <TabsList>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        <TabsContent value="appearance">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Theme Settings</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {themeOptions.map((themeOption) => (
                <button
                  key={themeOption.name}
                  onClick={() => handleThemeChange(themeOption.name)}
                  className={cn(
                    "p-4 rounded-lg border transition-all",
                    selectedTheme.name === themeOption.name 
                      ? "border-primary ring-2 ring-primary/20" 
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <div className="flex gap-2 mb-2">
                    <div 
                      className="w-6 h-6 rounded-full" 
                      style={{ backgroundColor: themeOption.primary }}
                    />
                    <div 
                      className="w-6 h-6 rounded-full" 
                      style={{ backgroundColor: themeOption.accent }}
                    />
                  </div>
                  <p className="text-sm font-medium">{themeOption.name}</p>
                </button>
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Dark Mode</p>
                  <p className="text-sm text-muted-foreground">
                    Toggle between light and dark theme
                  </p>
                </div>
                <Switch
                  checked={theme === "dark"}
                  onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Notification Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">
                    Receive email updates about your account
                  </p>
                </div>
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={(checked) => {
                    setEmailNotifications(checked);
                    handleSettingChange("Email notifications", checked);
                  }}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Push Notifications</p>
                  <p className="text-sm text-muted-foreground">
                    Receive push notifications in your browser
                  </p>
                </div>
                <Switch
                  checked={pushNotifications}
                  onCheckedChange={(checked) => {
                    setPushNotifications(checked);
                    handleSettingChange("Push notifications", checked);
                  }}
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="system">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">System Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Auto-save</p>
                  <p className="text-sm text-muted-foreground">
                    Automatically save changes as you work
                  </p>
                </div>
                <Switch
                  checked={autoSave}
                  onCheckedChange={(checked) => {
                    setAutoSave(checked);
                    handleSettingChange("Auto-save", checked);
                  }}
                />
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}