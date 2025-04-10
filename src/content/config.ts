import { z, defineCollection } from 'astro:content';

// Define a schema for the services collection
const servicesCollection = defineCollection({
  schema: z.object({
    title: z.string(), // The main service title (e.g., "Strategic Transformation")
    description: z.string(), // The main paragraph description
    features: z.array(z.string()), // List of bullet points/features
    order: z.number().optional(), // Optional field to control display order
    // Add other fields if needed later (e.g., icon name, link)
  }),
});

// Define a schema for testimonials
const testimonialsCollection = defineCollection({
    schema: z.object({
        quote: z.string(),
        name: z.string(),
        position: z.string(),
        order: z.number().optional(), // For potential manual ordering
    }),
});

// Define a schema for core values
const valuesCollection = defineCollection({
    schema: z.object({
        title: z.string(),
        description: z.string(),
        order: z.number().optional(),
    }),
});

// Define a schema for team members
const teamCollection = defineCollection({
    schema: z.object({
        name: z.string(),
        position: z.string(),
        bio: z.string(),
        // image: z.string().optional(), // Optional image path later
        order: z.number().optional(),
    }),
});

// Define a schema for FAQs
const faqCollection = defineCollection({
    schema: z.object({
        question: z.string(),
        answer: z.string(),
        order: z.number().optional(),
    }),
});

// Define a schema for Insights (Blog Posts/Articles)
const insightsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(), // Short summary/excerpt for listing pages
    publishDate: z.date(), // Use Date object for sorting
    author: z.string().optional(), // Optional author name
    // image: z.string().optional(), // Optional header image for the post
    tags: z.array(z.string()).optional(), // Optional tags/categories
  }),
});

// Export all collections
export const collections = {
  'services': servicesCollection,
  'testimonials': testimonialsCollection,
  'values': valuesCollection,
  'team': teamCollection,
  'faq': faqCollection,
  'insights': insightsCollection,
}; 