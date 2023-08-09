import { MetadataRoute } from 'next';

type Sitemap = Array<{
  url: string;
  lastModified?: string | Date;
}>;

const sitemap = (): Sitemap => {
  return [
    {
      url: 'https://budget-commander.nathanhealea.com',
      lastModified: new Date(),
    },
    {
      url: 'https://budget-commander.nathanhealea.com',
      lastModified: new Date(),
    },
  ];
};

export default sitemap;
