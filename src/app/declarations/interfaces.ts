export type IconName = 'coffee' | 'beer' | 'wine' | 'consult' | 'develop' | 'source' | 'host';

export interface Experience {
  name: string;
  subtitle: string;
  description: string;
  modifier: 'coffee' | 'beer' | 'wine';
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: IconName;
}
