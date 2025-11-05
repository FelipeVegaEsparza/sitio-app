type TemplateName = 'default' | 'modern' | 'classic';

interface Template {
  name: string;
  description: string;
  features: string[];
}

interface SiteConfig {
  template: TemplateName;
  title: string;
  description: string;
  themeColor: string;
  branding: {
    logo?: string;
    favicon?: string;
  };
}

export const templates: Record<TemplateName, Template> = {
  default: {
    name: 'Default',
    description: 'Diseño moderno con reproductor flotante',
    features: ['Modo oscuro/claro', 'Reproductor flotante', 'Responsive']
  },
  modern: {
    name: 'Modern',
    description: 'Diseño minimalista con enfoque en visuales',
    features: ['Efectos visuales', 'Pantalla completa', 'Animaciones']
  },
  classic: {
    name: 'Classic',
    description: 'Interfaz familiar tipo radio tradicional',
    features: ['Diseño clásico', 'Bajo consumo', 'Compatible']
  }
};

export const siteConfig: SiteConfig = {
  template: 'modern',
  title: 'Radio Online',
  description: 'Transmitiendo música las 24 horas',
  themeColor: '#2a2a72',
  branding: {}
};

export const isValidTemplate = (template: string): template is TemplateName => {
  return template in templates;
};