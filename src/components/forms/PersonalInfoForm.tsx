"use client";

import { useCVStore } from "@/store/cv-store";
import { User, Mail, Phone, MapPin, Link2, Globe } from "lucide-react";

export default function PersonalInfoForm() {
  const { data, updatePersonalInfo } = useCVStore();
  const { personalInfo } = data;

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold mb-1">Personal Information</h2>
        <p className="text-sm text-muted-foreground">
          Add your contact details and basic information
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1.5">Full Name</label>
          <div className="relative">
            <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={personalInfo.fullName}
              onChange={(e) => updatePersonalInfo({ fullName: e.target.value })}
              className="w-full pl-10 pr-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
              placeholder="John Doe"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="email"
              value={personalInfo.email}
              onChange={(e) => updatePersonalInfo({ email: e.target.value })}
              className="w-full pl-10 pr-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
              placeholder="john@example.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Phone</label>
          <div className="relative">
            <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="tel"
              value={personalInfo.phone}
              onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
              className="w-full pl-10 pr-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Location</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={personalInfo.location}
              onChange={(e) => updatePersonalInfo({ location: e.target.value })}
              className="w-full pl-10 pr-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
              placeholder="New York, NY"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">LinkedIn</label>
          <div className="relative">
            <Link2 className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="url"
              value={personalInfo.linkedin}
              onChange={(e) => updatePersonalInfo({ linkedin: e.target.value })}
              className="w-full pl-10 pr-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
              placeholder="linkedin.com/in/johndoe"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1.5">
            Website / Portfolio
          </label>
          <div className="relative">
            <Globe className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="url"
              value={personalInfo.website}
              onChange={(e) => updatePersonalInfo({ website: e.target.value })}
              className="w-full pl-10 pr-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
              placeholder="johndoe.com"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
