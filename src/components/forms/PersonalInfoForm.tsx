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
          <label htmlFor="info-fullName" className="block text-sm font-medium mb-1.5">Full Name *</label>
          <div className="relative">
            <User className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
            <input
              id="info-fullName"
              type="text"
              value={personalInfo.fullName}
              onChange={(e) => updatePersonalInfo({ fullName: e.target.value })}
              className="w-full pl-10 pr-3.5 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-sm"
              placeholder="John Doe"
            />
          </div>
        </div>

        <div>
          <label htmlFor="info-email" className="block text-sm font-medium mb-1.5">Email Address *</label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
            <input
              id="info-email"
              type="email"
              value={personalInfo.email}
              onChange={(e) => updatePersonalInfo({ email: e.target.value })}
              className="w-full pl-10 pr-3.5 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-sm"
              placeholder="john@example.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="info-phone" className="block text-sm font-medium mb-1.5">Phone Number</label>
          <div className="relative">
            <Phone className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
            <input
              id="info-phone"
              type="tel"
              value={personalInfo.phone}
              onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
              className="w-full pl-10 pr-3.5 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-sm"
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>

        <div>
          <label htmlFor="info-location" className="block text-sm font-medium mb-1.5">Location</label>
          <div className="relative">
            <MapPin className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
            <input
              id="info-location"
              type="text"
              value={personalInfo.location}
              onChange={(e) => updatePersonalInfo({ location: e.target.value })}
              className="w-full pl-10 pr-3.5 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-sm"
              placeholder="New York, NY"
            />
          </div>
        </div>

        <div>
          <label htmlFor="info-linkedin" className="block text-sm font-medium mb-1.5">LinkedIn Profile</label>
          <div className="relative">
            <Link2 className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
            <input
              id="info-linkedin"
              type="url"
              value={personalInfo.linkedin}
              onChange={(e) => updatePersonalInfo({ linkedin: e.target.value })}
              className="w-full pl-10 pr-3.5 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-sm"
              placeholder="linkedin.com/in/johndoe"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="info-website" className="block text-sm font-medium mb-1.5">
            Website / Portfolio
          </label>
          <div className="relative">
            <Globe className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
            <input
              id="info-website"
              type="url"
              value={personalInfo.website}
              onChange={(e) => updatePersonalInfo({ website: e.target.value })}
              className="w-full pl-10 pr-3.5 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-sm"
              placeholder="johndoe.com"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
