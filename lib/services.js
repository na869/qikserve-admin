export const services = [
  {
    id: 'ac-repair',
    name: 'AC Tune-Up & Repair',
    description: 'Beat the heat. Full AC servicing & gas top-up.',
    image: 'https://placehold.co/300x200/dbeafe/1e40af?text=AC+Service',
    price: 499,
    page_image: 'https://placehold.co/600x400/dbeafe/1e40af?text=AC+Service',
    page_description: 'Comprehensive AC check-up, filter cleaning, and coolant level monitoring to ensure optimal performance and prevent breakdowns.',
  },
  {
    id: 'plumbing',
    name: 'Plumbing & Pipe Fixes',
    description: 'Leaky faucets, clogged drains? We fix it all.',
    image: 'https://placehold.co/300x200/e0f2fe/0891b2?text=Plumbing',
    price: 399,
    page_image: 'https://placehold.co/600x400/e0f2fe/0891b2?text=Plumbing',
    page_description: 'Leaky faucets, clogged drains, or running toilets? Our expert plumbers will fix it all, ensuring your water systems run smoothly.'
  },
  {
    id: 'electrician',
    name: 'Electrical Wiring & Fixtures',
    description: 'New wiring, fixture installs, and safety checks.',
    image: 'https://placehold.co/300x200/fef9c3/f59e0b?text=Electrician',
    price: 549,
    page_image: 'https://placehold.co/600x400/fef9c3/f59e0b?text=Electrician',
    page_description: 'From faulty wiring to new installations, our certified electricians handle all your electrical needs safely and efficiently.'
  },
  {
    id: 'cleaning',
    name: 'Full Home Deep Cleaning',
    description: 'Get your home sparkling clean, nook and cranny.',
    image: 'https://placehold.co/300x200/e2e8f0/4a5568?text=Cleaning',
    price: 1499,
    page_image: 'https://placehold.co/600x400/e2e8f0/4a5568?text=Cleaning',
    page_description: 'A complete and thorough cleaning of your entire home. We cover every nook and cranny, leaving your space sparkling clean.'
  },
  {
    id: 'painting',
    name: 'Interior & Exterior Painting',
    description: 'A fresh coat of paint to brighten up your space.',
    image: 'https://placehold.co/300x200/fee2e2/991b1b?text=Painting',
    price: 2999,
    page_image: 'https://placehold.co/600x400/fee2e2/991b1b?text=Painting',
    page_description: 'Professional painting services to refresh your home. We use high-quality paints and materials for a long-lasting finish.'
  },
  {
    id: 'handyman',
    name: 'General Handyman Services',
    description: 'Small fixes, furniture assembly, and installations.',
    image: 'https://placehold.co/300x200/f3e8ff/8b5cf6?text=Handyman',
    price: 250,
    page_image: 'https://placehold.co/600x400/f3e8ff/8b5cf6?text=Handyman',
    page_description: 'For all the small jobs around the house. From hanging pictures to assembling furniture, our handyman services have you covered.'
  }
];

export const servicesMap = services.reduce((acc, service) => {
  acc[service.id] = service;
  return acc;
}, {});
