
import { useState } from 'react';
import { User, Mail, Phone, Building, Calendar, Edit, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    username: 'johndoe',
    email: 'john.doe@company.com',
    phone: '+1 (555) 123-4567',
    department: 'Finance',
    position: 'Financial Analyst',
    joinDate: '2023-01-15'
  });

  const [editedProfile, setEditedProfile] = useState(profile);

  const handleEdit = () => {
    setEditedProfile(profile);
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    // Here you would typically make an API call to update the profile
    console.log('Profile updated:', editedProfile);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card className="bg-violet-300 backdrop-blur-sm shadow-xl">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src="" alt={profile.name} />
              <AvatarFallback className="text-xl bg-blue-100 text-blue-600">
                {getInitials(profile.name)}
              </AvatarFallback>
            </Avatar>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            {profile.name}
          </CardTitle>
          <CardDescription className="text-gray-600">
            {profile.position} • {profile.department}
          </CardDescription>
          
          <div className="flex justify-center mt-4">
            {!isEditing ? (
              <Button 
                onClick={handleEdit}
                className="bg-gray-200 hover:bg-gray-400"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            ) : (
              <div className="flex space-x-2">
                <Button 
                  onClick={handleSave}
                  className="bg-green-200 hover:bg-green-400"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button 
                  onClick={handleCancel}
                  variant="outline"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6 ">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <User className="h-5 w-5 mr-2 text-blue-600" />
                Personal Information
              </h3>
              
              <div className="space-y-3 text-black">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  {isEditing ? (
                    <Input
                      id="name"
                      value={editedProfile.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="mt-1 bg-gray-400"
                    />
                  ) : (
                    <p className="mt-1 text-gray-700">{profile.name}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="username">Username</Label>
                  {isEditing ? (
                    <Input
                      id="username"
                      value={editedProfile.username}
                      onChange={(e) => handleInputChange('username', e.target.value)}
                      className="mt-1 bg-gray-400"
                    />
                  ) : (
                    <p className="mt-1 text-gray-700">@{profile.username}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <div className="flex items-center mt-1">
                    <Mail className="h-4 w-4 mr-2 text-gray-500" />
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={editedProfile.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="flex-1 bg-gray-400"
                      />
                    ) : (
                      <span className="text-gray-700">{profile.email}</span>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <div className="flex items-center mt-1">
                    <Phone className="h-4 w-4 mr-2 text-gray-500" />
                    {isEditing ? (
                      <Input
                        id="phone"
                        value={editedProfile.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="flex-1 bg-gray-400"
                      />
                    ) : (
                      <span className="text-gray-700">{profile.phone}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Work Information */}
            <div className="space-y-4 text-black">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Building className="h-5 w-5 mr-2 text-blue-600" />
                Work Information
              </h3>
              
              <div className="space-y-3">
                <div>
                  <Label htmlFor="department">Department</Label>
                  {isEditing ? (
                    <Input
                      id="department"
                      value={editedProfile.department}
                      onChange={(e) => handleInputChange('department', e.target.value)}
                      className="mt-1 bg-gray-400"
                    />
                  ) : (
                    <p className="mt-1 text-gray-700">{profile.department}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="position">Position</Label>
                  {isEditing ? (
                    <Input
                      id="position"
                      value={editedProfile.position}
                      onChange={(e) => handleInputChange('position', e.target.value)}
                      className="mt-1 bg-gray-400"
                    />
                  ) : (
                    <p className="mt-1 text-gray-700">{profile.position}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="joinDate">Join Date</Label>
                  <div className="flex items-center mt-1">
                    <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                    {isEditing ? (
                      <Input
                        id="joinDate"
                        type="date"
                        value={editedProfile.joinDate}
                        onChange={(e) => handleInputChange('joinDate', e.target.value)}
                        className="flex-1 bg-gray-400"
                      />
                    ) : (
                      <span className="text-gray-700">
                        {new Date(profile.joinDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
