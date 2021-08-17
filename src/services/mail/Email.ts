export interface Email {
  destination: string;
  subject: string;
  template: string;
  replacements: any;
}
