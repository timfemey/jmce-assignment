export interface Course {
  id: number;
  title: string;
  university: string;
  duration: string;
  location: string;
  fees: number;
  description: string;
  entryRequirements: string[];
  modules: string[];
}
