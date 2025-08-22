export interface Message {
  type: string;
  content: string;
  isImage?: boolean;
}

export interface Contact {
    id: number;
    name: string;
    message: string;
    time: string;
    avatar: string;
    online: boolean;
}

