export type FindUserResponse = {
  matched: boolean;
  user: {
    _id: string;
    email: string;
    profilePic: string | null;
  };
};

export type User = {
  meta: {
    unreadCount: number;
  };
  _id: string;
  displayName: string;
  email: string;
  profilePic: string | null;
  lastSeen: string;
  status: string;
};

export type UserResponse = {
  status: true;
  user: User;
};

export type Contact = {
  _id: string;
  email: string;
  isBlocked: boolean;
  localName: string;
  contactProfile: {
    _id: string;
    displayName: string;
    profilePic: string | null;
    lastSeen: string;
  };
};

export type ContactListResponse = {
  message: string;
  success: boolean;
  contacts: Contact[];
};

export type FindContactResponse = {
  matched: boolean;
  user: Partial<User>;
};
