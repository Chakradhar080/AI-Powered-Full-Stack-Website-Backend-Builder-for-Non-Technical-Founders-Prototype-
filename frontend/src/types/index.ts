export interface Website {
  id: string;
  name: string;
  domain: string;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

export interface Page {
  id: string;
  websiteId: string;
  title: string;
  slug: string;
  content: any;
  layout: any;
  createdAt: string;
  updatedAt: string;
}

export interface Component {
  id: string;
  type: string;
  content: any;
  styles: any;
}